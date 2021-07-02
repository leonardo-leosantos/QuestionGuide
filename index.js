const express = require("express")
const app = express()
const connection = require('./domain/context')
const QuestionModel = require('./domain/models/Question')
const ResponseModel = require('./domain/models/Response')

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
    QuestionModel.findAll({
        raw: true,
        order: [['createdAt','DESC']] // ASC = ordem crescente || DESC = ordem decrescente
    }).then((perguntas) => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/ask', (req, res) => {
    res.render('toask')
})

app.post('/savequestion', (req, res) => {
    // inserindo dados no banco
    QuestionModel.create({
        title: req.body.titulo,
        description: req.body.descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/ask/:id', (req, res) => {
    var id = req.params.id
    QuestionModel.findOne({
        where: {id: id}
    }).then(question => {
        if(question) {
            ResponseModel.findAll({
                raw: true,
                where: { id_question: question.id },
                order: [
                    ['createdAt','DESC']
                ]
            }).then(responses => {
                res.render('onlyQuestion', {
                    pergunta: question,
                    respostas: responses
                })
            })
        } else {
            // não encontrada
            res.redirect('/')
        }
    })
})

app.post('/saveresponse', (req, res) => {
    // inserindo dados no banco
    var id_question = req.body.id
    ResponseModel.create({
        body: req.body.body_response,
        id_question: id_question
    }).then(() => {
        res.redirect(`/ask/${id_question}`)
    })
})

app.listen(8080, () => {console.log('app run...')})