'use strict'

const fs = require('fs')
const Promise = require('bluebird')
const _ = require('lodash')
const moment = require('moment')
const handlebars = require('handlebars')
const markdown = require('markdown').markdown
const axios = require('axios')
const AWS = require('aws-sdk')
const sgMail = require('@sendgrid/mail')
const dynamodb = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3()
const cloudfront = new AWS.CloudFront()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const succeed = (context, body) => {
  context.succeed({ statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body })
}

const fail = (context, code, err) => {
  context.succeed({ statusCode: code, err: err.toString() })
}

const getCloudFrontId = () => {
  return cloudfront.listDistributions().promise()
    .then((distributions) => _.find(distributions.DistributionList.Items, { DomainName: process.env.CLOUDFRONT_DOMAIN }))
}

const getDistributionConfig = (distribution) => {
  return cloudfront.getDistributionConfig({ Id: distribution.Id }).promise()
}

const render = (post, timestamp, env) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/post.hbs`, 'utf-8', (error, source) => {
      if (error) reject(error)
      var template = handlebars.compile(source)
      let postHTML = markdown.toHTML(post.rawText)
      post.html = postHTML
      post.summary = post.rawText.substring(0, 50)
      post.metaKeywords = post.tags.join()
      if (!post.page) {
        post.formattedTimeAttr = moment(post.timestamp).format('YYYY-MM-DD')
        post.formattedTime = moment(post.timestamp).format('MMMM Do, YYYY')
      }
      let html = template({ post: post, timestamp: timestamp, env: env })
      s3.putObject({ Body: html, Bucket: 'sonyafalcon.com', Key: `client/dist/${post.id}`, ContentType: 'text/html' }, (err) => {
        if (err) reject(err)
        else {
          s3.putObject({ Body: html, Bucket: 'www.sonyafalcon.com', Key: `client/dist/${post.id}`, ContentType: 'text/html' }, (err) => {
            if (err) reject(err)
            else resolve({ msg: `Successfully rendered post '${post.id}'` })
          })
        }
      })
    })
  })
}

const getPosts = (event) => {
  return new Promise((resolve, reject) => {
    let params = {
      TableName: process.env.DYNAMODB_TABLE,
      IndexName: 'posts_index',
      KeyConditionExpression: 'author = :email',
      ExpressionAttributeValues: {
        ':email': process.env.ADMIN_EMAIL
      }
    }
    dynamodb.query(params, (err, result) => {
      if (err) reject(err)
      else {
        result.Items.forEach((post) => {
          delete post.author
          return post
        })
        resolve(result.Items)
      }
    })
  })
}

const getPost = (event) => {
  return new Promise((resolve, reject) => {
    let id
    if (event.path && event.path.id) id = event.path.id
    else if (event.body && event.body.id) id = event.body.id
    let params = {
      TableName: process.env.DYNAMODB_TABLE,
      IndexName: 'posts_id_index',
      KeyConditionExpression: 'id = :slug',
      ExpressionAttributeValues: {
        ':slug': id
      }
    }
    dynamodb.query(params, (err, result) => {
      if (err || !result.Items.length) reject(err)
      else {
        result.Items.forEach((post) => {
          delete post.author
          return post
        })
        resolve(result.Items)
      }
    })
  })
}

const createPost = (event) => {
  return new Promise((resolve, reject) => {
    axios({ method: 'post', url: `${process.env.USER_API}/authenticate`, headers: { 'Authorization': event.headers.Authorization } })
      .then((res) => {
        let params = {
          TableName: process.env.DYNAMODB_TABLE,
          Item: {
            id: event.body.id,
            title: event.body.title,
            page: event.body.page,
            author: res.data.body.user.email,
            category: event.body.category,
            timestamp: event.body.timestamp,
            titleImg: event.body.titleImg,
            rawText: event.body.rawText,
            scheduled: event.body.scheduled,
            tags: event.body.tags,
            published: event.body.published
          }
        }
        dynamodb.put(params, (err) => {
          if (err) reject(err)
          else resolve({ msg: `Successfully saved post '${event.body.id}'` })
        })
      })
      .catch(reject)
  })
}

const updatePost = (event, internal) => {
  return new Promise((resolve, reject) => {
    const update = () => {
      let params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          id: event.body.id,
          timestamp: event.body.timestamp
        },
        UpdateExpression: 'set title = :title, page = :page, titleImg = :titleImg, rawText = :rawText, category = :category, scheduled = :scheduled, tags = :tags, published = :published',
        ExpressionAttributeValues: {
          ':title': event.body.title,
          ':page': event.body.page,
          ':category': event.body.category,
          ':titleImg': event.body.titleImg,
          ':rawText': event.body.rawText,
          ':scheduled': event.body.scheduled,
          ':tags': event.body.tags,
          ':published': event.body.published
        },
        ReturnValues: 'UPDATED_NEW'
      }
      dynamodb.update(params, (err) => {
        if (err) reject(err)
        else resolve({ msg: `Successfully updated post '${event.body.id}'` })
      })
    }
    if (internal) update()
    else {
      axios({ method: 'post', url: `${process.env.USER_API}/authenticate`, headers: { 'Authorization': event.headers.Authorization } })
        .then(update)
        .catch(reject)
    }
  })
}

const deletePost = (event) => {
  return new Promise((resolve, reject) => {
    axios({ method: 'post', url: `${process.env.USER_API}/authenticate`, headers: { 'Authorization': event.headers.Authorization } })
      .then((res) => {
        let params = {
          TableName: process.env.DYNAMODB_TABLE,
          Key: {
            id: event.body.id,
            timestamp: event.body.timestamp
          }
        }
        dynamodb.delete(params, (err) => {
          if (err) reject(err)
          else {
            s3.deleteObject({ Bucket: 'sonyafalcon.com', Key: `client/dist/${event.body.id}` }, (err) => {
              if (err) reject(err)
              else {
                s3.deleteObject({ Bucket: 'www.sonyafalcon.com', Key: `client/dist/${event.body.id}` }, (err) => {
                  if (err) reject(err)
                  else resolve({ msg: `Successfully deleted post '${event.body.id}'` })
                })
              }
            })
          }
        })
      })
      .catch(reject)
  })
}

const getMediaLibrary = (event) => {
  return new Promise((resolve, reject) => {
    axios({ method: 'post', url: `${process.env.USER_API}/authenticate`, headers: { 'Authorization': event.headers.Authorization } })
      .then((res) => {
        let params = {
          Bucket: process.env.CDN_BUCKET,
          MaxKeys: 999999999,
          Expires: 60
        }
        s3.getSignedUrl('listObjects', params, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
      .catch(reject)
  })
}

const getS3UploadCredentials = (event) => {
  return new Promise((resolve, reject) => {
    axios({ method: 'post', url: `${process.env.USER_API}/authenticate`, headers: { 'Authorization': event.headers.Authorization } })
      .then((res) => {
        let params = {
          Bucket: process.env.CDN_BUCKET,
          Key: event.query.filename,
          Expires: 60,
          ContentType: event.query.type
        }
        s3.getSignedUrl('putObject', params, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
      .catch(reject)
  })
}

const publish = (event) => {
  return getPost(event)
    .then((result) => {
      let post = JSON.parse(JSON.stringify(result[0]))
      return getCloudFrontId()
        .then(getDistributionConfig)
        .then((res) => render(result[0], parseInt((res.DistributionConfig.DefaultRootObject.replace('index-', '')).replace('.html', '')), 'prod'))
        .then(() => {
          post.author = process.env.ADMIN_EMAIL
          post.published = true
          event.body = post
          sgMail.send({
            to: process.env.ADMIN_EMAIL,
            from: 'newsletter@sonyafalcon.com',
            subject: 'Your post has been published',
            text: `You published '${post.title}'. View it at https://sonyafalcon.com/${post.id}.`,
            html: `<h1>You published '${post.title}'.</h1><p>View it at https://sonyafalcon.com/${post.id}.</p>`
          })
          return updatePost(event)
        })
    })
}

