const routes = require('express').Router()
const { testFunction } = require('../services/test')
const { sendEmail } = require('../services/sendEmail')
const { search } = require('../services/search')

/* REMOVE THIS ROUTE, IS ONLY FOR TEST */
routes.post('/ping', testFunction)
routes.post('/send-email', sendEmail)
routes.post('/search', search)

module.exports = routes
