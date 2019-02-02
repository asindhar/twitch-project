
exports.CLIENT_ORIGIN = ['http://127.0.0.1:3000', 'http://localhost:3000']

const CALLBACK_URL = process.env.NODE_ENV === 'production' 
  ? 'https://fav-streamer-event-viewer.herokuapp.com/twitch/callback'
  : 'http://localhost:8080/twitch/callback'

exports.TWITCH_CONFIG = {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: "user_read chat:edit"
}