/**
 * Created by johnny on 02/05/2017.
 */
var createError = require('http-errors')

const ERRORS = {
  namespaceNeeded: createError(401, 'You should put namespace in the header.'),
  namespaceNotFound: createError(404, 'No such namespace')
}


module.exports = { ERRORS };
