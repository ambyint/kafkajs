const Encoder = require('../../../encoder')
const { SyncGroup: apiKey } = require('../../apiKeys')

/**
 * SyncGroup Request (Version: 3) => group_id generation_id member_id group_instance_id [assignments]
 * group_id => STRING
 * generation_id => INT32
 * member_id => STRING
 * group_instance_id => NULLABLE_STRING
 * assignments => member_id assignment
 * member_id => STRING
 * assignment => BYTES
 */

module.exports = ({ groupId, generationId, memberId, groupInstanceId, groupAssignment }) => ({
  apiKey,
  apiVersion: 3,
  apiName: 'SyncGroup',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(generationId)
      .writeString(memberId)
      .writeString(groupInstanceId)
      .writeArray(groupAssignment.map(encodeGroupAssignment))
  },
})

const encodeGroupAssignment = ({ memberId, memberAssignment }) => {
  return new Encoder().writeString(memberId).writeBytes(memberAssignment)
}
