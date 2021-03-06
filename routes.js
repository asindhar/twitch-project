const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path')

// Setting up the passport middleware
const twitchAuth = passport.authenticate('twitch');

const addSocketId = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next();
}

const twitch = (req, res) => {
    const io = req.app.get('io')
    const user = { 
      name: req.user.name,
      photo: req.user.photo,
      token: req.user.token
    }
    io.in(req.session.socketId).emit('twitch', user)
}


// Route triggered by the React client
router.get('/twitch', addSocketId, twitchAuth);
// Route triggered by callbacks from twitch once 
// the user has authenticated successfully
router.get('/twitch/callback', twitchAuth, twitch)

// Anything that doesn't match the above, send back index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
  })

module.exports = router;

