/**
 * importing modules.
 */
const blockController = require('./../controllers/block-controller.js')

const path = '/api/v1/block'

/**
 * function in which all routes will be defined.
 */
let router = (app) => {

  // params:
  app.get(`${path}/check`, blockController.check)

  // params:
  app.get(`${path}/get/full`, blockController.getBlockchainLedger)

  // params:
  app.get(`${path}/list`, blockController.getBlockList)

} // end of the router function.

/**
 * exporting router function.
 */
module.exports = {
  router
}
