import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { BackgroundImage, Title, BoldText, Text, Input, SubmitButton, ScrollContainer, FullScreenContainer } from './partials'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      subscribed: false,
      email: '',
      posts: []
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.submitEmail = this.submitEmail.bind(this)
  }
  componentDidMount () {
    this.getPosts()
      .then((res) => {
        let posts = _.sortBy(res.data.body, (o) => moment(o.date).format('YYYYMMDD'))
        this.setState({ posts })
        console.log(this.state.posts)
      })
      .catch(console.log)
  }
  onInputChange (e) {
    this.setState({ email: e.target.value })
  }
  getPosts () {
    return axios({ method: 'get', url: window.config.post })
  }
  submitEmail () {
    this.setState({
      subscribed: true,
      email: ''
    })
    return axios({ method: 'post', url: `${config.user}/newsletter/subscribe`, data: { email: this.state.email } })
      .catch(console.log)
  }
  render () {
    return env === 'dev'
      ? (<FullScreenContainer >
        <ScrollContainer
          posts={this.state.posts} />
      </FullScreenContainer>)
      : (<section style={{ width: '100%', height: '100%' }}>
        <BackgroundImage src={`${cdn}/2017/10/10/80440010.JPG`} />
        <div className='hero' style={{ position: 'absolute', top: 0, left: 10, backgroundColor: 'transparent' }}>
          <div className='hero-body' style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: 10 }}>
            <div className='container'>
              <Title>Sonya Falcon</Title>
              <hr />
              <Text>Coming Soon</Text>
            </div>
          </div>
        </div>
      </section>)
  }
}

export default Home
