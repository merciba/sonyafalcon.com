import React, { Component } from 'react'
import styled from 'styled-components'
import Typist from 'react-typist'
import { media, sizes, screenIs } from './breakpoints'

export const MenuLink = styled.a`
  flex: 1;
  text-align: center;
  transform: scale(1, 1.1);
  height: 45px;
  ${media.tablet`min-width: 100%;`}
  ${media.mobile`min-width: 100%;`}
  ${media.tablet`text-align: inherit;`}
  ${media.mobile`text-align: inherit;`}
  text-transform: uppercase;
  font-family: Ubuntu Mono, monospace;
  ${media.huge`font-size: 3vh;`}
  ${media.desktoplarge`font-size: 3vh;`}
  ${media.desktop`font-size: 2.5vh;`}
  ${media.tablet`font-size: 2.5vh;`}
  ${media.mobile`font-size: 2vh;`}
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 45px;
`

export const MenuText = styled.p`
  flex: 1;
  text-align: center;
  transform: scale(1, 1.1);
  height: 45px;
  ${media.tablet`min-width: 100%;`}
  ${media.mobile`min-width: 100%;`}
  ${media.tablet`text-align: inherit;`}
  ${media.mobile`text-align: inherit;`}
  text-transform: uppercase;
  font-family: Ubuntu Mono, monospace;
  ${media.huge`font-size: 3vh;`}
  ${media.desktoplarge`font-size: 3vh;`}
  ${media.desktop`font-size: 2.5vh;`}
  ${media.tablet`font-size: 2.5vh;`}
  ${media.mobile`font-size: 2vh;`}
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 45px;
`

export const MenuContainer = styled.div`
  text-align: center;
  position: absolute;
  background: transparent;
  display: flex;
  ${media.huge`flex-direction: row;`}
  ${media.desktoplarge`flex-direction: row;`}
  ${media.desktop`flex-direction: row;`}
  ${media.tablet`flex-direction: row;`}
  ${media.mobile`flex-direction: column;`}
  justify-content: space-between;
  ${media.huge`bottom: 0;`}
  ${media.desktoplarge`bottom: 0;`}
  ${media.desktop`bottom: 0;`}
  ${media.tablet`bottom: 10vh;`}
  ${media.mobile`bottom: 10vh;`}
  margin-left: 10%;
  margin-right: 10%;
  width: 80%;
  height: 20%;
`

export const LeftMenu = styled.div`
  flex: 1;
  display: flex;
  ${media.tablet`text-align: left;`}
  ${media.mobile`text-align: left;`}
  ${media.huge`flex-direction: row;`}
  ${media.desktoplarge`flex-direction: row;`}
  ${media.desktop`flex-direction: row;`}
  ${media.tablet`flex-direction: column;`}
  ${media.mobile`flex-direction: column;`}
  justify-content: flex-start;
  ${media.huge`max-width: 55%;`}
  ${media.desktoplarge`max-width: 55%;`}
  ${media.desktop`max-width: 55%;`}
  ${media.tablet`max-width: 60%;`}
  ${media.mobile`max-width: 60%;`}
`

export const RightMenu = styled.div`
  flex: 1;
  display: flex;
  ${media.tablet`text-align: right;`}
  ${media.mobile`text-align: right;`}
  ${media.huge`flex-direction: row;`}
  ${media.desktoplarge`flex-direction: row;`}
  ${media.desktop`flex-direction: row;`}
  ${media.tablet`flex-direction: column;`}
  ${media.mobile`flex-direction: column;`}
  justify-content: flex-end;
  ${media.huge`max-width: 33%;`}
  ${media.desktoplarge`max-width: 33%;`}
  ${media.desktop`max-width: 33%;`}
  ${media.tablet`max-width: 100%;`}
  ${media.mobile`max-width: 100%;`}
`

export class Menu extends Component {
  constructor (props) {
    super(props)
    this.renderLinks = this.renderLinks.bind(this)
  }
  renderLinks (item) {
    let Item = exports[`Menu${item.type}`]
    return <Item target={item.target} key={item.title} href={item.url} style={{ color: item.color, maxWidth: item.width, padding: 10 }}><span style={{ height: window.innerHeight * 0.2 }}>{item.title}</span></Item>
  }
  render () {
    return (window.env === 'dev')
      ? (<MenuContainer>
        <LeftMenu>{this.props.content.LEFT.map(this.renderLinks)}</LeftMenu>
        <RightMenu>{this.props.content.RIGHT.map(this.renderLinks)}</RightMenu>
      </MenuContainer>)
      : (<MenuContainer>
        {this.props.content.PLACEHOLDER.map(this.renderLinks)}
      </MenuContainer>)
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
    return (<div style={{ textAlign: 'center', position: 'absolute', background: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'center', top: 0, left: '10%', width: '80%', height: '20%', zIndex: 1 }}>
      <LeftMenu>{this.props.content.LEFT.map(this.renderLinks)}</LeftMenu>
      <RightMenu>{this.props.content.RIGHT.map(this.renderLinks)}</RightMenu>
    </div>)
  }
}