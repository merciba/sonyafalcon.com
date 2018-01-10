import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import {
  FullScreenContainer,
  FullScreenImage,
  TopLeftWidget,
  TopCenterWidget,
  TopRightWidget,
  BottomLeftWidget,
  BottomRightWidget,
  LogoContainer,
  ComingSoon,
  Menu,
  media,
  sizes,
  screenIs
} from './partials'
import { MENU, LOGO, HOME } from '../content.json'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
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
  getPosts () {
    return axios({ method: 'get', url: window.config.post })
  }
  renderTitle (title) {
    return <p key={title} style={{ height: 35, fontWeight: 'bold', color: '#FC5058', fontSize: 18, fontFamily: 'Ubuntu Mono', letterSpacing: 1, lineHeight: 26 }}>{title}</p>
  }
  render () {
    return <FullScreenContainer>
      <FullScreenImage src={screenIs('mobile') ? LOGO.url.mobile : LOGO.url.desktop} />
      <TopLeftWidget src={HOME.TOPLEFT} />
      <TopCenterWidget src={HOME.TOPCENTER} />
      <TopRightWidget src={HOME.TOPRIGHT} />
      <BottomLeftWidget src={HOME.BOTTOMLEFT} />
      <BottomRightWidget src={HOME.BOTTOMRIGHT} />
      <LogoContainer>
        <img style={{ flex: 1 }} src={'https://s3.amazonaws.com/cdn.sonyafalcon.com/logo-landing.svg'} />
      </LogoContainer>
      {
        // TODO: Remove this at launch
        window.env === 'prod'
        ? (<ComingSoon>
          {HOME.TITLES.map(this.renderTitle)}
        </ComingSoon>)
        : null
      }
      <Menu content={MENU} />
    </FullScreenContainer>
  }
}

export default Home
