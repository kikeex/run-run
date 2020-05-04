const dbConnection = require('../../db')
const { logger } = require('../../utils')
const { sendEmail } = require('../sendEmail')
const connection = dbConnection()

async function search (req, res) {
  const { document, search } = req.body
  const sqlUser = 'select * from User WHERE document = ?'
  connection.query(sqlUser, document,
    (err, resultUser) => {
    if (err) {
    return res.status(500).send( { err } )
          }
  const sqlManufacturerUser = 'select * from UserManufacturer WHERE userId = ?'
    connection.query(sqlManufacturerUser, resultUser[0].id,
      (err, resultManufacturerUser) => {
    if (err) {
     return res.status(500).send( { err } )
          }
  const sqlManufacturerCompany = 'select * from CompanyManufacturer WHERE manufacturerId = ?'
    connection.query(sqlManufacturerCompany, resultManufacturerUser[0].manufacturerId,
      (err, resultManufacturerCompany) => {
    if (err) {
      return res.status(500).send({ err })
          }
  const sqlCompany = 'select * from Company WHERE id = ? AND status = 1'
    connection.query(sqlCompany, resultManufacturerCompany[0].companyId,
      (err, resultCompany) => {
  if (err) {
      return res.status(500).send({ err })
          }
  if (!resultCompany[0].email || !resultUser[0].firstName || !search) {
      return res.status(500).send({ msg: 'No existen empresas registradas para esa búsqueda' })
      } try {
        userName = resultUser[0].firstName + ' ' + resultUser[0].lastName
        sendEmail(resultCompany[0].email, userName, resultUser[0].phone, search)
        return res.status(200).send({ msg: `Hemos enviado tu solicitudad a: ${resultManufacturerCompany.length} compañía/s` })
      } catch (err) {
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
