const express = require("express")
const app = express()
const connection = require('./domain/context')
const Question_model = require('./domain/models/Question')

// database
connection.authenticate().then(() => {
    console.log('db conectado!')
}).catch((err) => {
    console.log(err)
})

// configurando Express para usar o EJS como view engine
app.set('view engine', 'ejs')

// configurando Express para carregar arquivos estáticos na pasta 'public'
app.use(express.static('public'))

// decodifica os dados enviados pelo formulário
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// ROTAS DO SERVIÇO
app.get('/', (req, res) => {
    Question_model.findAll({ raw: true }).then((perguntas) => {
        console.log(perguntas)
    })
    res.render('index')
})

app.get('/ask', (req, res) => {
    res.render('toask')
})

app.post('/savequestion', (req, res) => {
    // inserindo dados no banco
    Question_model.create({
        title: req.body.titulo,
        description: req.body.descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.listen(8080, () => {console.log('app run...')})