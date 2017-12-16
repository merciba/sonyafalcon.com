import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { parseString } from 'xml2js'

class MediaLibraryModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      media: [],
      modalClass: props.modalClass,
      chosenMedia: ''
    }
    this.images = {}
  }
  componentDidMount () {
    this.getMedia()
  }
  getMedia () {
    axios({ method: 'get', url: `${window.config.post}/media`, headers: { 'Authorization': window.localStorage.getItem('id_token') } })
      .then((res) => {
        return axios({ method: 'get', url: res.data.body })
      })
      .then((res) => {
        parseString(res.data, (err, result) => {
          if (err) throw new Error(err)
          else {
            let { Contents } = result.ListBucketResult
            this.setState({ media: Contents })
          }
        })
      })
  }
  selectMedia (image) {
    this.state.media.map((item) => {
      this.setState({ [item.Key[0]]: { maxHeight: 120, width: 'auto', margin: 5, border: 'none' }, chosenMedia: '' })
    })
    this.setState({ [image.Key[0]]: { maxHeight: 120, width: 'auto', margin: 5, border: '5px dashed #aaeeaa' }, chosenMedia: `${window.cdn}/${image.Key[0]}` })
  }
  renderMedia () {
    return this.state.media.map((item) => {
      return <a className='image' key={item.Key[0]} onClick={() => this.selectMedia(item)}>
        <img style={this.state[item.Key[0]] || { maxHeight: 120, width: 'auto', margin: 5, border: 'none' }}src={`${window.cdn}/${item.Key[0]}`} />
      </a>
    })
  }
  render () {
    return <div className={this.props.modalClass}>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Choose Media</p>
          <button className='delete' aria-label='close' onClick={() => this.props.closeModal(this.state.chosenMedia)} />
        </header>
        <section className='modal-card-body' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {this.renderMedia()}
        </section>
        <footer className='modal-card-foot'>
          <button className='button is-success' onClick={() => this.props.closeModal(this.state.chosenMedia)}>Choose</button>
          <button className='button' onClick={this.props.closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  }
}

export default MediaLibraryModal
