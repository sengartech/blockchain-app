/**
 * importing modules
 */

/**
 * function to remove spaces.
 * params: str.
 */
let trimSpaces = (str) => {
  let newStr = String(str)

  return newStr.replace(/^\s+|\s+$/gm, '')
} // end of trimSpaces function.

/**
 * function to check if passed variable is,
 * null, undefined, empty, if empty object or is empty array.
 * params: data.
 */
let isEmpty = (data) => {
  if (data === null || data === undefined || trimSpaces(data) === '' || data.length === 0) {
    return true
  } else {
    return false
  }
} // end of the isEmpty function.

/**
 * exporting functions.
 */
module.exports = {
  trimSpaces,
  isEmpty
}
