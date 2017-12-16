'use strict'

const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const stats = require('gulp-stats')
const runSequence = require('run-sequence')
const spawn = require('child_process').spawn
const exec = require('child_process').exec
const Promise = require('bluebird')
const _ = require('lodash')
const shell = require('shelljs')
const handlebars = require('handlebars')
const timestamp = Date.now()
const axios = require('axios')
const moment = require('moment')
const markdown = require('markdown').markdown
const credentials = require('./credentials.json')
const cloudfront = new (require('aws-sdk/clients/cloudfront'))({ accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey, region: credentials.region })


require('dotenv').config({silent: true})

let node
let regex = new RegExp('listening at port 5000')

stats(gulp)

gulp.task('browser-sync', function () {
  browserSync.init({
    port: 4000,
    proxy: 'http://localhost:5000'
  })
})

gulp.task('watch', function () {
  gulp.watch(['client/src/*.js', 'client/src/**/*.js'], function () {
    runSequence('build', 'handlebars', 'server')
  })
})

gulp.task('server', function (done) {
  if (node) node.kill()
  node = spawn('node', ['client/index.js'])
  node.stdout.on('data', (data) => {
    console.log(data.toString())
    if (regex.test(data.toString())) {
      browserSync.reload()
      done()
    }
  })
  node.stderr.on('data', (data) => {
    // throw new Error(data.toString())
  })
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...')
    }
  })
})

gulp.task('build', function (done) {
  shell.rm('client/dist/*')
  exec('webpack', ['--debug'], (err, stdout, stderr) => {
    if (err) throw new Error(err)
    console.log(stdout)
    shell.mv('client/dist/main.js', `client/dist/bundle-${timestamp}.js`)
    done()
  })
})

gulp.task('handlebars', function (done) {
  compile()
    .then(write)
    .then(done)
    .catch(console.log)

  function compile () {
    return new Promise((resolve, reject) => {
      fs.readFile('client/src/index.hbs', 'utf-8', function (error, source) {
        if (error) reject(error)
        var template = handlebars.compile(source)
        var html = template({ timestamp, env: process.env.NODE_ENV, metaImg: 'https://s3.amazonaws.com/cdn.sonyafalcon.com/2017/10/10/80440010.JPG' })
        resolve(html)
      })
    })
  }

  function write (html) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`client/dist/index-${timestamp}.html`, html, function (error, source) {
        if (error) reject(error)
        resolve()
      })
    })
  }
})

gulp.task('cloudfront', function (done) {
  getCloudFrontId()
    .then(updateDistribution)
    .then(() => {
      console.log(`CloudFront Distribution ${credentials.cloudFrontDistribution} updated.`)
      done()
    })

  function getCloudFrontId () {
    return cloudfront.listDistributions().promise()
      .then((distributions) => _.find(distributions.DistributionList.Items, { DomainName: credentials.cloudFrontDistribution }))
  }

  function updateDistribution (distribution) {
    const getDistributionConfig = () => {
      return cloudfront.getDistributionConfig({ Id: distribution.Id }).promise()
        .then(({ ETag, DistributionConfig }) => {
          let oldTimestamp = (DistributionConfig.DefaultRootObject.replace('index-', '')).replace('.html', '')
          shell.exec(`aws s3 rm s3://sonyafalcon.com/client/dist/index-${oldTimestamp}.html --profile merciba`)
          shell.exec(`aws s3 rm s3://sonyafalcon.com/client/dist/bundle-${oldTimestamp}.js --profile merciba`)
          shell.exec(`aws s3 rm s3://www.sonyafalcon.com/client/dist/index-${oldTimestamp}.html --profile merciba`)
          shell.exec(`aws s3 rm s3://www.sonyafalcon.com/client/dist/bundle-${oldTimestamp}.js --profile merciba`)
          shell.exec(`aws s3 cp client/dist/index-${timestamp}.html s3://sonyafalcon.com/client/dist/index-${timestamp}.html --profile merciba --content-type "text/html"`)
          shell.exec(`aws s3 cp client/dist/bundle-${timestamp}.js s3://sonyafalcon.com/client/dist/bundle-${timestamp}.js --profile merciba --content-type "application/javascript"`)
          shell.exec(`aws s3 cp client/dist/index-${timestamp}.html s3://www.sonyafalcon.com/client/dist/index-${timestamp}.html --profile merciba --content-type "text/html"`)
          shell.exec(`aws s3 cp client/dist/bundle-${timestamp}.js s3://www.sonyafalcon.com/client/dist/bundle-${timestamp}.js --profile merciba --content-type "application/javascript"`)
          return { ETag, DistributionConfig }
        })
    }
    return getDistributionConfig()
      .then(({ ETag, DistributionConfig }) => {
        DistributionConfig.DefaultRootObject = `index-${timestamp}.html`
        DistributionConfig.CustomErrorResponses = {
          Quantity: 2,
          Items: [
            {
              ErrorCode: 404,
              ResponsePagePath: `/index-${timestamp}.html`,
              ResponseCode: '200',
              ErrorCachingMinTTL: 30
            },
            {
              ErrorCode: 403,
              ResponsePagePath: `/index-${timestamp}.html`,
              ResponseCode: '200',
              ErrorCachingMinTTL: 30
            }
          ]
        }
        let params = {
          Id: distribution.Id,
          DistributionConfig,
          IfMatch: ETag
        }
        return cloudfront.updateDistribution(params).promise()
      })
  }
})

gulp.task('dev', function () {
  runSequence('build', 'handlebars', 'watch', 'server', 'browser-sync')
})

gulp.task('deploy', function () {
  runSequence('build', 'handlebars', 'cloudfront')
})

gulp.task('test', ['getPosts'])

gulp.task('default', ['dev'])

process.on('exit', function () {
  if (node) node.kill()
})
