export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://fav-streamer-event-viewer.herokuapp.com'
  : 'https://localhost:8080'