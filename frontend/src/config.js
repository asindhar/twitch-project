//Configuration file for client

export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://fav-streamer-event-viewer.herokuapp.com'
  : 'http://localhost:8080'