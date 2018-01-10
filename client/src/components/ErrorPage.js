import React, { Component } from 'react'
import { Menu } from './partials'
import { MENU } from '../content.json'

class ErrorPage extends Component {
  render () {
    return (<section className='section'>
      <div className='hero'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>Error</h1>
            <p>404 Not Found</p>
          </div>
        </div>
      </div>
    </section>)
  }
}

export default ErrorPage
