const mongoose = require("mongoose")
const User = require("../models/user")

exports.getUserByRecipientId = (recipientId)=>{

    return User.findOne({"recipientId":recipientId}).populate("activeCampaign modules")
}
/**
 * 
 * @param {Object} userInfo 
 */
exports.create = (userInfo)=>{

    newUser = new User({
        recipientId: userInfo.id,
        firstName: userInfo.first_name, 
        lastName: userInfo.last_name, 
        profilePic: userInfo.profile_pic, 
        locale: userInfo.locale,
        timezone: userInfo.timezone,
        gender: userInfo.gender,
        activeCampaign: userInfo.campaignId,
        campaigns:[userInfo.campaignId]
    })

    return newUser.save()
}

exports.getUsers = ()=>{
    return User.find({}).limit(20) //.populate("campaigns")
}

exports.update = (recipientId, fields)=>{

    return User.update({recipientId:recipientId},{$set:fields})

}


exports.addAnswer = (recipientId, answer)=>{

    return User.update({recipientId:recipientId},{$push:{"answers":answer}})

}

exports.get = (recipientId)=>{

    return User.findOne({recipientId:recipientId}).populate("campaigns")

}


exports.getByUserId = (userId)=>{

    console.log("user id ", userId)
    return User.findOne({"_id":mongoose.Types.ObjectId(userId)}).populate("activeCampaign")

}