const publishScheduled = (event) => {
  return getPosts(event)
    .then((results) => {
      return Promise.map(results, (result) => {
        if (!result.published && result.scheduled && (moment(result.scheduled).valueOf() < moment().valueOf())) {
          let post = JSON.parse(JSON.stringify(result))
          return getCloudFrontId()
            .then(getDistributionConfig)
            .then((res) => render(result, parseInt((res.DistributionConfig.DefaultRootObject.replace('index-', '')).replace('.html', '')), 'prod'))
            .then(() => {
              post.author = process.env.ADMIN_EMAIL
              post.published = true
              event.body = post
              sgMail.send({
                to: process.env.ADMIN_EMAIL,
                from: 'newsletter@sonyafalcon.com',
                subject: 'Your post has been published',
                text: `You published '${post.title}'. View it at https://sonyafalcon.com/${post.id}.`,
                html: `<h1>You published '${post.title}'.</h1><p>View it at https://sonyafalcon.com/${post.id}.</p>`
              })
              return updatePost(event, true)
            })
        } else return Promise.resolve()
      })
    })
}

const prerender = (event) => {
  return axios({ method: 'post', url: `${process.env.USER_API}/authenticate`, headers: { 'Authorization': event.headers.Authorization } })
    .then(() => getPost(event))
    .then((result) => {
      return getCloudFrontId()
        .then(getDistributionConfig)
        .then((res) => render(result[0], parseInt((res.DistributionConfig.DefaultRootObject.replace('index-', '')).replace('.html', '')), 'prod'))
    })
}

module.exports = {
  getCloudFrontId: getCloudFrontId,
  getDistributionConfig: getDistributionConfig,
  render: render,
  getPosts: getPosts,
  getPost: getPost,
  updatePost: updatePost,
  createPost: createPost,
  deletePost: deletePost,
  getMediaLibrary: getMediaLibrary,
  getS3UploadCredentials: getS3UploadCredentials,
  publish: publish,
  publishScheduled: publishScheduled,
  prerender: prerender,
  succeed: succeed,
  fail: fail
}
