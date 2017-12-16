import { Component } from 'react'
import axios from 'axios'
import { user } from '../api'

class Router extends Component {
  constructor (props) {
    super(props)
    this.state = {
      regex: new RegExp(props.regex),
      route: null
    }
  }
  render () {
    if (this.state && this.state.regex.test(window.location.pathname)) {
      if (this.props.path === '/:id') {
        if (!window.location.pathname.match(/^\/(login|editor|dashboard|travel|error)/)) return this.props.children
        else return null
      }
      return this.props.children
    } else return null
  }
}

export default Router
