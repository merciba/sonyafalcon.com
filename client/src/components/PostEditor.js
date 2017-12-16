import React, { Component } from 'react'
import axios from 'axios'
import { markdown } from 'markdown'
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
  FlexContainer
} from './partials'

class StatefulEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.default,
      editorValue: props.default
    }
  }

  componentWillUnmount () {
    this.state.files.forEach((file) => window.URL.revokeObjectURL(file.preview))
  }

  onChange (e) {
    this.setState({ value: e.target.value, editorValue: e.target.value })
    if (this.props.onChange) this.props.onChange(e.target.value)
  }

  onDrop (files) {
    files.forEach((file) => {
      let filename = `${moment().utc().format('YYYY/MM/DD')}/${file.name}`
      axios({ method: 'get', url: `${window.config.post}/getUploadCredentials?filename=${filename}&type=${file.type}`, headers: { 'Authorization': window.localStorage.getItem('id_token') } })
        .then((res) => {
          return axios({ method: 'put', url: res.data.body, headers: { 'Content-Type': file.type }, data: file })
        })
        .then(() => {
          let uploadedFileUrl = `https://cdn.sonyafalcon.com.s3.amazonaws.com/${filename}`
          let rawText = `${this.state.value} ![image alt](${uploadedFileUrl})`
          this.setState({ value: rawText, editorValue: rawText })
          this.props.onChange(rawText)
          this.props.onUploadImage(uploadedFileUrl)
          notify.show(`File uploaded. Access it at ${uploadedFileUrl}`, 'success')
        })
        .catch((err) => {
          console.log(err)
          notify.show('Internal Server Error', 'error')
        })
    })
  }

  render () {
    return (
      <div className='container' style={{ ...this.props.style, marginTop: 10, marginBottom: 10 }}>
        <Dropzone disableClick style={this.props.style} onDrop={this.onDrop.bind(this)}>
          <textarea
            style={this.props.style}
            value={this.state.editorValue}
            onChange={this.onChange.bind(this)}
          />
        </Dropzone>
      </div>
    )
  }
}

