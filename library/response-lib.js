/**
 * function to return error api response in json object.
 * params: message, statusCode, data.
 */
let error = (message, statusCode, data) => {
  // creating object.
  let errorObj = {
    error: true,
    message: message,
    statusCode: statusCode,
    data: data
  }

  return errorObj
} // end of the error function.

/**
 * function to return success or info api response in json object.
 * params: message, statusCode, data.
 */
let info = (message, statusCode, data) => {
  // creating object.
  let infoObj = {
    error: false,
    message: message,
    statusCode: statusCode,
    data: data
  }

  return infoObj
} // end of the info function.

/**
 * exporting modules.
 */
module.exports = {
  error,
  info
}
