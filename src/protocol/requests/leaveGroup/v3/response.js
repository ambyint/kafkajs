const { parse, decode } = require('../v1/response')

/**
 * LeaveGroup Response (Version: 3) => throttle_time_ms error_code [members]
 * throttle_time_ms => INT32
 * error_code => INT16
 * members => member_id group_instance_id error_code
 * member_id => STRING
 * group_instance_id => NULLABLE_STRING
 * error_code => INT16
 */

module.exports = {
  decode,
  parse,
}
