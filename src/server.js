const app = require('./app')
const { logger } = require('./utils')
const { config: { appPort } } = require('./config')

app.listen(appPort, () => logger.info(`App running on port: ${appPort}`))
