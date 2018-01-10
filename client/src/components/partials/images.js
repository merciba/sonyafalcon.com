import React, { Component } from 'react'
import styled from 'styled-components'
import isMobile from 'ismobilejs'

export const BackgroundImage = ({ src }) => (<img src={src} style={{ width: (x > 1544 ? x : 'auto'), height: isMobile.phone ? y : (y > 1024 ? y : 'auto'), objectFit: 'cover' }} />)

export const FullScreenImage = ({ src }) => (<div style={{ background: `url('${src}')`, backgroundSize: 'cover', width: '100%', height: '100vh', backgroundRepeat: 'no-repeat' }} />)

export const HalfScreenImage = ({ src }) => (<div style={{ background: `url('${src}')`, backgroundSize: 'cover', width: innerWidth / 2, height: '100%' }} />)

export const HeaderImage = styled.img`
    z-index: 0;
    overflow: hidden;
    width: 100%;
`
