const Decoder = require('../../../decoder')
const { parse } = require('../v1/response')
const { failIfVersionNotSupported } = require('../../../error')

/**
 * LeaveGroup Response (Version: 3) => throttle_time_ms error_code [members]
 * throttle_time_ms => INT32
 * error_code => INT16
 * members => member_id group_instance_id error_code
 * member_id => STRING
 * group_instance_id => NULLABLE_STRING
 * error_code => INT16
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()

  failIfVersionNotSupported(errorCode)

  return {
    throttleTime,
    errorCode,
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      groupInstanceId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
      errorCode: decoder.readInt16(),
    })),
  }
}

module.exports = {
  decode,
  parse,
}
