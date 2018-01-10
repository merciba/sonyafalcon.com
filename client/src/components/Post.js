import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { markdownToHtml } from '../util'
import moment from 'moment'
import { InteriorMenu, InteriorSubMenu, FlexContainer, HeaderImage, PostTitle, PostSubCategory, PostContent, PostContainer } from './partials'
import { MENU } from '../content.json'

class Post extends Component {
  componentDidMount () {
    let id = window.location.pathname.replace('/', '')
    if (/.html$/.test(id)) id = id.replace('.html', '')
    this.getPosts()
      .then((res) => {
        if (res.data.body && res.data.body.length) {
          let posts = res.data.body
          let post
          if (id === 'case-studies') post = _.filter(res.data.body, { category: "Case Studies" })[0]
          else post = _.find(res.data.body, { id })
          if (post.published) {
            this.setState({ post, posts })
          } else window.location.replace('/error')
        } else window.location.replace('/error')
      })
      .catch((err) => {
        console.log(err)
        //window.location.replace('/error')
      })
  }
  getPosts () {
    return axios({ method: 'get', url: `${window.config.post}` })
  }
  createMarkup () {
    let html = markdownToHtml(this.state.post.rawText)
    return { __html: html }
  }
  render () {
    return this.state ? (<section>
      <InteriorMenu content={MENU} post={this.state.post} ref='menu' />
      { this.state.post.title === 'About' ? null : <InteriorSubMenu post={this.state.post} posts={_.filter(this.state.posts, { category: this.state.post.category })} /> }
      { (this.state && this.state.post)
        ? (<FlexContainer style={{ flexDirection: 'column', marginTop: 162 }}>
          <HeaderImage src={this.state.post.titleImg} />
          <PostContainer>
            <PostTitle>{ this.state.post.title }</PostTitle>
            { this.state.post.subcategory !== "None" ? <PostSubCategory>{ this.state.post.subcategory }</PostSubCategory> : null }
            { this.state.post.page ? null : <time style={{ fontWeight: 'bold', marginTop: 15 }} dateTime={moment(this.state.post.timestamp).format('YYYY-MM-DD')}>{ moment(this.state.post.timestamp).format('MMMM Do, YYYY') }</time>}
            <PostContent dangerouslySetInnerHTML={this.createMarkup()} className='content' />
          </PostContainer>
        </FlexContainer>)
        : null }
    </section>) : null
  }
}

export default Post
