import axios from 'axios'
const token = localStorage.getItem('token')

export default axios.create({
  baseURL: 'http://dev.api.paul.ro:8000/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
  }
})
