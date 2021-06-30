const express = require("express")
const app = express()

// configurando Express para usar o EJS como view engine
app.set('view engine', 'ejs')

// configurando Express para carregar arquivos estáticos na pasta 'public'
app.use(express.static('public'))

// decodifica os dados enviados pelo formulário
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// ROTAS DO SERVIÇO
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/ask', (req, res) => {
    res.render('toask')
})

app.post('/savequestion', (req, res) => {
    res.send(`form recebido ${req.body.titulo} ${req.body.descricao}`)
})

app.listen(8080, () => {console.log('app run...')})