let request = require('request-promise')
module.exports = function (loginId, access_token) {
  return request({
    method: 'GET',
    url: 'https://graph.facebook.com/v2.12/'+loginId+'/friends',
    json: true,
    qs: {
        access_token:access_token
    }
  })
}
