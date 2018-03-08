let request = require('request-promise')
module.exports = function (userToken) {
    return request({
        method:'GET', 
        url: 'https://graph.facebook.com/debug_token' ,//+ "1784470698242459",
        json: true,
        qs: {
          access_token:process.env.FB_PAGE_ACCESS_TOKEN,
            // fields: 'first_name,last_name,locale,timezone,gender,profile_pic,last_ad_referral', 
            input_token:userToken//"EAACbB2a1vC4BAAAf9pa9B8IZAiuTQxA85YRSOtOJK3ZCVAOGVBtlGY97WkOaEf1S2VWpFTsJVeEWtz6p8AUt5HKvpbbK5c6ii5OENHxZAHOmnwzlpaXmrZCvgbDKLk9rWZAKCYy0GwPBjj65pmlyPom8x1K9zsL8PifBSlxOD5AZDZD"// process.env.FB_PAGE_ACCESS_TOKEN
        }
    })
}
