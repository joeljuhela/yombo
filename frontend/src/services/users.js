import axios from 'axios'
import config from '../config.js'
                         
const register = async creds => {
  const baseUrl = `${config.apiBase}/createYombo`
  const response = await axios.post(baseUrl, creds)
  return response.data
}

const login = async creds => {
  const response = await axios.post(`${config.apiBase}/login`, creds)
  return response.data.authToken
}

const getYomboNick = async accessToken => {
  console.log(accessToken)
  const response = await axios.get(`${config.apiBase}/yomboNick`, {params: {accessToken}})
  return response.data.yomboNick
}

export default { register, getYomboNick, login }
