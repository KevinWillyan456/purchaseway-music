import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectToDatabase } from './database'
import { routes } from './routes'
import { eAdmin } from './middlewares/AuthMiddleware'
import { verifyTokenExists } from './middlewares/verifyMiddleware'
import { eAdminManager } from './middlewares/AuthAdminMiddleware'

config()
connectToDatabase()

const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(routes)

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/home', eAdmin, (req, res) => {
    res.render('home')
})
app.get('/denied', (req, res) => {
    res.render('denied')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/login', verifyTokenExists, (req, res) => {
    res.render('login')
})
app.get('/config', eAdminManager, (req, res) => {
    res.render('config')
})
app.use((req, res) => {
    res.redirect('/')
})

app.listen(port, () =>
    console.log(`Servidor rodando na porta: ${port} - http://localhost:${port}`)
)
