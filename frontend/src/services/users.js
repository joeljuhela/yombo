import axios from 'axios'
import config from '../config.js'
                         
const register = async creds => {
  console.log(creds)
  const baseUrl = `http://localhost:3000/api/v1/createYombo`
  const response = await axios.post(baseUrl, creds)
  return response.data
}

export default { register }
