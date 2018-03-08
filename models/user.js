'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4');
const UserSchema = new Schema({

    recipientId: {type: String, unique: true},
    firstName: String, 
    lastName: String, 
    profilePic: String, 
    locale: String,
    timezone: Number,
    gender: String,
    lastModule:{
        type:Number,
        required:true,
        default:-1
    },
    activeCampaign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    },
    campaigns:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    }],
    email:{
        type:String,
        default:null
    },
    mobileNumber:{
        type:String,
        default:null
    },
    productImage:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null
    },
    city:{
        type:String,
        default:null
    },
    yearOfBirth:{
        type:String,
        default:null
    },
    address1:{
        type:String,
        default:null
    },
    address2:{
        type:String,
        default:null
    },
    sortTermFBToken:String,
    longTermFBToken:String,

    answers:[{
        questionText:{
            type:String,
            
        },
        questionName:{
            type:String
        },
        answer:{
            type:String,
            required:true
        }
    }],
    discovery:{
        postName:{
            type:String,
     
        },
        postId:{
            type:String,
        },
        postAttachment:{
            type:String
        },
        postText:{
            type:String
        }
    },
    unboxing:{
        postName:{
            type:String,
    
        },
        postId:{
            type:String,
        },
        postAttachment:{
            type:String
        },
        postText:{
            type:String
        }
    },

    userId:{
        type:String,
        required:true,
        default: uuidv4()
    },

    loginId:{
        type:String
    },

    friendsCount:{
        type:Number,
        default:null
    },
    pinCode:{
        type:String,
        default:null
    }

}, {
    timestamps: true
});



module.exports = mongoose.model('User', UserSchema);