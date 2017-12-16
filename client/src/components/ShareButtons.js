import React, { Component } from 'react'

class ShareButtons extends Component {
  shareToFacebook () {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(document.URL))
    return false
  }
  shareToTwitter () {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '%3A%20' + encodeURIComponent(document.URL))
    return false
  }
  shareToGoogle () {
    window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL))
    return false
  }
  shareToPinterest () {
    window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(document.URL) + '&media=' + encodeURIComponent(this.props.titleImg) + '&description=' + encodeURIComponent(document.title))
    return false
  }
  render () {
    return (<ul style={{ listStyle: 'none', padding: 0, height: 100 }}>
      <li style={{ display: 'inline' }}><a className='button btn-facebook' style={{ color: 'white', marginRight: 15 }} target="_blank" title="Tweet" onClick={this.shareToFacebook.bind(this)}>Share&nbsp;&nbsp;<i className="fa fa-facebook" aria-hidden="true"></i></a></li>
      <li style={{ display: 'inline' }}><a className='button btn-tweet' style={{ color: 'white', marginRight: 15 }} target="_blank" title="Tweet" onClick={this.shareToTwitter.bind(this)}>Share&nbsp;&nbsp;<i className="fa fa-twitter" aria-hidden="true"></i></a></li>
      <li style={{ display: 'inline' }}><a className='button btn-google' style={{ color: 'white', marginRight: 15 }} target="_blank" title="Share on Google+" onClick={this.shareToGoogle.bind(this)}>Share&nbsp;&nbsp;<i className="fa fa-google" aria-hidden="true"></i></a></li>
      <li style={{ display: 'inline' }}><a className='button btn-pinterest' style={{ color: 'white', marginRight: 15 }} target="_blank" title="Save to Pinboard" onClick={this.shareToPinterest.bind(this)}>Share&nbsp;&nbsp;<i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
    </ul>)
  }
}

export default ShareButtons
