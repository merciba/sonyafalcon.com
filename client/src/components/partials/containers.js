import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import moment from 'moment'
import Animated from 'animated/lib/targets/react-dom'
import { Title, SubTitle, LargeText, Text, SmallText, BoldText, LogoType, Input, Tags, Tag } from './text'
import { SubmitButton, ReadMore, Explore } from './buttons'
import { BackgroundImage, FullScreenImage, HalfScreenImage } from './images'
import { Menu } from './menu'
import { MENU, FOOTER } from '../../content.json'
import Parallax from 'react-springy-parallax'
import slug from 'slugg'

export const FullScreenContainer = styled.div`
  height: ${innerHeight}px;
  width: ${innerWidth}px;
`

export const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const PostInfoContainer = styled.div`
  background: white;
  padding: 15px;
  position: absolute;
  bottom: 0;
  left: 50px;
  height: 450px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 7px 0;
`

export const Footer = () => (
  <footer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 0, background: 'white', width: '100%', height: 80 }}>
    <a href="http://merciba.com"><span style={{ fontSize: 15, color: 'black', flex: 1, marginLeft: 30 }}>{FOOTER.LEFT}</span></a>
  </footer>)

export class ScrollContainer extends Component {
  onScroll (scrolled) {
    if (this.menu) this.menu.onScroll(scrolled)
  }
  getCategoryEmoji(post) {
    switch (post.category) {
      case 'Travel':
        return '✈️'
        break
      case 'Tech':
        return '💻'
        break
      case 'Style':
        return '🕶'
        break
    }
  }
  render () {
    return (
      <FullScreenContainer onScroll={({ currentTarget }) => {
        if (this.refs.parallax && this.refs.menu) this.refs.menu.onScroll(this.refs.parallax.scrollTop)
      }}>
        <Menu content={MENU} ref='menu' />
        { this.props.posts.length ? <Parallax ref='parallax' effect={(animation, toValue) => Animated.timing(animation, { toValue, duration: 0 })} pages={3}>
          { this.props.posts[0] ? <Parallax.Layer
            offset={0}
            speed={-0.2}>
            <a href={`/${this.props.posts[0].id}`}><FullScreenImage src={this.props.posts[0].titleImg} /></a>
          </Parallax.Layer> : null }
          { this.props.posts[1] && this.props.posts[2] ? <Parallax.Layer
            offset={1}
            speed={0}>
            <FlexContainer>
              <a style={{ flex: 1, height: innerHeight, width: innerWidth }} href={`/${this.props.posts[1].id}`}>
                <HalfScreenImage src={this.props.posts[1].titleImg} />
              </a>
              <a style={{ flex: 1, height: innerHeight, width: innerWidth }} href={`/${this.props.posts[2].id}`}>
                <HalfScreenImage src={this.props.posts[2].titleImg} />
              </a>
            </FlexContainer>
          </Parallax.Layer> : null }
          { this.props.posts[3] ? <Parallax.Layer
            offset={2}
            speed={-0.2}>
            <a href={`/${this.props.posts[2].id}`}><FullScreenImage src={this.props.posts[3].titleImg} /></a>
          </Parallax.Layer> : null }
          { this.props.posts[0] ? <Parallax.Layer
            offset={0}
            speed={0.3}>
            <PostInfoContainer>
              <SmallText style={{ fontWeight: 'bold' }}>{this.props.posts[0].category}</SmallText>
              <SubTitle>{this.props.posts[0].title}</SubTitle>
              <LogoType>{moment(this.props.posts[0].timestamp).format('MMMM Do, YYYY')}</LogoType>
              <SmallText style={{ minHeight: 200 }}>{getFirstWords(this.props.posts[0].rawText, 50)}</SmallText>
              { /* <Tags>
                {this.props.posts[0].tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </Tags> */ }
              <ButtonsContainer>
                <ReadMore onClick={() => { window.location.href = `${document.URL}${this.props.posts[0].id}` }}>Read More     →</ReadMore>
                <Explore onClick={() => { window.location.href = `${document.URL}${slug(this.props.posts[0].category)}` }}>Explore {this.props.posts[0].category} {this.getCategoryEmoji(this.props.posts[0])}</Explore>
              </ButtonsContainer>
            </PostInfoContainer>
          </Parallax.Layer> : null }
          { this.props.posts[1] ? <Parallax.Layer
            offset={0.975}
            speed={0.3}>
            <PostInfoContainer>
              <SmallText style={{ fontWeight: 'bold' }}>{this.props.posts[1].category}</SmallText>
              <SubTitle>{this.props.posts[1].title}</SubTitle>
              <LogoType>{moment(this.props.posts[1].timestamp).format('MMMM Do, YYYY')}</LogoType>
              <SmallText style={{ minHeight: 200 }}>{getFirstWords(this.props.posts[1].rawText, 50)}</SmallText>
              { /* <Tags>
                {this.props.posts[1].tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </Tags> */ }
              <ButtonsContainer>
                <ReadMore onClick={() => { window.location.href = `${document.URL}${this.props.posts[1].id}` }}>Read More     →</ReadMore>
                <Explore onClick={() => { window.location.href = `${document.URL}${slug(this.props.posts[1].category)}` }}>Explore {this.props.posts[1].category} {this.getCategoryEmoji(this.props.posts[1])}</Explore>
              </ButtonsContainer>
            </PostInfoContainer>
          </Parallax.Layer> : null }
          { this.props.posts[2] ? <Parallax.Layer
            offset={0.975}
            speed={0.3}>
            <PostInfoContainer style={{ left: (innerWidth / 2) + 50 }}>
              <SmallText style={{ fontWeight: 'bold' }}>{this.props.posts[2].category}</SmallText>
              <SubTitle>{this.props.posts[2].title}</SubTitle>
              <LogoType>{moment(this.props.posts[2].timestamp).format('MMMM Do, YYYY')}</LogoType>
              <SmallText style={{ minHeight: 200 }}>{getFirstWords(this.props.posts[2].rawText, 50)}</SmallText>
              { /* <Tags>
                {this.props.posts[2].tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </Tags> */ }
              <ButtonsContainer>
                <ReadMore onClick={() => { window.location.href = `${document.URL}${this.props.posts[2].id}` }}>Read More     →</ReadMore>
                <Explore onClick={() => { window.location.href = `${document.URL}${slug(this.props.posts[2].category)}` }}>Explore {this.props.posts[2].category} {this.getCategoryEmoji(this.props.posts[2])}</Explore>
              </ButtonsContainer>
            </PostInfoContainer>
          </Parallax.Layer> : null }
          { this.props.posts[3] ? <Parallax.Layer
            offset={1.999}
            speed={0.3}>
            <PostInfoContainer>
              <SmallText style={{ fontWeight: 'bold' }}>{this.props.posts[3].category}</SmallText>
              <SubTitle>{this.props.posts[3].title}</SubTitle>
              <LogoType>{moment(this.props.posts[3].timestamp).format('MMMM Do, YYYY')}</LogoType>
              <SmallText style={{ minHeight: 200 }}>{getFirstWords(this.props.posts[3].rawText, 50)}</SmallText>
              { /* <Tags>
                {this.props.posts[3].tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </Tags> */ }
              <ButtonsContainer>
                <ReadMore onClick={() => { window.location.href = `${document.URL}${this.props.posts[3].id}` }}>Read More     →</ReadMore>
                <Explore onClick={() => { window.location.href = `${document.URL}${slug(this.props.posts[3].category)}` }}>Explore {this.props.posts[3].category} {this.getCategoryEmoji(this.props.posts[3])}</Explore>
              </ButtonsContainer>
            </PostInfoContainer>
          </Parallax.Layer> : null }
          <Footer />
        </Parallax> : null }
      </FullScreenContainer>
    )
  }
}
