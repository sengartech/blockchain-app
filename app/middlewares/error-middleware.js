/**
 * importing modules.
 */
const responseLib = require('./../../library/response-lib.js')

/**
 * middleware function to handle api err.
 */
let errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(`error in requesting api: ${err.stack}`)
    let apiResponse = responseLib.error(`error in requesting api`, 500, null)
    res.send(apiResponse)
  } else {
    next()
  }
} // end of the errorHandler function.

/**
 * middleware function to handle api not found err.
 */
let notFoundHandler = (req, res, next) => {
  console.log('requested api not found')

  let apiResponse = responseLib.error(`requested api not found`, 404, null)
  res.send(apiResponse)
} // end of the notFoundHandler function.

/**
 * exporting functions.
 */
module.exports = {
  errorHandler,
  notFoundHandler
}
