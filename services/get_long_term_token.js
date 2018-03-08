let request = require('request-promise')
module.exports = function (shortTermToken) {
  return request({
    method: 'GET',
    url: 'https://graph.facebook.com/oauth/access_token',
    json: true,
    qs: {
      'grant_type': 'fb_exchange_token',
      'client_id': process.env.FB_APP_ID,
      'client_secret': process.env.FB_APP_SECRET,
      'fb_exchange_token': shortTermToken//'EAACbB2a1vC4BALQvNe24sc9CaS6HfQmCHBtnJN1oIfCafXHc2dO5lRwLQOlbQJYLfxluecEdbqpgKdfzSLAs23yhw2zpXoYBB1QBN8enDSzwpLIZB96gfwePEHj7RgNAZA6tuBgZCqfYpwUCquBCpLA6FeMW4D1ZACy3VQxqmBPvGl21TZBZBIyEZCEPGZB9MwZCiw9RD0APf5gZDZD'
    }
  })
}