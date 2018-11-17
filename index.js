/**
 * importing modules.
 */
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')

const errorMiddleware = require('./app/middlewares/error-middleware.js')

require('./app/configs/main-config.js')
const config = Object.assign({}, global.config)

// initializing express app.
const app = express()

const routesPath = './app/routes'

// using helmet for basic security.
app.use(helmet())

// using morgan for logging request.
app.use(morgan('dev'))

// setting body and cookie parser.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}))
app.use(cookieParser())

/**
 * importing all routes files.
 */
fs.readdirSync(routesPath).forEach((file) => {
  console.log(`importing route file: ${file}`)
  if (file.indexOf('.js')) {
    let routerFile = require(`${routesPath}/${file}`)
    routerFile.router(app)
  }
})

/**
 * handling process exceptions and errors.
 */
process.on('uncaughtException', (err) => {
  console.log(`uncaught exception occurred:`)
  console.log(err)
})

process.on('unhandledRejection', (err) => {
  console.log(`unhandled rejection occurred:`)
  console.log(err)
})

// using error handling middleware.
app.use(errorMiddleware.errorHandler)
app.use(errorMiddleware.notFoundHandler)

/**
 * listening app at specified port in config file.
 */
app.listen(config.port)
  .on('error', (err) => {
    console.log(`error on port listening: ${err}`)
  })
  .on('listening', () => {
    console.log(`${config.name} is listening at port: ${config.port}`)
  })

/**
 * exporting app.
 */
module.exports = {
  app
}
