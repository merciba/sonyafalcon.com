import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import axios from 'axios'
import _ from 'lodash'
import { markdownToHtml } from '../util'
import moment from 'moment'
import Dropzone from 'react-dropzone'

class ContentEditor extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <h1>ContentEditor</h1>
  }
}

export default ContentEditor