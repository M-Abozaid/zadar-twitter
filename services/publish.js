let request = require('request-promise')
module.exports = function (userToken, userId, postText, postAttachment,dbUserId) {
  console.log("publishing ", userId, dbUserId)
  let uri = (dbUserId)? "https://task-spotting.herokuapp.com/images/"+dbUserId :postAttachment;
  console.log("image link ", uri)
  return request({
    method: 'POST',
    url: 'https://graph.facebook.com/' + userId + '/feed',
    json: true,
    qs: {
      access_token: userToken // "EAACbB2a1vC4BAG68UmVX3yVwOPNosPR5zRD223iwBzE4UBJvIAl5d7eqLWLI4ZBGCwJqMucYu98qA7AAx2aARAYn7OX0yvqKqkavIhG1wOsmsmCHOYiLDliZCXxNYo1Crlm3QZBYXVailmrZBf1twQZBrgax71FUZD"
    },
    body: {
      'message': postText,
      'link':uri
    }
  })
}


// module.exports("EAACbB2a1vC4BALA7cl71vDdaC4u1pfQSVdGYdpCQu9iiMwscD1GIe7QVk4UMV7icsNHRZC20XZAK0JD3guMGrFOGtlN0WvjcrgExzT1BoErSIaGX7CGg2yP4teBI3Jpcpk3epuxRGHhXlkEL5xmIUO7SC9LDkZD",
// "10213245567427196","Check out #fast_car", "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg").then(r=>{


// })
// request({
//     method:'GET', 
//     url: 'https://graph.facebook.com/' + "268071887063046/permissions",
//     json: true,
//     qs: {
//         // fields: 'first_name,last_name,locale,timezone,gender,profile_pic,last_ad_referral', 
//         access_token: "EAACbB2a1vC4BANx9uPAbhXfAEct8tZAMZAUH9ncSZCitoXvPvPzRnswMhVjgVdTrYdXea15A08yJWJT0Leh5b7ZC3qqCTtNL9pSHZAaOQew70pyOj8D3Krd22dlJUSmGCdNB7vQYQTulldh3EOr3I4EpjkpWtecuAIa5WXcsRENhYmbMBC7Il3ifya1GS3ybrBniZApzjLoAZDZD"//process.env.FB_PAGE_ACCESS_TOKEN
//     }
// }).then(u=>{

//     console.log(u)
// })
// EAACbB2a1vC4BANx9uPAbhXfAEct8tZAMZAUH9ncSZCitoXvPvPzRnswMhVjgVdTrYdXea15A08yJWJT0Leh5b7ZC3qqCTtNL9pSHZAaOQew70pyOj8D3Krd22dlJUSmGCdNB7vQYQTulldh3EOr3I4EpjkpWtecuAIa5WXcsRENhYmbMBC7Il3ifya1GS3ybrBniZApzjLoAZDZD










