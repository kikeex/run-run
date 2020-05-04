const sgMail = require('@sendgrid/mail')
const { logger } = require('../../utils')

const sendEmail = async (to, name, phone, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to,
    from: 'contacto@run-run.co',
    subject: `${name} está buscando ${text}`,
    text: `${name} está buscando: ${text}, ¡Contáctalo! ${phone} `,
    html: `${name} está buscando: ${text}, ¡Contáctalo! ${phone} `
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
