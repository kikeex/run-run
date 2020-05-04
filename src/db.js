const mysql = require('mysql')
const { config: { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } } = require('./config')

module.exports = () => {
  return mysql.createPool({
    connectionLimit: 50,
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME

  })
}
