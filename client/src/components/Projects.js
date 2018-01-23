import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { markdownToHtml } from '../util'
import moment from 'moment'
import { InteriorMenu, InteriorSubMenu, FlexContainer, HeaderImage, PostTitle, PostSubCategory, PostContent, PostContainer, PostDetailsContainer, PostDetails, PostDetailsTitle, PostDetailsDescription, PostDetailsLine } from './partials'
import { MENU } from '../content.json'

class Projects extends Component {
  componentDidMount () {
    this.sections = {}
    window.onscroll = this.onScroll.bind(this)
    let id = window.location.pathname.replace('/', '')
    if (/.html$/.test(id)) id = id.replace('.html', '')
    this.getPosts()
      .then((res) => {
        if (res.data.body && res.data.body.length) {
          let posts = _.filter(res.data.body, { published: true, category: 'Projects' })
          let post = posts[0]
          this.setState({ posts, post })
        } else window.location.replace('/error')
      })
      .catch((err) => {
        console.log(err)
        // window.location.replace('/error')
      })
  }
  getPosts () {
    return axios({ method: 'get', url: `${window.config.post}` })
  }
  createMarkup (post) {
    let html = markdownToHtml(post.rawText)
    return { __html: html }
  }
  onScroll (event) {
    _.map(Object.keys(this.sections), (sectionId) => {
      if ((this.sections[sectionId].offsetTop - document.documentElement.scrollTop) <= 150) {
        this.setState({ post: _.find(this.state.posts, { id: sectionId }) })
      }
    })
  }
  renderPosts (post) {
    return <section ref={(ref) => { this.sections[`${post.id}`] = ref }}>
      <FlexContainer style={{ flexDirection: 'column', marginTop: 162 }}>
        <HeaderImage src={post.titleImg} />
        <PostContainer>
          <PostDetailsContainer>
            {post.details.map(({ title, description }, index) => <PostDetails key={title}>
              <PostDetailsTitle>{title}</PostDetailsTitle>
              <PostDetailsDescription>{description}</PostDetailsDescription>
              { index === (post.details.length - 1) ? null : <PostDetailsLine /> }
            </PostDetails>)}
          </PostDetailsContainer>
          <PostTitle>{ post.title }</PostTitle>
          { post.subcategory !== 'None' ? <PostSubCategory>{ post.subcategory }</PostSubCategory> : null }
          { post.page ? null : <time style={{ fontWeight: 'bold', marginTop: 15 }} dateTime={moment(post.timestamp).format('YYYY-MM-DD')}>{ moment(post.timestamp).format('MMMM Do, YYYY') }</time>}
          <PostContent dangerouslySetInnerHTML={this.createMarkup(post)} className='content' />
        </PostContainer>
      </FlexContainer>
    </section>
  }
  render () {
    return this.state ? (<article>
      <InteriorMenu content={MENU} post={this.state.post} />
      <InteriorSubMenu post={this.state.post} posts={this.state.posts} />
      { this.state.posts.map(this.renderPosts.bind(this)) }
    </article>) : null
  }
}

export default Projects