class PostEditor extends Component {
  constructor (props) {
    super(props)
    let user = JSON.parse(window.localStorage.getItem('user'))
    this.state = {
      content: <Loader />,
      id: '',
      title: '',
      rawText: '',
      titleImg: '',
      page: false,
      author: user.email,
      category: 'Travel',
      timestamp: moment(),
      tags: [],
      published: false,
      scheduled: moment(),
      html: '',
      files: [],
      textAreaHeight: 500,
      editor: null,
      isModalOpen: 'modal'
    }
    this.changeDate = this.changeDate.bind(this)
  }
  componentDidMount () {
    this.props.authenticate()
      .then(() => {
        /* Do nothing */
        let previewHeight = this._preview.clientHeight
        this.setState({ textAreaHeight: previewHeight > 500 ? previewHeight : 500, author: (window.localStorage.getItem('user')).email })
        if (/editor\/\S+/.test(window.location.pathname)) {
          window.localStorage.setItem('currentDraft', null)
          let id = window.location.pathname.replace('/editor/', '')
          this.getPost(id)
            .then((res) => {
              let currentDraft = res.data.body[0]
              window.localStorage.setItem('currentDraft', JSON.stringify(currentDraft))
              currentDraft.scheduled = moment(currentDraft.scheduled).local()
              currentDraft.timestamp = moment(currentDraft.timestamp)
              this.setState(currentDraft)
              this.initEditor()
              this._title.value = this.state.title
              this.changeBody(this.state.rawText)
            })
        } else {
          window.localStorage.setItem('currentDraft', null)
          this.initEditor()
        }
      })
      .catch((err) => {
        window.location.replace('/login')
      })
    setInterval(this.saveDraft.bind(this), 15000)

    if (this._preview) this._preview.innerHTML = markdown.toHTML(this.state.rawText)
  }
  initEditor () {
    this.setState({ editor: <StatefulEditor style={{ borderWidth: 0, fontSize: 16, borderRadius: 2, backgroundColor: '#eeeeee', fontFamily: 'Courier New', fontWeight: 'bold', width: '100%', height: this.state.textAreaHeight }} onUploadImage={this.onUploadImage.bind(this)} default={this.state.rawText} notify={notify.show} onChange={this.changeBody.bind(this)} /> })
  }
  getPost (id) {
    return axios({ method: 'get', url: `${window.config.post}/${id}` })
  }
  onDrop (files) {
    files.forEach((file) => {
      let filename = `${moment().utc().format('YYYY/MM/DD')}/${file.name}`
      axios({ method: 'get', url: `${window.config.post}/getUploadCredentials?filename=${filename}&type=${file.type}`, headers: { 'Authorization': window.localStorage.getItem('id_token') } })
        .then((res) => {
          return axios({ method: 'put', url: res.data.body, headers: { 'Content-Type': file.type }, data: file })
        })
        .then(() => {
          let uploadedFileUrl = `${window.cdn}/${filename}`
          let rawText = `${this.state.value} ![image alt](${uploadedFileUrl})`
          this.setState({ rawText })
          this.onUploadImage(uploadedFileUrl)
          notify.show(`File uploaded. Access it at ${uploadedFileUrl}`, 'success')
        })
        .catch(console.log)
    })
  }
  onUploadImage (imageUrl) {
    if (!this.state.titleImg.length) this.setState({ titleImg: imageUrl })
  }
  saveDraft () {
    let { id, title, author, tags, rawText, titleImg, category, timestamp } = this.state
    window.localStorage.setItem('currentDraft', JSON.stringify({ id, title, author, tags, rawText, titleImg, category, timestamp: timestamp.utc().format() }))
    notify.show('Draft autosaved.', 'success')
  }
  changeTitle (e) {
    this.setState({ title: e.target.value, id: slug(e.target.value) })
    this._title.value = e.target.value
    if (this._titlePreview) this._titlePreview.innerHTML = e.target.value
  }
  changeBody (rawText) {
    let html = markdown.toHTML(rawText)
    this.setState({ rawText, html })
    let previewHeight = this._preview.clientHeight
    this.setState({ textAreaHeight: previewHeight > 500 ? previewHeight : 500 })
    if (this._preview) this._preview.innerHTML = html
  }
  changeCategory (e) {
    this.setState({ category: e.currentTarget.value })
  }
  changeDate (scheduled) {
    this.setState({ scheduled })
  }
  changeTags (tags) {
    this.setState({ tags })
  }
  openMediaModal () {
    this.setState({ isModalOpen: 'modal is-active' })
  }
  closeMediaModal (imgUrl) {
    this.setState({ isModalOpen: 'modal' })
    if (imgUrl) this.setState({ titleImg: imgUrl })
  }
  save () {
    let { id, title, tags, timestamp, scheduled, category, titleImg, rawText, page, published } = this.state
    if (id && title && rawText && category) {
      let post = {
        id,
        title,
        titleImg,
        tags,
        rawText,
        page,
        category,
        scheduled: scheduled.isBefore('second') ? null : scheduled.utc().format(),
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
    return (<section className='section' style={{ height: window.innerHeight }}>
      <Notifications />
      <div className='container'>
        <h1 className='title'>Sonya Falcon</h1>
        <h2 className='subtitle'>Editor</h2>
        <a href='/dashboard'>&lt; Back to Dashboard</a>
        <div className='container level' style={{ height: '100%' }}>
          <EditorContainer className='level-left level-item'>
            <div className='control' style={{ marginBottom: 5, marginTop: 15 }}>
              <input style={{ borderRadius: 2, backgroundColor: '#eeeeee', height: 40, width: '100%', fontSize: 20 }} type='text' defaultValue={this.state.title} ref={(ref) => { this._title = ref }} onChange={this.changeTitle.bind(this)} placeholder='New Post' />
            </div>
            <Dropzone style={{ border: 1, borderStyle: 'dashed', borderColor: 'black', width: '100%', borderRadius: 5 }} onDrop={this.onDrop.bind(this)}>
              { this.state.titleImg
                ? (<div style={{ padding: 10 }}>
                  <img style={{ height: 50, borderRadius: 3, margin: 5, display: 'inline-block' }} src={this.state.titleImg} />
                  <em style={{ display: 'inline-block', fontSize: 10 }}>{this.state.titleImg}</em>
                </div>)
                : (<div style={{ padding: 10 }}>
                  <h2 style={{ height: 50, borderRadius: 3, margin: 5, textAlign: 'center', display: 'inline-block' }} className='title'>+</h2>
                  <em style={{ textAlign: 'center', display: 'inline-block' }}>Add Title Image</em>
                </div>) }
            </Dropzone>
            <p style={{ display: 'inline' }}>or choose from the </p><a style={{ display: 'inline' }} onClick={this.openMediaModal.bind(this)}>Media Library</a>
            { this.state.published ? null : <div style={{ marginBottom: 10 }}>
              <DatePicker
                customInput={this.state.scheduled.isBefore('hour') ? <button className='button is-info'>Schedule</button> : <Scheduler />}
                selected={this.state.scheduled}
                onChange={this.changeDate}
                showTimeSelect
                dateFormat='LLL'
              />
            </div> }
            <SmallText>Slug: /{this.state.id}</SmallText>
            <FlexContainer>
              <label className="label" style={{ flex: 0.3 }}>Category</label>
              <Dropdown value={this.state.category} onChange={this.changeCategory.bind(this)} />
              <SwitchButton
                style={{ flex: 1 }}
                id='page'
                labelLeft='Post'
                labelRight='Page'
                isChecked={this.state.page}
                action={() => this.setState({ page: !this.state.page })}
                />
            </FlexContainer>
            { this.state.editor }
            <TagsInput value={this.state.tags} onChange={this.changeTags.bind(this)} />
            { this.state.published ? null : <PublishButton className='button is-large is-primary' onClick={this.save.bind(this)}>Save</PublishButton> }
            { this.state.published ? <PublishButton className='button is-large is-primary' onClick={this.save.bind(this)}>Update</PublishButton> : <PublishButton className='button is-large is-primary' onClick={this.saveAndPublish.bind(this)}>Save & Publish</PublishButton> }
            { (/editor\/\S+/.test(window.location.pathname)) ? <a className='button is-large is-info' style={{ margin: 10 }} href={`/${this.state.id}`}>View</a> : null}
          </EditorContainer>
          <PreviewContainer className='level-right level-item' >
            { this.state.titleImg ? <TitleImage><img src={this.state.titleImg} /></TitleImage> : null }
            <TitlePreview className='content' ref={(ref) => { this._titlePreview = ref }}>{ this.state.title }</TitlePreview>
            { this.state.page ? null : <time dateTime={this.state.timestamp.format('YYYY-MM-DD')}>{ this.state.timestamp.format('MMMM Do, YYYY') }</time>}
            <hr />
          <div className='content' style={{ fontSize: 15 }} ref={(ref) => { this._preview = ref }} />
            <ShareButtons />
          </PreviewContainer>
        </div>
      </div>
      <MediaLibraryModal modalClass={this.state.isModalOpen} closeModal={this.closeMediaModal.bind(this)} />
    </section>)
  }
}

export default PostEditor
