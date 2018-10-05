/**
 * this library is for creating blockchain class.
 * which will be ours ledger system.
 */

/**
 * importing modules.
 */
const cryptoJs = require('crypto-js')
const uuid = require('uuid')

/**
 * constructor function for blockchain.
 */
let Blockchain = function() {

  // chain - block - index,createdOn,txData,nonce,previousHash,currentHash
  this.chain = []

  // object - txId,createdOn,amount,comment,sender,receiver.
  this.pendingTxData = []

  // current and all network nodes url info.
  this.nodeUrl = ''
  this.networkNodeList = []

  // creating the genesis block.
  let nonce = this.proofOfWork('0000', this.pendingTxData)
  let currentHash = this.createHash(nonce, '0000', this.pendingTxData)
  this.createBlock(nonce, '0000', currentHash)

} // end of the blockchain constructor.

/**
 * function to create a block.
 * params: nonce, previousHash, currentHash.
 */
Blockchain.prototype.createBlock = function(nonce, previousHash, currentHash) {
  let blockObject = {
    index: this.chain.length + 1,
    createdOn: Date.now(),
    txData: this.pendingTxData,
    nonce: nonce,
    previousHash: previousHash,
    currentHash: currentHash
  }

  this.pendingTxData = []

  this.chain.push(blockObject)

  return blockObject
} // end of the createBlock prototype function.

/**
 * function to get last block.
 * params:
 */
Blockchain.prototype.getLastBlock = function() {
  let chainLength = this.chain.length
  
  let lastBlock = this.chain[chainLength - 1]

  return lastBlock
} // end of the getLastBlock function.

/**
 * function to create hash.
 * params: nonce, previousHash, txData.
 */
Blockchain.prototype.createHash = function(nonce, previousHash, txData) {
  let infoString = nonce.toString() + previousHash + JSON.stringify(txData)

  let currentHash = cryptoJs.SHA256(infoString).toString()

  return currentHash
} // end of the createHash function.

/**
 * function to find the proof of work,
 * finding the nonce value.
 * params: previousHash, txData.
 */
Blockchain.prototype.proofOfWork = function(previousHash, txData) {
  let nonce = 1
  let targetZeroes = '0000'

  let hash = this.createHash(nonce, previousHash, txData)

  let firstFourChar = hash.substring(0, 4)

  while(firstFourChar !== targetZeroes) {
    nonce++
    hash = this.createHash(nonce, previousHash, txData)
    firstFourChar = hash.substring(0, 4)
  }

  return nonce
} // end of the proofOfWork function.

/**
 * function to create transaction data.
 * params: amount, comment, sender, receiver.
 */
Blockchain.prototype.createTxData = function(amount, comment, sender, receiver) {
  let txObject = {
    txId: uuid.v1().split('-').join(''),
    createdOn: Date.now(),
    amount: amount,
    comment: comment,
    sender: sender,
    receiver: receiver
  }

  return txObject
} // end of the createTxData function.

/**
 * function to add txData to pendingTxData.
 * params: amount, comment, sender, receiver.
 */
Blockchain.prototype.addNewTxDataToPendingTxData = function(amount, comment, sender, receiver) {
  let txObject = this.createTxData(amount, comment, sender, receiver)

  this.pendingTxData.push(txObject)

  let lastBlock = this.getLastBlock()

  return(lastBlock['index'] + 1)
} // end of the addNewTxDataToPendingTxData function.

/**
 * function to get block using hash.
 * params: hash.
 */
Blockchain.prototype.getBlockUsingHash = function(hash) {
  let blockList = this.chain.slice()

  let block = blockList.filter((blockObject) => {
    if (blockObject.currentHash === hash) return blockObject
  })

  return block
} // end of the getBlockUsingHash function.

module.exports = Blockchain
