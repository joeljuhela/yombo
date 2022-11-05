import axios from 'axios'
                         
const register = async creds => {
    const baseUrl = `http://localhost:3000/api/v1/createYombo`
    const response = await axios.post(baseUrl, creds)
    return response.data
}

export default { register }