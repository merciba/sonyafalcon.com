import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { InteriorMenu, PostMarkup, InteriorSubMenu } from './partials'
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
          post = _.find(res.data.body, { id })
          if (post && post.published) {
            this.setState({ post, posts })
          } else window.location.replace('/error')
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

  render () {
    return this.state ? (<article>
      <InteriorMenu content={MENU} post={this.state.post} ref='menu' />
      { this.state.post.title === 'About' ? null : <InteriorSubMenu post={this.state.post} posts={_.filter(this.state.posts, { category: this.state.post.category })} /> }
      { (this.state && this.state.post)
        ? (<PostMarkup post={this.state.post} />)
        : null }
    </article>) : null
  }
}

export default Post
