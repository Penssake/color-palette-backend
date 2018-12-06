'use strict'

const {Router} = require('express')
const superagent = require('superagent')

const colorsRouter = module.exports = new Router()

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

colorsRouter.get('/colorsAll', (request, response, next) => {
  return superagent
    .get(process.env.API_URL)
    .then(data => {
      return response.json(filteredFrontendData(JSON.parse(data.text)))
    }).catch(err => console.error(err))
})

colorsRouter.get('/colors/:clickedID', (request, response, next) => {
  let ID = request.params.clickedID
  return superagent
    .get(`https://api.mlab.com/api/1/databases/color-palette/collections/colors/${ID}?apiKey=To-iC7DnLVcl359c9nyN52ac49Hcky7H`)
    .then(data => {
      return response.json(filterClicked(JSON.parse(data.text)))
    }).catch(err => console.error(err))
})

// colorsRouter.get('/colors/random', (request, response, next) => {
//     let ID = request.params.clickedID
//     return superagent
//     .get(process.env.API_URL)
//     .then(data => {
//         return response.json(filterClicked(JSON.parse(data.text)));
//     }).catch(err => console.error(err))
// })