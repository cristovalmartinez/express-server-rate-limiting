import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import api from './routes/index.js'

const app = express()
const corsOpt = { origin: true, credentials: true }
const urlEncdedOpt = { extended: true }
const defaultRouteHandler = (req, res) => {
  res.status(500).json({
    url: `${req.protocol}://${req.hostname + req.url}`,
    method: req.method,
    status: 'ERROR',
    'status-code': res.statusCode,
    message: `End point does not exist. ERROR: ${req.url}`,
  })
}

/* Middleware */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded(urlEncdedOpt))
app.use(cookieParser())
app.use(helmet())
app.use(cors(corsOpt))

/* REST API's */
app.use(api)

app.use(defaultRouteHandler)

export default app
