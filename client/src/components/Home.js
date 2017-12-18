import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { BackgroundImage, Title, BoldText, Text, Input, SubmitButton, ScrollContainer, FullScreenContainer, FullScreenImage, Menu } from './partials'
import { MENU, LOGO, HOME } from '../content.json'

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
      window.onresize = () => this.forceUpdate()

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
  renderTitle (title) {
    return <p style={{ height: 35, fontWeight: 'bold', color: '#FC5058', fontSize: 22, fontFamily: 'Montserrat', letterSpacing: 1, lineHeight: 26 }}>{title}</p>
  }
  render () {
    return <FullScreenContainer >
        <FullScreenImage src={LOGO.url}/>
        <img style={{ position: 'absolute', top: 15, left: 15 }} src={HOME.TOPLEFT}/>
        <img style={{ position: 'absolute', top: 15, left: (window.innerWidth / 2) - (117 / 2) }} src={HOME.TOPCENTER}/>
        <img style={{ position: 'absolute', top: 15, right: 15 }} src={HOME.TOPRIGHT}/>
        <img style={{ position: 'absolute', bottom: 15, left: 15 }} src={HOME.BOTTOMLEFT}/>
        <img style={{ position: 'absolute', bottom: 15, right: 15 }} src={HOME.BOTTOMRIGHT}/>
        <img style={{ position: 'absolute', top: (window.innerHeight / 2) - 205, left: (window.innerWidth / 2) - (432 / 2) }} src={'https://s3.amazonaws.com/cdn.sonyafalcon.com/logo-landing.svg'} />
        <div style={{ position: 'absolute', top: '30%', left: '58%' }}>
          {HOME.TITLES.map(this.renderTitle)}
        </div>
        <Menu content={MENU}/>
      </FullScreenContainer>
  }
}

export default Home
