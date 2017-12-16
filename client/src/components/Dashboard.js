import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { markdown } from 'markdown'
import { ButtonsContainer } from './partials'
import Notifications, { notify } from 'react-notify-toast'
import Loader from './Loader'
import { Menu } from './partials'
import { MENU } from '../content.json'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: null,
      user: window.localStorage.getItem('user')
    }
    this.getPosts = this.getPosts.bind(this)
  }
  componentDidMount () {
    this.props.authenticate()
      .then(this.getPosts)
      .then((res) => {
        console.log(res.data.body)
        if (res.data.statusCode === 401) window.location.replace('/login')
        else this.setState({ posts: res.data.body })
      })
      .catch(() => {
        window.location.replace('/login')
      })
  }
  prerender (post) {
    return axios({ method: 'post', url: `${window.config.post}/prerender`, headers: { 'Authorization': window.localStorage.getItem('id_token') }, data: post })
      .then(() => notify.show('Post re-rendered.', 'success'))
      .catch((err) => notify.show(err, 'error'))
  }
  getPosts () {
    return axios({ method: 'get', url: window.config.post })
  }
  deletePost (post) {
    return axios({ method: 'delete', url: window.config.post, headers: { 'Authorization': window.localStorage.getItem('id_token') }, data: post })
      .then(() => {
        this.setState({ posts: _.without(this.state.posts, { id: post.id }) })
        notify.show('Post deleted.', 'success')
      })
  }
  renderPostBox () {
    let { posts } = this.state
    return posts.map((post) =>
      <div key={post.id} className='card' style={{ margin: 10, height: 460, width: 400 }}>
        <div className='card-image'>
          {post.titleImg ? <figure className='image is-3by2'>
            <img src={post.titleImg} alt='Placeholder image' />
          </figure> : null}
        </div>
        <div className='card-content'>
          <div className='media'>
            <div className='media-content'>
              <p className='title is-4'>{ post.published ? post.title : `${post.title} [Draft]`}</p>
            </div>
          </div>
          <div className='content'>
            { post.rawText.substring(0, 100) }
            <br />
            { post.tags.map((tag) => (<a href='#'>{`#${tag}`} </a>)) }
            <br />
            <time dateTime={moment(post.timestamp).format('YYYY-MM-DD')}>{ moment(post.timestamp).format('MMMM Do, YYYY') }</time>
            <ButtonsContainer>
              <button style={{ flex: 1, maxWidth: 75 }} className='button level-item is-primary' onClick={() => window.location.replace(`/${post.id}`)}>View</button>
              <button style={{ flex: 1, maxWidth: 75 }} className='button level-item is-info' onClick={() => window.location.replace(`/editor/${post.id}`)}>Edit</button>
              <button style={{ flex: 1, maxWidth: 75 }} className='button level-item is-info' onClick={() => this.prerender(post)}>Render</button>
              <button style={{ flex: 1, maxWidth: 75 }} className='button is-danger level-item' onClick={() => this.deletePost(post)}>Delete</button>
            </ButtonsContainer>
          </div>
        </div>
      </div>)
  }
  render () {
    return (this.state.posts ? <section className='section' style={{ height: window.innerHeight }}>
      <Notifications />
      <Menu content={MENU} />
      <div style={{ marginTop: 120 }}>
        <h1 className='title'>Dashboard</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', height: '100%' }}>
          <a href='/editor' style={{ display: 'inline' }}>
            <div className='card' style={{ margin: 10, height: 460, width: 400, backgroundColor: '#dddddd', textAlign: 'center', fontSize: 40, paddingTop: '35%' }}>
              <h1>+</h1>
              <h1>New Post</h1>
            </div>
          </a>
          { this.renderPostBox() }
        </div>
      </div>
    </section> : <Loader />)
  }
}

export default Dashboard
