const Encoder = require('../../../encoder')
const { JoinGroup: apiKey } = require('../../apiKeys')

/**
 * JoinGroup Request (Version: 5) => group_id session_timeout_ms rebalance_timeout_ms member_id group_instance_id protocol_type [protocols]
 * group_id => STRING
 * session_timeout_ms => INT32
 * rebalance_timeout_ms => INT32
 * member_id => STRING
 * group_instance_id => NULLABLE_STRING
 * protocol_type => STRING
 * protocols => name metadata
  * name => STRING
  * metadata => BYTES
 */

module.exports = (incoming) => ({
  apiKey,
  apiVersion: 5,
  apiName: 'JoinGroup',
  encode: async () => {
    const {
      groupId,
      sessionTimeout,
      rebalanceTimeout,
      memberId,
      groupInstanceId = null,
      protocolType,
      groupProtocols,
    } = incoming
    console.log("incoming join group version 5 params", incoming)
    return new Encoder()
      .writeString(groupId)
      .writeInt32(sessionTimeout)
      .writeInt32(rebalanceTimeout)
      .writeString(memberId)
      .writeString(groupInstanceId)
      .writeString(protocolType)
      .writeArray(groupProtocols.map(encodeGroupProtocols))
  },
})

const encodeGroupProtocols = ({ name, metadata = Buffer.alloc(0) }) => {
  return new Encoder().writeString(name).writeBytes(metadata)
}