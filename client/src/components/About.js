import React, { Component } from 'react'
import _ from 'lodash'
import { InteriorMenu, H5, PostTitle, PostSubCategory, PostContent, FlexContainer } from './partials'
import { MENU, ABOUT } from '../content.json'

class About extends Component {

  renderParagraphs (text, index) {
    return <p style={{ padding: '0 15px', display: 'flex', flex: 1 }} dangerouslySetInnerHTML={{ __html: text }} key={index} />
  }

  renderLinks ({ title, url }, index) {
    return <H5 style={{ padding: '0 15px', color: '#FF696B', maxHeight: 35, width: 131, fontSize: 20, letterSpacing: 1, lineHeight: 35 }} key={index} href={url}>{title}</H5>
  }

  render () {
    return <article>
      <InteriorMenu content={MENU} post={{ category: 'About' }} ref='menu' />
      <FlexContainer style={{ height: '100%', padding: 30, marginTop: 87, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, marginRight: 15, maxHeight: '80%', overflow: 'hidden' }}>
          <img style={{ width: '100%', marginTop: '-25%' }} src={ABOUT.IMG} />
        </div>
        <PostContent style={{ flex: 1, fontSize: '1.75vh', maxHeight: '90vh', marginLeft: 15, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <PostTitle>{ABOUT.TITLE}</PostTitle>
          <PostSubCategory>{ABOUT.SUBTITLE}</PostSubCategory>
          {ABOUT.CONTENT.map(this.renderParagraphs.bind(this))}
          <div style={{ marginTop: -320 }}>{ABOUT.LINKS.map(this.renderLinks.bind(this))}</div>
        </PostContent>
      </FlexContainer>
    </article>
  }
}

export default About
