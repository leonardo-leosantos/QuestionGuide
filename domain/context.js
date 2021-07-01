const Sequelize = require('sequelize')
const access = require('../secrets/access')

// configurando conexão com o DB MySQL
const connection = new Sequelize(access.DATABASE, access.USER, access.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
