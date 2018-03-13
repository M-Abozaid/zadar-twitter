var myServer
module.exports = (s)=>{

myServer = s

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
  timeout_ms:           60*1000, 
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

