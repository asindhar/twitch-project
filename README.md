# Twitch-Stream-Channel
A simple app that authenticates the user with their twitch account to view live stream of their favourite channel. User can also post chat to the channel and view top 10 recent videos.

App **version** 1.0  is live on https://fav-streamer-event-viewer.herokuapp.com/ 

Technology Stack: Express, React and NodeJS
*** 

## Table of Contents
* [Overview](#overview)
* [Getting Started](#getting-started)
* [Tests](#tests)
* [Technologies Used](#technologies-used)
* [Authors](#authors)
* [Acknowledgments](#acknowledgments)
* [Deployment](#deployment)
* [Future improvements](#future-improvements)
* [Questions on Scaling](#questions-on-scaling)

## Overview
This app uses Oauth authentication for logging in users with their Twitch account. App takes an input for favourite channel then provides a live stream of the input channel along the chat box. The user can also view channel's top 10 videos.

## Getting started
### Development Environment
* The client side of project is created with create-react-app
* Open terminal window 
```
$ git clone https://github.com/asindhar/twitch-project.git 
$ cd twitch-project
$ npm install package.json (To install node packages for server)
$ cd frontend
$ npm install package.json (To install node packages for client)
$ cd ..
$ touch .env
```

* Open .env file in your favourite editor and add following:
```
### Twitch keys ###
TWITCH_CLIENT_ID=Your twitch client ID
TWITCH_CLIENT_SECRET=Your twitch client secret

### Session key ###
SESSION_SECRET='Any-session-secre-key'
```

* You may want to change configurations in config.js(in root directory) for server and config.js(in frontend folder) for client

* To start project on localhost
```
$ node server.js
(Starts server and you will see in terminal: Server is running on port 8080 ...)
*To start client side
$ cd frontend
$ npm start
```

## Test
* Pending

## Technologies/Libraries Used
* Javascript
* HTML
* CSS
* Node.js
* Express
* React
* React Router
* PassportJS
* Axios
* FontAwesome
* FlexView

## Authors
* Amandeep Sindhar (https://github.com/asindhar)

## Acknowledgments
* React training provides a good documentation on React Router https://reacttraining.com/react-router/
* Blog that inspired me to implement socket for authentication instead of api https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105
* passport-twitch http://www.passportjs.org/packages/passport-twitch/

## Deployment
This app is currently deployed on **Heroku** using free dynos. Heroku provides an easy and fast approach to deploy. Heroku documentation can be followed for hosting this app.
https://fav-streamer-event-viewer.herokuapp.com/ 

## Future Improvements
* App version 1.0 do not use any database. Database like MongoDB can be used to save the user data retrieved from Twitch authentication and then ckient interact with server for checking user details.
* Twitch requires the authentication token to be revalidated by providing refresh token and expiration time. App v1.0 did not implement this part where refresh token can be used to get new authentication token before expiration time.
* App is currently hosted on Heroku free dynos that means uptime is not gurranted. So, If required can be hosted on PaaS

## Questions on Scaling
* How would you deploy the above on AWS? (ideally a rough architecture diagram will help)
The app can be deployed on AWS EC2 instance. Docker can be used for consistentcy and testing the image on local and then deploying on AWS.
Cient and server can be installed on same instance of EC2. Then, Nginx can be used as routed/middleware between outside traffic and Client/Server.

* Where do you see bottlenecks in your proposed architecture and how would you approach scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?
The app could be easily scaled on AWS by using Amazon Elastic Load Balancer (ELB)

![alt architecture](ArchitectureAWS.jpg?raw=true "ArchitectureAWS")
