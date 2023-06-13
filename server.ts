"use strict"

import express, { Request, Response, NextFunction, Express } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import api from "./routes/index"
import morgan from "morgan"
import rateLimit from "express-rate-limit"

const app: Express = express()
const corsOpt = { origin: true, credentials: true }
const urlEncodedOpt = { extended: true }

/**
 * Default route handler for handling unknown routes.
 * @param req The Express Request object.
 * @param res The Express Response object.
 */
const defaultRouteHandler = (req: Request, res: Response) => {
  res.status(404).json({
    url: `${req.protocol}://${req.hostname + req.url}`,
    method: req.method,
    status: "ERROR",
    "status-code": 404,
    message: `Endpoint does not exist. ERROR: ${req.url}`,
  })
}

/* Middleware */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded(urlEncodedOpt))
app.use(cookieParser())
app.use(helmet())
app.use(cors(corsOpt))

/* Rate Limiting Middleware */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // maximum 100 requests per window
})

app.use(limiter)

/* REST APIs */
app.use(api)

/* Unknown route handling */
app.use(defaultRouteHandler)

/* Error handling middleware */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Internal Server Error",
  })
})

export default app
