const { response } = require('express')
const Sequelize = require('sequelize')
const connection = require('../context')

const Response = connection.define('responses', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    id_question: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Response.sync({ force: false }).then(x => {})

module.exports = Response