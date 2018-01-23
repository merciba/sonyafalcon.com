import React, { Component } from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import $ from 'jquery'
import mime from 'mime-types'
import { markdownToHtml } from '../../util'
import { AddMediaButton } from './index'
import MediaLibraryModal from '../MediaLibraryModal'

export const Input = styled.input`
  display: block;
  border-radius: 2;
  width: 95%;
  margin: 7px;
  padding: 7px;
  background-color: #eeeeee;
`

export const Textarea = styled.textarea`
  border: none;
  border-radius: 5px;
  background: #eee;
  font-size: 18px;
  padding-left: 20px;
  line-height: 28px;
  font-family: 'acumin-pro-semi-condensed',sans-serif;
  font-weight: bold;
  width: 100%;
`

export const MarkdownContent = styled.div`
  border: 1px dashed #ccc;
  border-radius: 5px;
  background-color: white;
  font-size: 18px;
  line-height: 28px;
  padding-left: 20px;
  font-family: 'acumin-pro-semi-condensed',sans-serif;
  font-weight: normal;
  min-height: 15vh;
  width: 100%;
`

export const PostDetailsEditTitle = styled.input`
  flex: 1;
  background: #eee;
  border: none;
  border-radius: 3px;
  margin: 10px;
  height: 24px;
`

export const PostDetailsEditDescription = styled.input`
  flex: 1;
  background: #eee;
  border-radius: 3px;
  border: none;
  margin: 10px;
  height: 24px;
`

export class Scheduler extends Component {
  render () {
    return <button
      className='button is-primary'
      onClick={this.props.onClick}>
      Scheduled for: {this.props.value}
    </button>
  }
}

export class DateInput extends Component {
  render () {
    return <button
      className='button is-primary'
      onClick={this.props.onClick}>
      {this.props.value}
    </button>
  }
}

const Media = ({ src }) => {
  if (src) {
    if (typeof src === 'string') {
      let mimeType = mime.lookup(src)
      if (/image/.test(mimeType)) return <img key={src} style={{ flex: 1, maxWidth: `100%`, maxHeight: '50vh', width: 'auto', height: 'auto', borderRadius: 3, margin: 7 }} src={src} />
      else if (/video/.test(mimeType)) {
        return (<video autoPlay src={src} style={{ flex: 1, maxWidth: `100%`, maxHeight: '50vh', width: 'auto', height: 'auto', borderRadius: 3, margin: 7 }}>
          Your browser does not support the video tag.
        </video>)
      }
    } else {
      return src.map((img) => {
        let mimeType = mime.lookup(img)
        if (/image/.test(mimeType)) return (<img key={img} style={{ flex: 1, maxWidth: `${100 / src.length}%`, maxHeight: '50vh', width: 'auto', height: 'auto', borderRadius: 3, margin: 7 }} src={img} />)
        else if (/video/.test(mimeType)) {
          return (<video autoPlay src={img} style={{ flex: 1, maxWidth: `${100 / src.length}%`, maxHeight: '50vh', width: 'auto', height: 'auto', borderRadius: 3, margin: 7 }}>
            Your browser does not support the video tag.
          </video>)
        }
      })
    }
  } else return null
}

export const ImagePlaceholder = ({ openMediaModal }) => (<div style={{ height: '100%', width: '100%' }}>
  <AddMediaButton style={{ height: 'auto', width: '100%' }} />
  <em style={{ width: '100%', idsplay: 'inline-block', fontSize: 10 }}>Drag and Drop to upload media</em>
</div>)

export const ImagePreview = ({ src }) => (<div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
  <Media src={src} />
</div>)

