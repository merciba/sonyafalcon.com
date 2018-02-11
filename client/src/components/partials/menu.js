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
  ${media.desktoplarge`font-size: 2.5vh;`}
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
  ${media.desktoplarge`font-size: 2.5vh;`}
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

export const InteriorMenuContainer = styled.div`
  z-index: 1;
  text-align: center;
  position: fixed;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  top: 0;
  left: 0;
  width: 100%;
  height: 87px;
  border-bottom: 0.25px solid #979797;
`

export const InteriorMenuLogo = styled.img`
  flex: 1;
  margin-top: 5px;
  margin-left: 1vw;
  width: 100%;
`

export const InteriorMenuLink = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
  transform: scale(1, 1.1);
  height: 45px;
  ${media.tablet`min-width: 100%;`}
  ${media.mobile`min-width: 100%;`}
  ${media.tablet`text-align: inherit;`}
  ${media.mobile`text-align: inherit;`}
  text-transform: uppercase;
  font-family: Ubuntu Mono, monospace;
  ${media.huge`font-size: 1.5vh;`}
  ${media.desktoplarge`font-size: 2.5vh;`}
  ${media.desktop`font-size: 2.5vh;`}
  ${media.tablet`font-size: 2.5vh;`}
  ${media.mobile`font-size: 2vh;`}
  font-weight: bold;
  letter-spacing: 5px;
`

export const InteriorMenuText = styled.p`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  transform: scale(1, 1.1);
  height: 45px;
  ${media.tablet`min-width: 100%;`}
  ${media.mobile`min-width: 100%;`}
  ${media.tablet`text-align: inherit;`}
  ${media.mobile`text-align: inherit;`}
  text-transform: uppercase;
  font-family: Ubuntu Mono, monospace;
  ${media.huge`font-size: 3vh;`}
  ${media.desktoplarge`font-size: 2.75vh;`}
  ${media.desktop`font-size: 2.5vh;`}
  ${media.tablet`font-size: 2.25vh;`}
  ${media.mobile`font-size: 2vh;`}
  font-weight: bold;
  letter-spacing: 5px;
`

export const InteriorLeftMenu = styled.div`
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
  ${media.huge`max-width: 42%;`}
  ${media.desktoplarge`max-width: 42%;`}
  ${media.desktop`max-width: 42%;`}
  ${media.tablet`max-width: 42%;`}
  ${media.mobile`max-width: 100%;`}
`

export const InteriorRightMenu = styled.div`
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
  ${media.huge`max-width: 42%;`}
  ${media.desktoplarge`max-width: 42%;`}
  ${media.desktop`max-width: 42%;`}
  ${media.tablet`max-width: 42%;`}
  ${media.mobile`max-width: 100%;`}
`

export const InteriorSubMenuContainer = styled.div`
  z-index: 1;
  padding-left: 1.5vw;
  display: flex;
  flex-direction: row;
  height: 75px;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 87px;
  left: 0;
  background: white;
  width: 100%;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.16);
`

export const InteriorSubMenuLink = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  transform: scale(1, 1.1);
  height: 100%;
  ${media.tablet`min-width: 100%;`}
  ${media.mobile`min-width: 100%;`}
  ${media.tablet`text-align: inherit;`}
  ${media.mobile`text-align: inherit;`}
  text-transform: uppercase;
  font-family: Ubuntu Mono, monospace;
  ${media.huge`font-size: 2vh;`}
  ${media.desktoplarge`font-size: 1.75vh;`}
  ${media.desktop`font-size: 1.5vh;`}
  ${media.tablet`font-size: 1.25vh;`}
  ${media.mobile`font-size: 1vh;`}
  font-weight: bold;
  letter-spacing: 5px;
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
    let Item = exports[`InteriorMenu${item.type}`]
    return <Item target={item.target} key={item.title} href={item.url} style={{ color: this.props.post && (this.props.post.category === item.title) ? '#FF696B' : '#262A3B', minWidth: item.width }}><span style={{ flex: 1, lineHeight: 'auto' }}>{item.title}</span></Item>
  }
  render () {
    return (<InteriorMenuContainer>
      <InteriorLeftMenu>{this.props.content.LEFT.map(this.renderLinks)}</InteriorLeftMenu>
      <a href='/'><InteriorMenuLogo src='https://s3.amazonaws.com/cdn.sonyafalcon.com/interior-logo.svg' /></a>
      <InteriorRightMenu>{this.props.content.RIGHT.map(this.renderLinks)}</InteriorRightMenu>
    </InteriorMenuContainer>)
  }
}

export class InteriorSubMenu extends Component {
  constructor (props) {
    super(props)
    this.renderLinks = this.renderLinks.bind(this)
  }
  renderLinks (item) {
    return <InteriorSubMenuLink target='_self' key={item.title} href={`/${item.id}`} style={{ color: (item.id === this.props.post.id) ? '#FF696B' : '#262A3B', padding: 10 }}><span style={{ lineHeight: 'auto' }}>{item.title}</span></InteriorSubMenuLink>
  }
  render () {
    return (<InteriorSubMenuContainer>
      {this.props.posts.map(this.renderLinks)}
    </InteriorSubMenuContainer>)
  }
}

export class PrivateSubMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      links: [{ id: 'dashboard', title: 'Dashboard' }, { id: 'editor', title: 'New Post' }, ...props.posts],
      post: { id: (window.location.pathname === '/editor') ? 'editor' : ((window.location.pathname === '/dashboard') ? 'dashboard' : window.location.pathname.replace('/editor/', '')) }
    }
    this.renderLinks = this.renderLinks.bind(this)
  }
  renderLinks (item) {
    return <InteriorSubMenuLink target='_self' key={item.title} href={`/${item.id}`} style={{ color: (item.id === this.state.post.id) ? '#FF696B' : '#262A3B', padding: 10 }}><span style={{ lineHeight: 'auto' }}>{item.title}</span></InteriorSubMenuLink>
  }
  render () {
    return (<InteriorSubMenuContainer>
      {this.state.links.map(this.renderLinks)}
    </InteriorSubMenuContainer>)
  }
}
