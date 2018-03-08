const userService = require("./user")
const find = require("lodash/find")
var config = require("../config")
const MessengerBot = require('botmaster-messenger');
const bot = new MessengerBot(config.messengerSettings);
const publish = require("./publish")
const FB_TEXT_LIMIT = 640
module.exports = async function sendModule(mod,user){


    let recipientId = user.recipientId
    let campaign = user.activeCampaign
    // send typing on
    await bot.sendMessage(bot.createOutgoingMessageFor(recipientId).addTypingOnSenderAction())
    if(mod.delay){
        await sleep(mod.delay * 1000 || 500)
    }
    if(mod.typing){
        await sleep(mod.typing * 1000)
    }

    let msg = bot.createOutgoingMessageFor(recipientId)
    console.log("sending module ",mod.modId, "type ",mod.type)
    
    switch(mod.type){

        case "text_msg":
        case "text_question":
        case "email":
        case "feedback":
        case "address_1":
        case "address_2":
        case "city":
        case "birth_year":
        case "mobile_number":
        case "post_text":
        case "post_image":
        case "pin_code":
            await bot.sendTextMessageTo( mod.text, recipientId)
        break;
        case "multiple_choice":
            msg.addText(mod.text)
            choices()
            await bot.sendMessage(msg)
        break;
        case "image":
            if(mod.text){
                await bot.sendTextMessageTo( mod.text, recipientId)
            }
            msg.addAttachmentFromUrl("image",mod.imageURL)
            choices()
            await bot.sendMessage(msg)
        break;
        case "video":
            if(mod.text){
                await bot.sendTextMessageTo( mod.text, recipientId)
            }
            msg.addAttachmentFromUrl("video",mod.videoURL)
            choices()
            await bot.sendMessage(msg)
        break;
        case "address_preview":
            user = await userService.getByUserId(user._id)
            if(mod.text){
                await bot.sendTextMessageTo( mod.text, recipientId)
            }
            await bot.sendTextMessageTo( "Address line 1: "+user.address1, recipientId)
            await bot.sendTextMessageTo( "Address line 2: "+user.address2, recipientId)
            msg.addText("PIN code: " + user.pinCode)
            choices()
            await bot.sendMessage(msg)
        break;
        case "post_preview":
            // update user 
            user = await userService.getByUserId(user._id)
            await bot.sendTextMessageTo( mod.text , recipientId )
            let buttons = [];
            let postText =""; //user[mod.postName].postText;
            let postAttachment = ""; //user[mod.postName].postAttachment
            if(mod.postName === "discovery"){
                postText = user.discovery.postText
                postAttachment = campaign.discovery.postAttachment
            }
            if(mod.postName === "unboxing"){
                postText = user.unboxing.postText
                postAttachment = user.unboxing.postAttachment
            }
            
            if(!user.longTermFBToken){
                buttons = [{
                        "type":"web_url",
                        "url":"https://www.facebook.com/v2.12/dialog/oauth?client_id=170456090262574&redirect_uri=https://task-spotting.herokuapp.com/users/fblogincallback&state="+user._id+"::"+mod.postName+"&scope=publish_actions,user_friends",
                        //"https://powerfulcove.localtunnel.me/fb_login.html?postName="+mod.postName+"&userId="+user._id,
                        "title":"Post now",
                        "webview_height_ratio": "tall",
                        }]
            }else{
                buttons = [{
                    "type":"postback",
                    title:"Post now",
                    "payload":"null"
                }]
            }

            mod.choices.forEach(c => {
                buttons.push({
                    "type":"postback",
                    "title":c.text,
                    "payload":c.nextModule || "null"
                })
            });
            msg.addAttachment({
                "type":"template",
                "payload":{
                "template_type":"generic",
                "elements":[{
                    "title":postText ,
                    "image_url":postAttachment,
                    "buttons":buttons
                }],
            

                }
            })      
            await bot.sendMessage(msg)
        break;
        case "carousel":
            if(mod.text){
                await bot.sendTextMessageTo( mod.text, recipientId)
            }
            choices()
            msg.addAttachment({
                "type":"template",
                "payload":{
                "template_type":"generic",
                "elements":mod.carouselElements.map(e=>{
                    return {
                        "title":e.title,
                        "subtitle":e.subtitle,
                        "image_url":e.imageURL,
                        "buttons":e.buttons.map(b=>{
                            return {
                                "type":(b.url)?"web_url":"postback",
                                "title":b.text,
                                "payload":b.nextModule || "null",
                            }
                        })
                    }
                }),
        
                }
            })
            await bot.sendMessage(msg)
        break;
    }


    function choices(){

        if(mod.choices.length !== 0){
            let quickReplies = mod.choices.map(c=>{
                return {
                    "content_type":"text",
                    "title":c.text,
                    "payload":c.nextModule || "null",
                }
            })
       
            msg.addQuickReplies(quickReplies)
        }
    }
    console.log("module send ", mod.modId)
    // update the last module send 
    await userService.update(recipientId,{"lastModule":mod.modId})

    if(mod.immediatelyGoToNextModule){
        let mod2 = find(campaign.modules, {modId:mod.nextModule || (mod.modId+1)})
        if(mod2.type === "await"){
            await userService.update(recipientId,{"lastModule":mod2.modId})
            return 
        }
    
        await sendModule(mod2, user)
        return 
    }
    
}

function splitResponse (str) {
    if (str.length <= FB_TEXT_LIMIT) {
      return [str]
    }

    return chunkString(str, FB_TEXT_LIMIT)
  }

  function chunkString (s, len) {
    let curr = len,
      prev = 0

    let output = []

    while (s[curr]) {
      if (s[curr++] == ' ') {
        output.push(s.substring(prev, curr))
        prev = curr
        curr += len
      } else {
        let currReverse = curr
        do {
          if (s.substring(currReverse - 1, currReverse) == ' ') {
            output.push(s.substring(prev, currReverse))
            prev = currReverse
            curr = currReverse + len
            break
          }
          currReverse--
        } while (currReverse > prev)
      }
    }
    output.push(s.substr(prev))
    return output
  }

  function sleep (delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), delay)
    })
  }
// https://www.facebook.com/v2.12/dialog/oauth?client_id=170456090262574&redirect_uri=https://task-spotting.herokuapp.com/users/fblogincallback&state=5a9717aea1758d00141620a1::discovery&scope=publish_actions