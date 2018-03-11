var myServer
module.exports = (s)=>{

myServer = s
// const incomingMiddleware = require('./middleware/incoming');
var config = require("./config")

var Twit = require('twit')

const Botmaster = require('botmaster');
const TwitterBot = require('botmaster-twitter-dm');
const botmaster = new Botmaster();
var T = new Twit({
  consumer_key:         config.twitterSettings.credentials.consumerKey,
  consumer_secret:      config.twitterSettings.credentials.consumerSecret,
  access_token:         config.twitterSettings.credentials.accessToken,
  access_token_secret:  config.twitterSettings.credentials.accessTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})

const twitterBot = new TwitterBot(config.twitterSettings);
botmaster.addBot(twitterBot);

let options = ["I'm fine ",
"I'm Good",
"I'm dandy",
"Fine and dandy :)"]

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: async (bot, update) => {

if(options.indexOf(update.message.text)>-1){

  let msg = bot.createOutgoingMessageFor(update.sender.id)

  msg.addText("Thank you "+ update.raw.direct_message.recipient.name)
  return  await bot.sendMessage(msg)
}
else{
  await sendQuickReplies(update.sender.id)
}

  }
});

  
botmaster.on('error',  (bot, err) => {
  
  console.log(err.message);

})


function sendQuickReplies(id){


   
  return T.post('direct_messages/events/new', {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": id
        },
        "message_data":  {
          "text": "How are you?",
          "quick_reply": {
            "type": "options",
            "options": [
              {
                "label": "I'm fine ",
                "description": "This is a description.",
                "metadata": "external_id_1"
              },
              {
                "label": "I'm Good",
                "description": "This is a description.",
                "metadata": "external_id_2"
              },
              {
                "label": "I'm dandy",
                "description": "This is a description.",
                "metadata": "external_id_3"
              },
              {
                "label": "Fine and dandy :)",
                "description": "This is a description.",
                "metadata": "external_id_4"
              }
            ]
          }
        }
      }
    }
  })

}

}

// "{"raw":{"direct_message":{"id":971828847405617200,"id_str":"971828847405617157","text":"Fine and dandy :)","sender":{"id":845272994289201200,"id_str":"845272994289201152","name":"Muhammed Abozaid","screen_name":"mabozaid93","location":null,"url":null,"description":null,"protected":false,"followers_count":20,"friends_count":106,"listed_count":0,"created_at":"Fri Mar 24 13:56:01 +0000 2017","favourites_count":4,"utc_offset":-28800,"time_zone":"Pacific Time (US & Canada)","geo_enabled":false,"verified":false,"statuses_count":4,"lang":"en","contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"F5F8FA","profile_background_image_url":null,"profile_background_image_url_https":null,"profile_background_tile":false,"profile_image_url":"http://pbs.twimg.com/profile_images/934552051455086592/-PSkL3Zd_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/934552051455086592/-PSkL3Zd_normal.jpg","profile_link_color":"1DA1F2","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"default_profile":true,"default_profile_image":false,"following":false,"follow_request_sent":false,"notifications":false,"translator_type":"none"},"sender_id":845272994289201200,"sender_id_str":"845272994289201152","sender_screen_name":"mabozaid93","recipient":{"id":971370942592159700,"id_str":"971370942592159744","name":"Muhammed abuzaid","screen_name":"MabuzaidAbuzaid","location":null,"url":null,"description":null,"protected":false,"followers_count":0,"friends_count":32,"listed_count":0,"created_at":"Wed Mar 07 13:04:14 +0000 2018","favourites_count":0,"utc_offset":null,"time_zone":null,"geo_enabled":false,"verified":false,"statuses_count":0,"lang":"en","contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"F5F8FA","profile_background_image_url":null,"profile_background_image_url_https":null,"profile_background_tile":false,"profile_image_url":"http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png","profile_image_url_https":"https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png","profile_link_color":"1DA1F2","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"default_profile":true,"default_profile_image":false,"following":false,"follow_request_sent":false,"notifications":false,"translator_type":"none"},"recipient_id":971370942592159700,"recipient_id_str":"971370942592159744","recipient_screen_name":"MabuzaidAbuzaid","created_at":"Thu Mar 08 19:23:47 +0000 2018","entities":{"hashtags":[],"symbols":[],"user_mentions":[],"urls":[]}}},"sender":{"id":"845272994289201152"},"recipient":{"id":"971370942592159744"},"timestamp":1520537027000,"message":{"mid":"971828847405617157","seq":null,"text":"Fine and dandy :)"}}

