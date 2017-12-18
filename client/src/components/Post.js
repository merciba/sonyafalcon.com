import React, { Component } from 'react'
import axios from 'axios'
import { markdownToHtml } from '../util'
import moment from 'moment'
import ShareButtons from './ShareButtons'
import { Menu } from './partials'
import { MENU } from '../content.json'

class Post extends Component {
  componentDidMount () {
    let id = window.location.pathname.replace('/', '')
    if (/.html$/.test(id)) id = id.replace('.html', '')
    this.getPost(id)
      .then((res) => {
        if (res.data.body && res.data.body.length) {
          let post = res.data.body[0]
          if (post.published) {
            this.setState({ post })
          } else window.location.replace('/error')
        } else window.location.replace('/error')
      })
      .catch((err) => {
        console.log(err)
        //window.location.replace('/error')
      })
  }
  getPost (id) {
    return axios({ method: 'get', url: `${window.config.post}/${id}` })
  }
  createMarkup () {
    let html = markdownToHtml(this.state.post.rawText)
    return { __html: html }
  }
  render () {
    return (<section className='section'>
      <Menu content={MENU} ref='menu' />
      { (this.state && this.state.post) ? <div className='container' style={{ width: '100%' }}>
        <div style={{ overflow: 'hidden', height: 'auto', width: '100%', marginTop: 15 }}><img src={this.state.post.titleImg} /></div>
        <h1 className='title' style={{ marginTop: 15 }}>{ this.state.post.title }</h1>
        { this.state.post.page ? null : <time style={{ fontWeight: 'bold', marginTop: 15 }} dateTime={moment(this.state.post.timestamp).format('YYYY-MM-DD')}>{ moment(this.state.post.timestamp).format('MMMM Do, YYYY') }</time>}
        <div style={{ marginTop: 15 }} dangerouslySetInnerHTML={this.createMarkup()} className='content' />
        <ShareButtons titleImg={this.state.post.titleImg} />
      </div> : null }
    </section>)
  }
}

export default Post
