const { parse, decode } = require('../v1/response')

/**
 * SyncGroup Response (Version: 3) => throttle_time_ms error_code assignment
 * throttle_time_ms => INT32
 * error_code => INT16
 * assignment => BYTES
 */

module.exports = {
  decode,
  parse,
}
