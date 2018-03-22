import axios from 'axios'

const api = axios.create({
    headers: {
      'Content-Type': 'application/json'
    },
    baseUrl: 'http://localhost:8080/'
  })

export default api