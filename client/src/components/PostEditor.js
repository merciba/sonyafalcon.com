import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import axios from 'axios'
import _ from 'lodash'
import { markdownToHtml } from '../util'
import moment from 'moment'
import Dropzone from 'react-dropzone'
import TagsInput from 'react-tagsinput'
import SwitchButton from 'lyef-switch-button'
import Loader from './Loader'
import ShareButtons from './ShareButtons'
import MediaLibraryModal from './MediaLibraryModal'
import DatePicker from 'react-datepicker'
import Notifications, { notify } from 'react-notify-toast'
import slug from 'slugg'
import { EDITOR, MENU } from '../content.json'
const set = (n, ins, arr) => [...arr.slice(0, n), ins, ...arr.slice(n)]

import {
  TitleInput,
  Scheduler,
  TitleImage,
  TitlePreview,
  PreviewContainer,
  EditorContainer,
  Notification,
  PublishButton,
  Dropdown,
  SmallText,
  FlexContainer,
  PostMarkup,
  PostDetails,
  PostDetailsContainer,
  PostDetailsTitle,
  PostDetailsDescription,
  PostDetailsLine,
  PostDetailsEdit,
  PostDetailsEditTitle,
  PostDetailsEditDescription,
  PostDetailsEditSubmit,
  MediaInput,
  MarkdownInput,
  AddContent,
  HeaderImage,
  PostContainer,
  PostTitle,
  PostSubCategory,
  PostContent,
  ImageSection,
  InteriorMenu,
  PrivateSubMenu,
  DateInput
} from './partials'

class PostEditor extends Component {
  constructor (props) {
    super(props)
    let user = JSON.parse(window.localStorage.getItem('user'))
    this.state = {
      loading: true,
      addNewContent: <AddContent onTextClick={() => this.selectNewContent('markdown')} onImageClick={() => this.selectNewContent('image')} />,
      id: '',
      title: '',
      layout: [],
      titleImg: '',
      page: false,
      author: user.email,
      category: 'Category',
      subcategory: 'Sub-Category',
      details: [],
      detailsEditTitle: '',
      detailsEditDescription: '',
      timestamp: moment(),
      dates: ['2018', '2018'],
      tags: [],
      posts: [],
      published: false,
      scheduled: moment(),
      toDate: parseInt(moment().format('YYYY')),
      fromDate: parseInt(moment().format('YYYY')),
      html: '',
      dragging: false,
      mousePostiion: { x: 0, y: 0 }
    }
    this._sections = []
    this.notify = this.notify.bind(this)
    this.startDrag = this.startDrag.bind(this)
    this.endDrag = this.endDrag.bind(this)
    this.changeDate = this.changeDate.bind(this)
  }
  componentDidMount () {
    this.props.authenticate()
      .then(this.getPosts)
      .then((res) => {
        this.setState({ posts: res.data.body })
      })
      .then(() => {
        if (/editor\/\S+/.test(window.location.pathname)) {
          window.localStorage.setItem('currentDraft', null)
          let id = window.location.pathname.replace('/editor/', '')
          return this.getPost(id)
            .then((res) => this.init(res.data.body[0]))
        } else {
          window.localStorage.setItem('currentDraft', null)
          return this.init()
        }
      })
      .catch((err) => {
        console.log(err)
        // window.location.replace('/login')
      })
  }

