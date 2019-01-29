
exports.CLIENT_ORIGIN = ['http://127.0.0.1:3000', 'http://localhost:3000']
 
exports.TWITCH_CONFIG = {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/twitch/callback',
    scope: "user_read chat:edit"
}