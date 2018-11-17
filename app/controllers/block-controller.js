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
 * function to add new transaction data.
 * params: amount, comment, sender, receiver.
 */
let newTransaction = (req, res) => {
  // function to check params
  let validateParams = () => {
    return new Promise((resolve, reject) => {
      if (checkLib.isEmpty(req.body.amount) || checkLib.isEmpty(req.body.sender) || checkLib.isEmpty(req.body.receiver)) {
        let apiResponse = responseLib.error('parameters missing', 400, null)
      } else {
        resolve()
      }
    })
  } // end of the validateParams function.

  // function to create transaction.
  let createTransaction = () => {
    return new Promise((resolve, reject) => {
      let txObject = xChain.createTxData(req.body.amount, req.body.comment, req.body.sender, req.body.receiver)

      resolve(txObject)
    })
  } // end of the createTransaction function.

  // making promise call.
  validateParams()
    .then(createTransaction)
    .then((result) => {
      let apiResponse = responseLib.info('transaction success', 200, result)
      res.send(apiResponse)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
} // end of the newTransaction function.

/**
 * exporting functions.
 */
module.exports = {
  check,
  getBlockchainLedger,
  getBlockList,
  newTransaction
}
