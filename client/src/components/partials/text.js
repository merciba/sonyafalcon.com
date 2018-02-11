import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import mime from 'mime-types'
import { markdownToHtml } from '../../util'
import { FlexContainer, HeaderImage, PostContainer, PostDetailsContainer, ImageSection, PostDetails, PostDetailsLine } from './'


export const H1 = styled.h1`
  font-family: "acumin-pro-semi-condensed",sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 30px;
  color: #000000;
`

export const H2 = styled.h2`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 3px;
  line-height: 38px;
  font-family: 'Ubuntu Mono';
  text-transform: uppercase;
  color: #000000;
`

export const H3 = styled.h3`
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 35px;
  font-family: 'Ubuntu Mono';
  text-transform: uppercase;
  color: #000000;
`

export const H4 = styled.h4`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 26px;
  font-family: 'Ubuntu Mono';
  text-transform: uppercase;
  color: #000000;
`

export const H5 = styled.h5`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 14px;
  font-family: 'Ubuntu Mono';
  text-transform: uppercase;
  color: #000000;
`

export const p = styled.p`
  font-size: 18px;
  letter-spacing: 0px;
  letter-spacing: .5px;
  line-height: 28px;
  font-family: "acumin-pro-semi-condensed",sans-serif;
  font-weight: 300;
  color: #000000;
`

export const Title = styled.h1`
  padding: 7px;
  flex: 1;
`

export const SubTitle = styled.h1`
  font-size: 2.5rem;
  padding: 10px;
  font-weight: 400;
  flex: 1;
`

export const LargeText = styled(p)`
  font-size: 2rem;
  padding: 7px;
  font-weight: 300;
  flex: 1;
`

export const Text = styled(p)`
  font-size: 1.5rem;
  padding: 7px;
  font-weight: 300;
  flex: 1;
`

export const SmallText = styled(p)`
  padding: 7px;
  font-weight: 300;
`

export const LogoType = styled(p)`
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

export const PostTitle = styled(H1)`
  height: 28px;
  padding: 0 15px;
`

export const PostDetailsDescription = styled(p)`
  font-family: "Acumin Pro SemiCondensed",sans-serif;
  font-size: 14px;
  font-weight: 200;
  line-height: 20px;
  padding-bottom: 7px;
`

export const PostDetailsTitle = styled(H5)`
  margin-top: 14px;
  padding-bottom: 7px;
`

export const PostSubCategory = styled(H5)`
  height: 28px;
  width: 100%;
  padding-left: 15px;
  margin-top: 15px;
`

export const PostContent = styled(p)`
  padding: 15px;
  font-family: "acumin-pro-semi-condensed",sans-serif;
`

export const PostDates = styled.div`
  flex: 1;
  margin: 7px 0 0 0;
  height: 21px;
  width: 95px;
  color: #898D91;
  font-family: "Acumin Pro SemiCondensed", sans-serif;
  font-size: 14px;
  line-height: 21px;
`

export const PostMarkup = ({ post }) => (
  <FlexContainer style={{ flexDirection: 'column', marginTop: 162 }}>
    <HeaderImage className="post-header-image" src={post.titleImg} />
    <PostContainer style={{ width: '85%' }}>
      <PostDetailsContainer className="post-details">
        {post.details.map(({ title, description }, index) => <PostDetails key={title}>
          <PostDetailsTitle>{title}</PostDetailsTitle>
          <PostDetailsDescription>{description}</PostDetailsDescription>
          { index === (post.details.length - 1) ? null : <PostDetailsLine /> }
        </PostDetails>)}
      </PostDetailsContainer>
      <FlexContainer className="post-header" style={{ justifyContent: 'flex-start', alignItems: 'flex-start', maxWidth: '70%', margin: '14px 0 0 0' }}>
        <PostTitle>{ post.title }</PostTitle><PostDates>{`${post.dates[0]}-${post.dates[1]}`}</PostDates>
      </FlexContainer>
      { post.subcategory !== 'None' ? <PostSubCategory>{ post.subcategory }</PostSubCategory> : null }
      { post.page ? null : <time style={{ fontWeight: 'bold', marginTop: 15 }} dateTime={moment(post.timestamp).format('YYYY-MM-DD')}>{ moment(post.timestamp).format('MMMM Do, YYYY') }</time>}
      <PostContent className='post-content'>
        {post.layout.map((section, index) => {
          return (section.type === 'markdown')
            ? <section className="post-paragraph" key={index} style={{ margin: '14px 0' }} dangerouslySetInnerHTML={{ __html: markdownToHtml(section.src) }} />
            : <ImageSection className="post-images" key={index} >{section.src.map((file) => {
              let mimeType = mime.lookup(file)
              if (/image/.test(mimeType)) return <div style={{ display: 'flex', flex: 1, alignItems: 'center', maxWidth: `${(100 / section.src.length) - 2}%`, minHeight: '50vh' }} key={file} src={file}><img src={file} style={{ flex: 1 }} /></div>
              else if (/video/.test(mimeType)) {
                return (<video autoplay='autoplay' loop src={file} style={{ flex: 1, maxWidth: `${(100 / section.src.length) - 2}%` }}>
                  Your browser does not support the video tag.
                </video>)
              }
            })}</ImageSection>
        })}
      </PostContent>
    </PostContainer>
  </FlexContainer>
)
