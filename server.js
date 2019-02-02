// for saving secret keys
require('dotenv').config();
const {CLIENT_ORIGIN} = require('./config.js');

const express = require('express');
const http = require('http');
const axios = require("axios");
const socketio = require('socket.io');
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const path = require('path')

//set default port
const port = process.env.PORT || 8080;
const routes = require('./routes')
const OAuth = require('./passportOAuth')

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')))

// Setup for passport and to accept JSON objects
app.use(express.json());
app.use(passport.initialize());
OAuth();

// Accept requests from the client
app.use(cors({
    origin: CLIENT_ORIGIN
}))

app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true 
}))

const server = http.createServer(app);
const io = socketio(server);
app.set('io', io);

app.use('/',routes);


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})