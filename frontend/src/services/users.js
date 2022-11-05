import axios from 'axios'
import config from '../config.js'
                         
const register = async creds => {
    const baseUrl = `${config.apiBase}/api/v1/createYombo`
    const response = await axios.post(baseUrl, creds)
    return response.data
}

export default { register }
