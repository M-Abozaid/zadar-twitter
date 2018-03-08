module.exports = {
    DB_URL: process.env.DB_URL,
    HOST:process.env.HOST,
    messengerSettings : {
        credentials: {
          verifyToken: process.env.FB_VERIFY_TOKEN, 
          pageToken: process.env.FB_PAGE_ACCESS_TOKEN,
          fbAppSecret: process.env.FB_APP_SECRET,
        },
        webhookEndpoint: '/webhook321',
      },
      twitterSettings : {
        credentials: {
          consumerKey: process.env.TWIT_CUSTOMER_KEY,
          consumerSecret: process.env.TWIT_CUSTOMER_SECRET,
          accessToken: process.env.TWIT_ACCESS_TOKEN,
          accessTokenSecret: process.env.TWIT_ACCESS_TOKEN_SECRET,
        }
      }
      
      
}
