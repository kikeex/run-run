const { logger } = require('../../utils')

/** Function to test the service **/

const testFunction = async (req, res) => {
  logger.warn('Pong!')
  return res.status(200).json({ message: 'Pong!' })
}

module.exports = {
  testFunction
}
