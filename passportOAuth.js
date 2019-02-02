const passport = require('passport');
const twitchStrategy = require("passport-twitch").Strategy;

const { TWITCH_CONFIG } = require('./config');

module.exports = () => {
    // Allowing passport to serialize and deserialize users into sessions
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
    const callback = (accessToken, refreshToken, profile, cb) => {
        //console.log(accessToken, refreshToken, profile)
        const userData = {
            name: profile.displayName,
            photo: profile._json.logo,
            token: accessToken
        };
        cb(null, userData);
    };
    passport.use(new twitchStrategy(TWITCH_CONFIG, callback));
}