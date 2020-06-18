const versions = {
  0: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = require('./v0/request')
    const response = require('./v0/response')
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  1: ({ groupId, generationId, memberId, groupAssignment }) => {
    const request = require('./v1/request')
    const response = require('./v1/response')
    return {
      request: request({ groupId, generationId, memberId, groupAssignment }),
      response,
    }
  },
  3: ({ groupId, generationId, memberId, groupAssignment, groupInstanceId }) => {
    const request = require('./v3/request')
    const response = require('./v3/response')
    return {
      request: request({ groupId, generationId, memberId, groupAssignment, groupInstanceId }),
      response,
    }
  },
}

module.exports = {
  versions: Object.keys(versions),
  protocol: ({ version }) => versions[version],
}
