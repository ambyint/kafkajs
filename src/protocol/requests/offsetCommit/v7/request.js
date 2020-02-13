const Encoder = require('../../../encoder')
const { OffsetCommit: apiKey } = require('../../apiKeys')

/**
 * OffsetCommit Request (Version: 2) => group_id group_generation_id member_id retention_time [topics]
 *   group_id => STRING
 *   group_generation_id => INT32
 *   member_id => STRING
 *   retention_time => INT64
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition offset metadata
 *       partition => INT32
 *       offset => INT64
 *       metadata => NULLABLE_STRING
 */

module.exports = ({ groupId, groupGenerationId, memberId, groupInstanceId, topics }) => ({
  apiKey,
  apiVersion: 7,
  apiName: 'OffsetCommit',
  encode: async () => {
    return new Encoder()
      .writeString(groupId)
      .writeInt32(groupGenerationId)
      .writeString(memberId)
      .writeString(groupInstanceId)
      .writeArray(topics.map(encodeTopic))
  },
})

const encodeTopic = ({ topic, partitions }) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

const encodePartition = ({ partition, offset, leaderEpoch, metadata = null }) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt64(offset)
    .writeInt32(leaderEpoch)
    .writeString(metadata)
}
