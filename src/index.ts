import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import { connectToDatabase } from './database'
import { eAdminManager } from './middlewares/AuthAdminMiddleware'
import { eAdmin } from './middlewares/AuthMiddleware'
import { checkEnvVars } from './middlewares/EnvCheckMiddleware'
import { verifyTokenExists } from './middlewares/verifyMiddleware'
import { routes } from './routes'

config()
connectToDatabase()
checkEnvVars()

const app = express()
const port = process.env.PORT || 3000

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
app.get('/reset-password', (req, res) => {
    res.render('reset-password')
})
app.get('/terms-and-privacy', (req, res) => {
    res.render('terms-and-privacy')
})
app.use((req, res) => {
    res.redirect('/')
})

app.listen(port, () =>
    console.log(
        `🚀 Server running on port: ${port} - 🌐 http://localhost:${port}`,
    ),
)
