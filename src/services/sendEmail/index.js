const sgMail = require('@sendgrid/mail')
const { logger } = require('../../utils')

const sendEmail = async (to, name, phone, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to,
    from: 'contacto@run-run.co',
    subject: `${name} está buscando algo`,
    text: `${name} está buscando: ${text}, ¡Contactalo! `,
    html: '<strong>https://Run-Run.co</strong>'
  }
  sgMail.send(msg).then(() => {
    logger.info('¡Mensaje enviado de forma éxitosa!')
    return true
  }).catch((error) => {
    return error
  })
}

module.exports = {
  sendEmail
}
