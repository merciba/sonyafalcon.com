import React, { Component } from 'react'
import _ from 'lodash'
import { InteriorMenu, PostTitle, PostSubCategory, PostContent, FlexContainer } from './partials'
import { MENU, ABOUT } from '../content.json'

class About extends Component {

  renderParagraphs (text, index) {
    return <p style={{ padding: '0 15px', flex: 1 }} key={index}>{text}</p>
  }

  renderLinks ({ title, url }, index) {
    return <a style={{ padding: '0 15px', flex: 1 }} key={index} href={url}>{title}</a>
  }

  render () {
    return <article>
      <InteriorMenu content={MENU} post={{ category: 'About' }} ref='menu' />
      <FlexContainer style={{ height: '100%', padding: 30, marginTop: 87, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, marginRight: 15, maxHeight: 1000, overflow: 'hidden' }}>
          <img style={{ width: '100%', marginTop: '-25%' }} src={ABOUT.IMG} />
        </div>
        <PostContent style={{ flex: 1, marginLeft: 15, height: '80%', display: 'flex', flexDirection: 'column' }}>
          <PostTitle>{ABOUT.TITLE}</PostTitle>
          <PostSubCategory>{ABOUT.SUBTITLE}</PostSubCategory>
          {ABOUT.CONTENT.map(this.renderParagraphs.bind(this))}
          {ABOUT.LINKS.map(this.renderLinks.bind(this))}
        </PostContent>
      </FlexContainer>
    </article>
  }
}

export default About