  init (post) {
    if (post) {
      window.localStorage.setItem('currentDraft', JSON.stringify(post))
      post.scheduled = moment(post.scheduled).local()
      post.timestamp = moment(post.timestamp)
      post.fromDate = post.dates[0]
      post.toDate = post.dates[1]
      delete post.dates
      this.setState(post, () => this.setState({ loading: false }))
      this._title.value = this.state.title
    } else this.setState({ loading: false })
  }
  getPost (id) {
    return axios({ method: 'get', url: `${window.config.post}/${id}` })
  }
  getPosts () {
    return axios({ method: 'get', url: `${window.config.post}` })
  }
  onUploadTtileImage (imageUrls) {
    console.log('onUploadTitleImage', imageUrls)
    this.setState({ titleImg: imageUrls[0] })
    this.updateHtml()
  }
  onUploadImage ({ index, src }) {
    let layout = [...this.state.layout]
    if (layout[index] && layout[index].src.length) layout[index] = { type: 'image', src: layout[index].src.concat(src) }
    else layout[index] = { type: 'image', src }
    this.setState({ layout })
    this.updateHtml()
  }
  changeTitle (e) {
    this.setState({ title: e.target.value, id: slug(e.target.value) })
    this._title.value = e.target.value
    this.updateHtml()
  }
  onTextChange ({ index, src }) {
    let layout = [...this.state.layout]
    layout[index] = { type: 'markdown', src }
    this.setState({ layout })
    this.updateHtml()
  }
  selectNewContent (type) {
    let layout = [...this.state.layout]
    let src
    if (type === 'image') src = []
    else if (type === 'markdown') src = ''
    layout.push({ type, src })
    this.setState({ layout, addNewContent: <AddContent onTextClick={() => this.selectNewContent('markdown')} onImageClick={() => this.selectNewContent('image')} /> })
    this.updateHtml()
  }
  removeSection (index) {
    let layout = Object.assign([], this.state.layout)
    _.remove(layout, (section, i) => index === i)
    this.setState({ layout })
    this.updateHtml()
  }
  startDrag (index) {
    this.setState({ dragging: this.state.layout[index] })
  }
  onSpaceDrop (index) {
    let layout = [...this.state.layout]
    let draggingIndex = _.indexOf(layout, this.state.dragging)
    console.log(draggingIndex, index)
    if (index !== draggingIndex) {
      layout.splice(draggingIndex, 1)
      if (index > draggingIndex) index -= 1
      layout.splice(index, 0, this.state.dragging)
      this.setState({ layout: [] }, () => this.setState({ layout }))
    } else this.setState({ layout })
  }
  onSpaceDragEnter ({ target, index }) {
    // console.log('dragEnter', index)
  }
  onSpaceDragLeave ({ target, index }) {
    // console.log('dragLeave', index)
  }
  endDrag ({ target }) {
    this.setState({ dragging: false })
  }
  updateHtml () {
    let html = ReactDOMServer.renderToString(<PostMarkup post={this.state} />)
    this.setState({ html })
  }
  changeCategory (e) {
    this.setState({ category: e.currentTarget.value })
  }
  changeSubCategory (e) {
    this.setState({ subcategory: e.currentTarget.value })
    this.updateHtml()
  }
  changeDate (scheduled) {
    this.setState({ scheduled })
    this.updateHtml()
  }
  changeToDate ({ target }) {
    console.log(target.value)
    this.setState({ toDate: target.value })
    this.updateHtml()
  }
  changeFromDate ({ target }) {
    console.log(target.value)
    this.setState({ fromDate: target.value })
    this.updateHtml()
  }
  changeTags (tags) {
    this.setState({ tags })
  }
  addDetails () {
    let { details, detailsEditTitle, detailsEditDescription } = this.state
    details.push({ title: detailsEditTitle, description: detailsEditDescription })
    this.setState({ details, detailsEditTitle: '', detailsEditDescription: '' })
  }
  removeDetails (key) {
    let details = [...this.state.details]
    _.remove(details, ({ title }) => (title === key))
    this.setState({ details })
  }
  notify (msg, type) {
    notify.show(msg, type)
  }
  save () {
    let { id, title, tags, timestamp, scheduled, fromDate, toDate, category, subcategory, details, titleImg, layout, html, page, published } = this.state
    if (id.length && title.length && html.length && category.length) {
      let post = {
        id,
        title,
        titleImg,
        tags,
        layout,
        html,
        page,
        category,
        subcategory,
        details,
        scheduled: scheduled.isBefore('second') ? null : scheduled.utc().format(),
        dates: [fromDate, toDate],
        published,
        timestamp: timestamp.utc().format()
      }
      console.log(post)
      return axios({ method: /editor\/\S+/.test(window.location.pathname) ? 'put' : 'post', url: window.config.post, headers: { 'Authorization': window.localStorage.getItem('id_token'), 'Content-Type': 'application/json' }, data: post })
        .then(() => notify.show('Draft saved.', 'success'))
        .catch((err) => {
          console.error(err)
          notify.show('Internal Server Error', 'error')
        })
    }
  }
  publish () {
    let { id, timestamp } = this.state
    return axios({ method: 'post', url: `${window.config.post}/publish`, headers: { 'Authorization': window.localStorage.getItem('id_token'), 'Content-Type': 'application/json' }, data: { id, timestamp: timestamp.utc().format() } })
      .then((res) => {
        this.setState({ published: true })
        notify.show('Post published.', 'success')
      })
      .catch((err) => {
        console.error(err)
        notify.show('Internal Server Error', 'error')
      })
  }
  saveAndPublish () {
    this.save()
      .then(this.publish.bind(this))
      .then((res) => notify.show('Post published.', 'success'))
      .catch((err) => {
        console.error(err)
        notify.show('Internal Server Error', 'error')
      })
  }
  render () {
    return this.state && this.state.loading ? <Loader /> : (<section className='section' style={{ height: window.innerHeight, width: '100%' }}>
      <InteriorMenu content={MENU} ref='menu' />
      <PrivateSubMenu posts={this.state.posts} />
      <Notifications />
      <div style={{ marginTop: 87 + 75 }}>
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <MediaInput disableRemove onUpload={this.onUploadTtileImage.bind(this)} default={this.state.titleImg} />
          <FlexContainer style={{ background: '#eee', borderRadius: 5, padding: 14, margin: '7px 0', justifyContent: 'space-around' }}>
            <SmallText style={{ flex: 0.5 }}>Slug: /{this.state.id}</SmallText>
            { this.state.published ? null : <div style={{ flex: 1.5 }}>
              <DatePicker
                customInput={<Scheduler />}
                selected={this.state.scheduled}
                onChange={this.changeDate}
                showTimeSelect
                dateFormat='LLL'
              />
            </div> }
            <Dropdown content={EDITOR.CATEGORIES} value={this.state.category} onChange={this.changeCategory.bind(this)} />
            <SwitchButton
              style={{ flex: 0.5 }}
              id='page'
              labelLeft='Post'
              labelRight='Page'
              isChecked={this.state.page}
              action={() => this.setState({ page: !this.state.page })}
              />
          </FlexContainer>
          <FlexContainer style={{ background: 'white', borderRadius: 5, padding: 14, margin: '7px 0', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className='control' style={{ margin: '0 0 14px 0', width: '25%' }}>
              <input style={{ color: 'black', fontFamily: '"acumin-pro-semi-condensed",sans-serif', fontSize: 25, fontWeight: 500, lineHeight: 28, borderRadius: 3, backgroundColor: '#eeeeee', height: 40, width: '100%', border: 'none' }} type='text' defaultValue={this.state.title} ref={(ref) => { this._title = ref }} onChange={this.changeTitle.bind(this)} placeholder='New Post' />
            </div>
            <Dropdown style={{ fontFamily: 'Ubuntu Mono', textTransform: 'uppercase', fontSize: 14, fontWeight: 'bold' }} content={EDITOR.SUBCATEGORIES} value={this.state.subcategory} onChange={this.changeSubCategory.bind(this)} />
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
              <div style={{ margin: '10px 5px 0 0', flex: 1, width: '20%' }}>
                From: <Dropdown content={[...Array(50).keys()].map((n) => n + 2000)} value={this.state.fromDate} onChange={this.changeFromDate.bind(this)} />
              </div>
              <div style={{ margin: '10px 0 0 5px', flex: 1, width: '20%' }}>
                To: <Dropdown content={[...Array(50).keys()].map((n) => n + 2000)} value={this.state.toDate} onChange={this.changeToDate.bind(this)} />
              </div>
            </div>
          </FlexContainer>
          <FlexContainer style={{ flexDirection: 'column' }}>
            <PostContainer style={{ width: '100%' }}>
              <PostDetailsContainer>
                {this.state.details.map(({ title, description }, index) => <PostDetailsEdit key={title}>
                  <p style={{ color: 'red', position: 'absolute', top: -7, left: -5 }} onClick={() => this.removeDetails(title)}>x</p>
                  <PostDetailsTitle>{title}</PostDetailsTitle>
                  <PostDetailsDescription>{description}</PostDetailsDescription>
                  { index === (this.state.details.length - 1) ? null : <PostDetailsLine /> }
                </PostDetailsEdit>)}
                { this.state.details.length < 3 ? <PostDetailsEdit>
                  <PostDetailsEditTitle placeholder='Title' value={this.state.detailsEditTitle} onChange={({ currentTarget }) => this.setState({ detailsEditTitle: currentTarget.value })} />
                  <PostDetailsEditDescription placeholder='Description' value={this.state.detailsEditDescription} onChange={({ currentTarget }) => this.setState({ detailsEditDescription: currentTarget.value })} />
                  <PostDetailsEditSubmit className='button is-primary' onClick={this.addDetails.bind(this)} >Add</PostDetailsEditSubmit>
                </PostDetailsEdit> : null }
              </PostDetailsContainer>
              { this.state.layout.map((section, index) => {
                if (section.type === 'image') {
                  return <MediaInput
                    key={index}
                    id={`section-${index}`}
                    onDrop={({ target }) => {
                      this.onSpaceDrop(index)
                    }}
                    onDragEnter={({ target }) => this.onSpaceDragEnter({ target, index })}
                    onDragLeave={({ target }) => this.onSpaceDragLeave({ target, index })}
                    dragStart={() => this.startDrag(index)}
                    dragEnd={this.endDrag}
                    notify={this.notify}
                    first={index === 0}
                    onClickRemove={() => this.removeSection(index)}
                    onUpload={(files) => this.onUploadImage({ index, src: files })}
                    default={section.src} />
                } else if (section.type === 'markdown') return <MarkdownInput key={index} id={`section-${index}`} onDrop={({ target }) => this.onSpaceDrop(index)} onDragEnter={({ target }) => this.onSpaceDragEnter({ target, index })} onDragLeave={({ target }) => this.onSpaceDragLeave({ target, index })}dragStart={() => this.startDrag(index)} dragEnd={this.endDrag} first={index === 0} onClickRemove={() => this.removeSection(index)} onChange={(text) => this.onTextChange({ index, src: text })} default={section.src} />
                else if (section.type === 'space') return <Dropzone style={{ flex: 1, width: '100%' }} />
              }) }
              { this.state.addNewContent }
              <TagsInput style={{ border: 'none' }} value={this.state.tags} onChange={this.changeTags.bind(this)} />
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                { this.state.published ? null : <PublishButton disabled={!(this.state.id.length && this.state.title.length && this.state.html.length)} className='button is-large is-primary' onClick={this.save.bind(this)}>Save</PublishButton> }
                { this.state.published ? <PublishButton className='button is-large is-primary' onClick={this.save.bind(this)}>Update</PublishButton> : <PublishButton disabled={!(this.state.id.length && this.state.title.length && this.state.html.length)} className='button is-large is-primary' onClick={this.saveAndPublish.bind(this)}>Save & Publish</PublishButton> }
                { (/editor\/\S+/.test(window.location.pathname)) ? <a className='button is-large is-info' style={{ margin: 10 }} href={`/${this.state.id}`}>View</a> : null}
              </div>
            </PostContainer>
          </FlexContainer>
        </div>
      </div>
    </section>)
  }
}

export default PostEditor
