import React, { Component } from 'react'
import styled from 'styled-components'
import isMobile from 'ismobilejs'

export const BackgroundImage = ({ src }) => (<img src={src} style={{ width: (window.x > 1544 ? window.x : 'auto'), height: isMobile.phone ? window.y : (window.y > 1024 ? window.y : 'auto'), objectFit: 'cover' }} />)

export const FullScreenImage = ({ src }) => (<div style={{ background: `url('${src}')`, backgroundSize: 'cover', width: '100%', height: '100vh', backgroundRepeat: 'no-repeat' }} />)

export const HalfScreenImage = ({ src }) => (<div style={{ background: `url('${src}')`, backgroundSize: 'cover', width: window.innerWidth / 2, height: '100%' }} />)

export const HeaderImage = styled.img`
    z-index: 0;
    overflow: hidden;
    width: 100%;
`
