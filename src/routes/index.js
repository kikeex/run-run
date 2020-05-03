const routes = require('express').Router()
const { testFunction } = require('../services/test')

/* REMOVE THIS ROUTE, IS ONLY FOR TEST */
routes.post('/ping', testFunction)

module.exports = routes