export const Dropdown = ({ style, value, onChange, content }) => (
  <div className='field' style={{ flex: 1 }}>
    <div className='control'>
      <div className='select'>
        <select defaultValue={value} onChange={onChange} style={style}>
          {content.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </div>
    </div>
  </div>
)

export class MediaInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.default,
      dragOverCursor: 'none',
      cursor: 'grab',
      contents: <ImagePlaceholder openMediaModal={this.openMediaModal.bind(this)} />,
      background: 'white',
      files: [],
      isModalOpen: 'modal'
    }
  }

  componentDidMount () {
    this.setState({ dragOverCursor: 'none', files: this.props.default, contents: <ImagePreview src={this.state.value} /> })
  }

  componentWillUnmount () {
    if (this.state.files && this.state.files.forEach) this.state.files.forEach((file) => window.URL.revokeObjectURL(file.preview))
  }

  onDrop (files) {
    if (files.length) {
      this.setState({ background: 'white', dragOverCursor: 'none' })
      let fileUrls = files.map((file) => `${window.cdn}/${moment().utc().format('YYYY/MM/DD')}/${file.name}`)
      files.forEach((file) => {
        let filename = `${moment().utc().format('YYYY/MM/DD')}/${file.name}`
        axios({ method: 'get', url: `${window.config.post}/getUploadCredentials?filename=${filename}&type=${file.type}`, headers: { 'Authorization': window.localStorage.getItem('id_token') } })
          .then((res) => {
            return axios({ method: 'put', url: res.data.body, headers: { 'Content-Type': file.type }, data: file })
          })
          .then(() => {
            let uploadedFileUrl = `${window.cdn}/${filename}`
            this.props.notify(`File uploaded. Access it at ${uploadedFileUrl}`, 'success')
            let value = this.props.default.concat(fileUrls)
            this.setState({ value, contents: <ImagePreview src={value} /> })
            if (this.props.onUpload) this.props.onUpload(fileUrls)
          })
          .catch((err) => {
            console.log(err)
            this.props.notify('Internal Server Error', 'error')
          })
      })
    }
  }

  onDragOver () {
    this.setState({ background: 'rgba(0, 0, 0, 0.5)', dragOverCursor: 'block' })
  }

  onDragLeave () {
    this.setState({ background: 'white', dragOverCursor: 'none' })
  }

  openMediaModal () {
    this.setState({ isModalOpen: 'modal is-active' })
  }

  closeMediaModal (fileUrls) {
    console.log(fileUrls)
    if (fileUrls) {
      if (this.props.onUpload) this.props.onUpload(fileUrls)
      this.setState({ value: fileUrls, contents: <ImagePreview src={fileUrls} /> })
    } else this.setState({ contents: <ImagePlaceholder openMediaModal={this.openMediaModal.bind(this)} /> })
    this.setState({ isModalOpen: 'modal' })
  }

  render () {
    return this.state ? (
      <div
        id={this.props.id}
        draggable='true'
        onDrop={(e) => {
          this.setState({ dragOverCursor: 'none' })
          this.props.onDrop(e)
        }}
        onDragEnter={({ target }) => {
          this.setState({ dragOverCursor: 'block', cursor: 'pointer' })
          this.props.onDragEnter({ target })
        }}
        onDragLeave={({ target }) => {
          this.setState({ dragOverCursor: 'none' })
          this.props.onDragLeave({ target })
        }}
        onDragStart={({ target }) => {
          this.setState({ cursor: 'grabbing' })
          this.props.dragStart({ target })
        }}
        onDragEnd={({ target }) => {
          this.setState({ cursor: 'grab' })
          this.props.dragEnd({ target })
        }}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
        style={{
          flex: 1,
          display: 'inline-block',
          position: 'relative',
          minWidth: this.props.first ? '70%' : '100%',
          borderRadius: 5,
          border: 1,
          borderStyle: 'dashed',
          borderColor: '#ccc',
          padding: 7,
          margin: '14px 0',
          cursor: this.state.cursor,
          backgroundColor: this.state.background }}>
        <div style={{ position: 'absolute', width: '100%', display: this.state.dragOverCursor, background: '#00d1b2', top: -21, height: 14, borderRadius: 5 }} />
        <Dropzone style={{ flex: 1, width: '100%' }} onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
          { this.props.disableRemove ? null : <p style={{ color: 'red' }} onClick={this.props.onClickRemove}>x</p>}
          {this.state.contents}
        </Dropzone>
        <p>or choose from the </p><a style={{ display: 'inline' }} onClick={this.openMediaModal.bind(this)}>Media Library</a>
        <MediaLibraryModal modalClass={this.state.isModalOpen} closeModal={this.closeMediaModal.bind(this)} />
      </div>
    ) : null
  }
}

export class MarkdownInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.default,
      editorValue: props.default,
      dragOverCursor: 'none',
      cursor: 'grab',
      contents: <MarkdownContent ref={(ref) => { this._preview = ref }} />
    }
  }

  componentDidMount () {
    this.onBlur()
    this.setState({ dragOverCursor: 'none' })
    if (this._textarea) this.resize({ target: this._textarea })
  }

  onChange (e) {
    console.log(e.target.value)
    this.setState({ value: e.target.value })
    if (this.props.onChange) this.props.onChange(e.target.value)
  }

  resize ({ target }) {
    target.style.height = 'auto'
    target.style.height = (25 + target.scrollHeight) + 'px'
  }

  onMouseUp ({ target }) {
    if (this.state.contents && this.state.contents.type.target === 'div') {
      this.setState({
        cursor: 'text',
        contents: <Textarea
          innerRef={(ref) => {
            this._textarea = ref
          }}
          autoFocus
          onClick={this.resize.bind(this)}
          onKeyUp={this.resize.bind(this)}
          style={{ minWidth: '70%' }}
          defaultValue={this.state.value}
          onChange={this.onChange.bind(this)}
        />
      }, () => this.resize({ target: this._textarea }))
    }
  }

  onBlur () {
    let html = markdownToHtml(this.state.value)
    this.setState({
      cursor: 'grab',
      contents: <MarkdownContent dangerouslySetInnerHTML={{ __html: html }} />
    })
  }

  render () {
    return this.state
      ? (<div
        id={this.props.id}
        draggable='true'
        onDrop={(e) => {
          this.setState({ dragOverCursor: 'none' })
          this.props.onDrop(e)
        }}
        onDragEnter={({ target }) => {
          this.setState({ dragOverCursor: 'block' })
          this.props.onDragEnter({ target })
        }}
        onDragLeave={({ target }) => {
          this.setState({ dragOverCursor: 'none' })
          this.props.onDragLeave({ target })
        }}
        onDragStart={({ target }) => {
          this.setState({ cursor: 'grabbing' })
          this.props.dragStart({ target })
        }}
        onDragEnd={({ target }) => {
          this.setState({ cursor: 'grab' })
          this.props.dragEnd({ target })
        }}
        onMouseUp={this.onMouseUp.bind(this)}
        style={{ flex: 1, maxWidth: this.props.first ? '70%' : '100%', borderRadius: 5, position: 'relative', margin: '14px 0', cursor: this.state.cursor }}
        onBlur={this.onBlur.bind(this)} >
        <div style={{ position: 'absolute', width: '100%', display: this.state.dragOverCursor, background: '#00d1b2', top: -21, height: 14, borderRadius: 5 }} />
        <p style={{ position: 'absolute', top: 7, left: 7, color: 'red', cursor: 'pointer' }} onClick={this.props.onClickRemove}>x</p>
        {this.state.contents}
      </div>) : null
  }
}
