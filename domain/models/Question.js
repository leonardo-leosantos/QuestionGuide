const Sequelize = require('sequelize')
const connection = require('../context')

// criando tabela através de model
const Question = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Question.sync({force: false}).then(() => {
    // console.log('table criada')
})

module.exports = Question