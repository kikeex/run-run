const dbConnection = require('../../db')
const { logger } = require('../../utils')
const { sendEmail } = require('../sendEmail')
const connection = dbConnection()

async function search (req, res) {
  const { search, document } = req.body;
  if (!search) {
    logger.error('Debes escribir algo')
    return res.status(400).send( { msg: 'Debes escribir algo' } )
  }
  if (!document) {
    logger.error('Debes iniciar sesión')
    return res.status(401).send( { msg: 'Debes iniciar sesión' } )
  }
  const sqlUser = 'select * from User WHERE document = ?'
  await connection.query(sqlUser, document,
    (err, resultUser) => {
    if (err) {
      logger.error(err);
    return res.status(500).send( { err } )
          }
    if (resultUser.length === 0) {
    return res.status(401).send( { msg: 'Debes registrar tus datos' } )
          }
  const sqlManufacturerUser = 'select * from UserManufacturer WHERE userId = ?'
    connection.query(sqlManufacturerUser, resultUser[0].id,
      (err, resultManufacturerUser) => {
    if (err) {
      logger.error(err);
     return res.status(500).send( { err } )
          }
    if (resultManufacturerUser.length === 0) {
      return res.status(400).send( { msg: 'Sin resultados, intenta de nuevo' } )
          }
  const sqlManufacturerCompany = 'select * from CompanyManufacturer WHERE manufacturerId = ?'
    connection.query(sqlManufacturerCompany, resultManufacturerUser[0].manufacturerId,
      (err, resultManufacturerCompany) => {
    if (err) {
      logger.error(err);
      return res.status(500).send({ err })
          }
    if (resultManufacturerCompany.length === 0) {
      return res.status(400).send( { msg: 'Todavía no tenemos empresas que vendan repuestos para esa marca.' } )
          }
  const sqlCompany = 'select * from Company WHERE id = ? AND status = 1'
    connection.query(sqlCompany, resultManufacturerCompany[0].companyId,
      (err, resultCompany) => {
  if (err) {
      logger.error(err);
      return res.status(500).send({ err })
          }
  if (!resultCompany[0].email || !resultUser[0].firstName || !search) {
      return res.status(500).send({ msg: 'No existen empresas registradas para esa búsqueda' })
      } try {
        userName = resultUser[0].firstName + ' ' + resultUser[0].lastName
        sendEmail(resultCompany[0].email, userName, resultUser[0].phone, search)
        logger.info('Search sucess:', { search, email: resultCompany[0].email, userName: userName  });
        return res.status(200).send({ msg: `Hemos enviado tu solicitudad a: ${resultManufacturerCompany.length} compañía/s` })
      } catch (err) {
        logger.error(err);
        return res.status(500).send({ err })
            }
          })
        })
      })
    })
  }

module.exports = {
  search
}
