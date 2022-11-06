import axios from 'axios'
import config from '../config.js'
import store from '@/store'

const authHead = {
  headers: {
    authorization: `Bearer ${store.state.token}`,
  },
}
                         
const getStatistics = async () => {
  const res = await axios.get(`${config.apiBase}/statistics`, authHead)
  return res.data
}

export default { getStatistics }
