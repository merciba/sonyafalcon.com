import React, { Component } from 'react'
import styled from 'styled-components'
import Typist from 'react-typist'
import { media, sizes } from './breakpoints'

export const MenuLink = styled.a`
  flex: 1;
  text-align: center;
  transform: scale(1, 1.1);
  height: 45px;
  text-transform: uppercase;
  font-family: Ubuntu Mono, monospace;
  ${media.desktoplarge`font-size: 25px`}
  ${media.desktop`font-size: 20px`}
  ${media.tablet`font-size: 16px`}
  ${media.mobile`font-size: 13px`}
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 45px;
`

export const MenuText = styled.p`
  flex: 1;
  text-align: center;
  transform: scale(1, 1.1);
  height: 45px;
  text-transform: uppercase;
  font-family: Ubuntu Mono, monospace;
  ${media.desktoplarge`font-size: 25px`}
  ${media.desktop`font-size: 20px`}
  ${media.tablet`font-size: 16px`}
  ${media.mobile`font-size: 13px`}
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 45px;
`

export class Menu extends Component {
  constructor (props) {
    super(props)
    this.renderLinks = this.renderLinks.bind(this)
  }
  renderLinks (item) {
    let Item = exports[`Menu${item.type}`]
    return <Item target={item.target} key={item.title} href={item.url} style={{ color: item.color, minWidth: item.width }}><span style={{ height: window.innerHeight * 0.2}}>{item.title}</span></Item>
  }
  render () {
    return (<div style={{ textAlign: 'center', position: 'absolute', background: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'center', bottom: 0, left: window.innerWidth * 0.1, width: window.innerWidth * 0.8, height: window.innerHeight * 0.2 }}>
      {(env === "dev") ? this.props.content.ITEMS.map(this.renderLinks) : this.props.content.PLACEHOLDER.map(this.renderLinks)}
    </div>)
  }
}

export class InteriorMenu extends Component {
  constructor (props) {
    super(props)
    this.renderLinks = this.renderLinks.bind(this)
  }
  renderLinks (item) {
    return <a 
      key={item.title} 
      href={item.url} 
      style={{ 
        flex: 1,
        textAlign: 'center',
        color: item.color,
        height: 45,
        textTransform: 'uppercase',
        fontFamily: "'Ubuntu-Mono', monospace",
        fontSize: window.innerHeight * 0.022,
        fontWeight: 'bold',
        letterSpacing: 5,
        lineHeight: 45,
        minWidth: item.width
      }}>
      <span
        style={{
          height: window.innerHeight * 0.2
        }}>
          {item.title}
        </span>
    </a>
  }
  render () {
    return (<div style={{ textAlign: 'center', position: 'absolute', background: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'center', top: 0, left: window.innerWidth * 0.1, width: window.innerWidth * 0.8, height: window.innerHeight * 0.2, zIndex: 1 }}>
      {this.props.content.ITEMS.map(this.renderLinks)}
    </div>)
  }
}