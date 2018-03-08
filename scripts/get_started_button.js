
var config = require("../config")

const MessengerBot = require('botmaster-messenger');
const messengerBot = new MessengerBot(config.messengerSettings);
messengerBot._setGetStartedButton("GET_STARTED",true)
