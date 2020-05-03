const sgMail = require('@sendgrid/mail');
const { logger } = require('../../utils')

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'contacto@run-run.co',
    from: 'contacto@run-run.co',
    subject: 'Jose está buscando bombas de agua',
    text: 'José está buscando bombas de agua para Chevrolet, contáctalo!',
    html: '<strong>3004928614</strong>',
  };
  sgMail.send(msg).then(() => {
    logger.info('¡Mensaje enviado de forma éxitosa!')
    res.send(200)
  }).catch((error) => {
    console.error(error.response.body.errors[0].message)
})
}

module.exports = {
  sendEmail
}
