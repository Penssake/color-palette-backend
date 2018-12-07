'use strict'

const {Router} = require('express')
const superagent = require('superagent')

const colorsRouter = module.exports = new Router()

const filterRandomResult = (data) => {
  const result = []
  for(let color of data) {
    let redHex = color.red.toString(16)
    let greenHex = color.green.toString(16)
    let blueHex = color.blue.toString(16)
    let rgb = redHex + greenHex + blueHex
    result.push({
      _id: color._id.$oid,
      red: color.red,
      green: color.green,
      blue: color.blue,
      label: rgb,
    })
  }
  return result[Math.floor(Math.random() * result.length)]
}

const filteredFrontendData = (data) => {
  const result = []
  for(let color of data) {
    let redHex = color.red.toString(16)
    let greenHex = color.green.toString(16)
    let blueHex = color.blue.toString(16)
    let rgb = redHex + greenHex + blueHex
    result.push({
      _id: color._id.$oid,
      red: color.red,
      green: color.green,
      blue: color.blue,
      label: rgb,
    })
  }
  console.log(result)
  return result
}

const filterClicked = (data) => {
  console.log('YOU WAT', data)
  const result = []
  let redHex = data.red.toString(16)
  let greenHex = data.green.toString(16)
  let blueHex = data.blue.toString(16)
  let rgb = redHex + greenHex + blueHex
  result.push({
    _id: data._id.$oid,
    red: data.red,
    green: data.green,
    blue: data.blue,
    label: rgb,
  })
  console.log(result)
  return result
}

colorsRouter.get('/colorsAll/:page', (request, response, next) => {
  let PAGE = request.params.page
  return superagent
    .get(`${process.env.API_SKIP}${PAGE}${process.env.LIMIT}`)
    .then(data => {
      return response.json(filteredFrontendData(JSON.parse(data.text)))
    }).catch(err => console.error(err))
})

colorsRouter.get('/colors/:clickedID', (request, response, next) => {
  let ID = request.params.clickedID
  return superagent
    .get(`${process.env.API_ID}/${ID}?${process.env.API_KEY}`)
    .then(data => {
      return response.json(filterClicked(JSON.parse(data.text)))
    }).catch(err => console.error(err))
})

colorsRouter.get('/random', (request, response, next) => {
  return superagent
    .get(`${process.env.API_URL}`)
    .then(data => {
      return response.json(filterRandomResult(JSON.parse(data.text)))
    }).catch(err => console.error(err))
})

colorsRouter.get('/colorQuery/:color', (request, response, next) => {
  console.log(request.params.color)
  let selectedColor = request.params.color
  return superagent
    .get(`${process.env.COLOR_QUERY}{"primaryColor": "${selectedColor}"}&${process.env.API_KEY}`)
    .then(data => {
      return response.json(filteredFrontendData(JSON.parse(data.text)))
    }).catch(err => console.error(err))
})