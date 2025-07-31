import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import createError from 'http-errors'
import errorHandler from './middlewares/error-handler.js'
import contextMiddleware from './middlewares/context.js'
import routes from './config/routes.js'
import { getDriname } from './utils/path-helper.js'

const app = express()
const __dirname = getDriname(import.meta.url)

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
}

// set favicon
app.get('/favicon.ico', (req, res) => res.status(204));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(cors())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'public')))

// context
app.use(contextMiddleware)

// routes
app.use(routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(errorHandler)

export default app
