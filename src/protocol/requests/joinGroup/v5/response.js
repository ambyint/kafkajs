const Decoder = require('../../../decoder')
const { failIfVersionNotSupported } = require('../../../error')
const { parse: parseV0 } = require('../v0/response')

/**
 * JoinGroup Response (Version: 5) => throttle_time_ms error_code generation_id protocol_name leader member_id [members]
 * throttle_time_ms => INT32
 * error_code => INT16
 * generation_id => INT32
 * protocol_name => STRING
 * leader => STRING
 * member_id => STRING
 * members => member_id group_instance_id metadata
 * member_id => STRING
 * group_instance_id => NULLABLE_STRING
 * metadata => BYTES
 */

const decode = async rawData => {
  const decoder = new Decoder(rawData)
  console.log("decode", rawData.toString("hex"))
  const throttleTime = decoder.readInt32()
  const errorCode = decoder.readInt16()
  console.log("v5 error code", errorCode)

  failIfVersionNotSupported(errorCode)

  let decoded = {
    throttleTime,
    errorCode,
    generationId: decoder.readInt32(),
    groupProtocol: decoder.readString(),
    leaderId: decoder.readString(),
    memberId: decoder.readString(),
    members: decoder.readArray(decoder => ({
      memberId: decoder.readString(),
      groupInstanceId: decoder.readString(),
      memberMetadata: decoder.readBytes(),
    })),
  }
  console.log("response v5 decoded", decoded)
  return decoded
}

module.exports = {
  decode,
  parse: parseV0,
}
