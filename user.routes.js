const express = require('express')
const routes = express.Router()

const user = require('./user.controller')

routes.post('/', user.createOne)
routes.post('/login', user.login)
routes.put('/:id', user.updateOne)

module.exports = routes