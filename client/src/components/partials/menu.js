import React, { Component } from 'react'
import styled from 'styled-components'
import Typist from 'react-typist'

export class Menu extends Component {
  constructor (props) {
    super(props)
    this.renderLinks = this.renderLinks.bind(this)
  }
  renderLinks (item) {
    return <a key={item.title} href={item.url} style={{ flex: 1, textAlign: 'center', transform: 'scale(1, 1.1)', color: item.color, height: 45, textTransform: 'uppercase', fontFamily: "'Ubuntu', sans-serif", fontSize: window.innerHeight * 0.022,	fontWeight: 'bold',	letterSpacing: 5,	lineHeight: 45, minWidth: item.width }}><span style={{ height: window.innerHeight * 0.2}}>{item.title}</span></a>
  }
  render () {
    return (<div style={{ textAlign: 'center', position: 'absolute', background: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'center', bottom: window.innerHeight * 0.45, left: window.innerWidth * 0.1, width: window.innerWidth * 0.8, height: window.innerHeight * 0.2 }}>
      {this.props.content.ITEMS.map(this.renderLinks)}
    </div>)
  }
}
