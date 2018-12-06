'use strict'

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colorsRouter = require('../route/colors-router.js')
const mongoose = require('mongoose')

const app = express()
let server = null

app.use(cors())
app.use(morgan('dev'))

app.use(colorsRouter)

app.all('*', (request, response) => response.sendStatus(404))

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if (server)
        return reject(new Error('__SERVER_ERROR__ server is already on'))
      server = app.listen(process.env.PORT, () => {
        console.log('__SERVER_ON__', process.env.PORT)
        return resolve()
      })
    })
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if (!server)
        return reject(new Error('__SERVER_ERROR__ server is already off'))
      server.close(() => {
        server = null
        console.log('__SERVER_OFF__')
        return resolve()
      })
    })
  },
}