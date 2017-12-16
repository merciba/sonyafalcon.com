import React, { Component } from 'react'

class Loader extends Component {
  render () {
    return (<div style={{ width: '100%', height: '100%' }}>
      <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' style={{ width: '10%', position: 'absolute', top: '40%', left: '45%' }} />
    </div>)
  }
}

export default Loader
