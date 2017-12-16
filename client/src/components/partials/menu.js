import React, { Component } from 'react'
import styled from 'styled-components'
import Typist from 'react-typist'

export class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      translateY: 0,
      travelTranslateX: -50,
      travelOpacity: 0,
      techTranslateX: -150,
      techOpacity: 0,
      styleTranslateX: -250,
      styleOpacity: 0,
      speed: 250,
      height: 120
    }
    this.scrollDistance = 0
    this.renderLeftContent = this.renderLeftContent.bind(this)
    this.renderRightContent = this.renderRightContent.bind(this)
    this.animateMenuItems = this.animateMenuItems.bind(this)
  }
  animateMenuItems () {
    this.setState({
      styleTranslateX: 0,
      styleOpacity: 1
    })
    setTimeout(() => {
      this.setState({
        techTranslateX: 0,
        techOpacity: 1
      })
      setTimeout(() => {
        this.setState({
          travelTranslateX: 0,
          travelOpacity: 1
        })
      }, this.state.speed)
    }, this.state.speed)
  }
  onScroll (scrolled) {
    if (this.scrollDistance < scrolled) this.setState({ translateY: -(this.state.height) })
    else if (this.state.translateY !== 0) this.setState({ translateY: 0 })
    this.scrollDistance = scrolled
  }
  renderLeftContent (item) {
    switch (item.url) {
      case '/':
        return (<a key={item.title} href={item.url} style={{ display: 'flex', flex: item.flex, marginLeft: 30, marginRight: '5%', minWidth: 500, textAlign: 'center', color: item.color, fontSize: 32, fontFamily: 'Cutive Mono, monospace' }}><span style={{ flex: 1 }}></span><Typist cursor={{ blink: true }} onTypingDone={this.animateMenuItems}>{item.title}</Typist></a>)
        break
      case '/travel':
        return (<a key={item.title} href={item.url} style={{ flex: 1, textAlign: 'center', color: item.color, fontSize: 20, fontFamily: 'Work Sans, sans-serif', transition: `transform ${this.state.speed}ms ease-in-out`, transform: `translateX(${this.state.travelTranslateX}%`, opacity: this.state.travelOpacity }}><span style={{ fontSize: 15, marginRight: 15 }}>✈️</span><span>{item.title}</span></a>)
        break
      case '/tech':
        return (<a key={item.title} href={item.url} style={{ flex: 1, textAlign: 'center', color: item.color, fontSize: 20, fontFamily: 'Work Sans, sans-serif', transition: `transform ${this.state.speed}ms ease-in-out`, transform: `translateX(${this.state.techTranslateX}%`, opacity: this.state.techOpacity }}><span style={{ fontSize: 15, marginRight: 15 }}>💻</span><span>{item.title}</span></a>)
        break
      case '/style':
        return (<a key={item.title} href={item.url} style={{ flex: 1, textAlign: 'center', color: item.color, fontSize: 20, fontFamily: 'Work Sans, sans-serif', transition: `transform ${this.state.speed}ms ease-in-out`, transform: `translateX(${this.state.styleTranslateX}%`, opacity: this.state.styleOpacity }}><span style={{ fontSize: 20, marginRight: 15 }}>🕶</span><span>{item.title}</span></a>)
        break
    }
  }
  renderRightContent (item) {
    return (<a key={item.title} href={item.url} style={{ flex: 1, textAlign: 'center', color: item.color, fontSize: 20, fontFamily: 'Work Sans, sans-serif' }}><span>{item.title}</span></a>)
  }
  render () {
    return (<div style={{ position: 'absolute', transition: 'transform 250ms ease-in-out', transform: `translateY(${this.state.translateY}px)`, top: 0, left: 0, width: innerWidth, height: this.state.height, background: 'white', zIndex: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ width: '60%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>{this.props.content.ITEMS.LEFT.map(this.renderLeftContent)}</div>
      <div style={{ width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        {this.props.content.ITEMS.RIGHT.map(this.renderRightContent)}
        <a href="https://www.facebook.com/sonyafalcon" style={{ flex: 1, color: '#3b5998', maxWidth: 50, marginRight: 15 }} target="_blank" title="Sonya Falcon on Facebook" ><i className="fa fa-facebook" aria-hidden="true"></i></a>
        <a href="https://www.twitter.com/sonyafalcon" style={{ flex: 1, color: '#10dffd', maxWidth: 50, marginRight: 15 }} target="_blank" title="Sonya Falcon on Twitter" ><i className="fa fa-twitter" aria-hidden="true"></i></a>
        <a href="https://www.instagram.com/sonyafalcon" style={{ flex: 1, maxWidth: 50, marginRight: 45, color: '#bc2a8d' }} target="_blank" title="Sonya Falcon on Instagram" ><i className="fa fa-instagram" aria-hidden="true"></i></a>
      </div>
    </div>)
  }
}
