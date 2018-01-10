import React, { Component } from 'react'
import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 3rem;
  padding: 7px;
  font-weight: 400;
  flex: 1;
`

export const SubTitle = styled.h1`
  font-size: 2.5rem;
  padding: 7px;
  font-weight: 400;
  flex: 1;
`

export const LargeText = styled.p`
  font-size: 2rem;
  padding: 7px;
  font-weight: 300;
  flex: 1;
`

export const Text = styled.p`
  font-size: 1.5rem;
  padding: 7px;
  font-weight: 300;
  flex: 1;
`

export const SmallText = styled.p`
  font-size: 1rem;
  padding: 7px;
  font-weight: 300;
`

export const LogoType = styled.p`
  font-family: Cutive Mono, monospace;
  font-size: 1rem;
  padding: 7px;
  font-weight: 300;
`

export const BoldText = styled.h1`
  font-size: 1.5rem;
  padding: 7px;
  font-weight: 400;
`

export const Tags = styled.div`
  flex: 1;
  display: flex;
  height: 50px;
  width: 100%;
  margin-left: 7px;
  flex-direction: row;
  align-items: center;
`

export const Tag = styled.span`
  flex: 1;
  font-weight: bold;
  font-size: 1rem;
  color: black;
`

export const PostTitle = styled.h1`
  height: 28px;
  width: 100%;
  padding-left: 15px;
  color: #000000;
  font-family: "acumin-pro-semi-condensed",sans-serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 28px;
`

export const PostSubCategory = styled.h1`
  height: 28px;
  width: 100%;
  padding-left: 15px;
  color: #000000;
  font-family: "Ubuntu Mono";
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  margin-top: 15px;
`

export const PostContent = styled.div`
  margin-top: 15px;
  padding: 15px;
  font-size: 18px;
  line-height: 28px;
  font-family: "acumin-pro-semi-condensed",sans-serif;
`
