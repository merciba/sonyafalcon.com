'use strict'

const Paquet = require('paquet')
const webapp = new Paquet('es6')
const path = require('path')
const mime = require('mime-types')
const toobusy = require('toobusy-js')
const fs = require('fs')
const _ = require('lodash')

require('dotenv').config({silent: true})

toobusy.maxLag(1000)
toobusy.interval(250)

webapp.start({
  port: 5000,
  name: 'localhost',
  public: `${__dirname}/dist`,
  middleware: {
    '/*': function * (next) {
      let contentType = mime.lookup(this.request.url)
      if (!contentType) {
        if (/\.woff/.test(this.request.url)) contentType = 'application/font-woff'
        if (/\.ttf|\.otf/.test(this.request.url)) contentType = 'application/font-sfnt'
      }
      this.response.set('Content-Type', contentType)
      if (/\./.test(this.request.url)) yield next
      else {
        this.response.serveFile(path.join(__dirname, 'dist', _.find(fs.readdirSync(`${__dirname}/dist`), (file) => /.html$/.test(file))))
      }
    }
  }
})
