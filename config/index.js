module.exports = {
    DB_URL: process.env.DB_URL,
    HOST:process.env.HOST,

      twitterSettings : {
        credentials: {
          consumerKey: process.env.TWIT_CUSTOMER_KEY,
          consumerSecret: process.env.TWIT_CUSTOMER_SECRET,
          accessToken: process.env.TWIT_ACCESS_TOKEN,
          accessTokenSecret: process.env.TWIT_ACCESS_TOKEN_SECRET,
        }
      }
      
      
}
