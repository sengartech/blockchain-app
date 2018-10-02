/**
 * importing modules.
 */
const uuid = require('uuid')

const responseLib = require('./../../library/response-lib.js')
const checkLib = require('./../../library/check-lib.js')

/**
 * function to check test route.
 */
let check = (req, res) => {
  console.log('request success')
  let apiResponse = responseLib.info('request success', 200, {info: 'check success'})
  res.send(apiResponse)
} // end of the check function.

/**
 * exporting functions.
 */
module.exports = {
  check
}
