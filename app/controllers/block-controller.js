/**
 * importing modules.
 */
const uuid = require('uuid')

const Blockchain = require('./../../library/blockchain-lib.js')

const responseLib = require('./../../library/response-lib.js')
const checkLib = require('./../../library/check-lib.js')

const xChain = new Blockchain()

/**
 * function to check test route.
 */
let check = (req, res) => {
  console.log('request success')
  let apiResponse = responseLib.info('request success', 200, {info: 'check success'})
  res.send(apiResponse)
} // end of the check function.

/**
 * function to get full blockchain ledger.
 */
let getBlockchainLedger = (req, res) => {
  console.log(`-- inside getBlockchainLedger function --`)

  let apiResponse = responseLib.info('full blockchain is displayed', 200, xChain)

  res.send(apiResponse)
} // end of the getBlockchainLedger function.

/**
 * function to get blocks list.
 */
let getBlockList = (req, res) => {
  console.log(`-- inside getBlockList function --`)

  let apiResponse = responseLib.info('block list is fetched', 200, xChain.chain)

  res.send(apiResponse)
} // end of the get getBlockList function.

/**
 * exporting functions.
 */
module.exports = {
  check,
  getBlockchainLedger,
  getBlockList
}
