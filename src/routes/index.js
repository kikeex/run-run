const routes = require('express').Router()
const { testFunction } = require('../services/test')
const { sendEmail } = require('../services/sendEmail')

/* REMOVE THIS ROUTE, IS ONLY FOR TEST */
routes.post('/ping', testFunction)
routes.post('/send-email', sendEmail)

module.exports = routes
