const userService = require("../../services/user")
const companyService = require("../../services/company")
const campaignService = require("../../services/campaign")
module.exports  = {
    type: 'incoming',
    name: 'get-user-and-campaign',
    controller: async (bot, update, next) => {

      let campaign;
      let userInfo;
      console.log("update ",update)

      // get user form the DB
      update.user = await userService.getUserByRecipientId(update.sender.id)
      
      // if there is no user
      // check if new user
      if(!update.user || update.user.length === 0){

        // if user clicked the get started button and there is a referral
        if(update.postback && update.postback.payload === "GET_STARTED" && update.postback.referral
        /* && update.postback.referral.source === "ADS" */){
              
              [campaign,userInfo] = await Promise.all([campaignService.getCampaignByReferralRef(update.postback.referral.ref), 
                bot.getUserInfo(update.sender.id)])
              console.log("new user ")

        }else{


          userInfo = await bot.getUserInfo(update.sender.id)

          // this user is not coming through an ad
          if(!userInfo.last_ad_referral /* || update.postback.referral.source !== "ADS" */){
            // void there is no referral
            console.log("No referral ---")
            return 'skip';  
          }

          console.log("new user ")
          campaign = await campaignService.getCampaign(last_ad_referral.ref)

        }


          if(!campaign || !campaign.active){
            return 'skip';
          }
    
          userInfo.campaignId = campaign._id
          // we should check for add_id here
          update.user = await userService.create(userInfo)
    
          update.user.activeCampaign = campaign
    
          // send campaign's welcome message
          if(campaign.welcomeMessage){
            // await bot.reply(update, "Hey! "+userInfo.first_name+ " 😀")
            await bot.reply(update, campaign.welcomeMessage.replace("{FIRST_NAME}",update.user.first_name))
          }


      }


      // if there is no active campaign (in case the user finished the last conversation)
      // do nothing
      if(!update.user.activeCampaign){
        return 'skip'; 
      }


    }// end middleware

};
