const Sequelize = require('sequelize')
const access = require('../secrets/access')

// configurando conexão com o DB MySQL
const connection = new Sequelize(access.DATABASE, access.USER, access.PASSWORD, {
    host: access.HOST,
    dialect: 'mysql'
})

module.exports = connection
