import { Component } from 'react'

class Router extends Component {
  constructor (props) {
    super(props)
    this.state = {
      regex: new RegExp(props.regex),
      route: props.path
    }
  }
  render () {
    if (this.state && this.state.regex.test(window.location.pathname)) {
      if (this.props.path === '/:id') {
        if (!window.location.pathname.match(/^\/(login|editor|content|about|dashboard|travel|error|case-studies$)/)) return this.props.children
        else return null
      }
      return this.props.children
    } else return null
  }
}

export default Router
