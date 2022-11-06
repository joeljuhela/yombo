import axios from "axios"
import config from "@/config"
import store from "@/store"

const getDailyTask = async (category, points) => {
  const baseUrl = `${config.apiBase}/dailyTask`
  const response = await axios.get(baseUrl, { 
    params: { category, lessPointsThan: points },
    headers: {
      Authorization: `bearer ${store.state.token}`
    }
  })
  return response.data
}

const createSubmission = async (taskId, succeeded, answerText) => {
  const baseUrl = `${config.apiBase}/createSubmission`
  const response = await axios.post(baseUrl, {
      taskId,
      succeeded,
      answerText
    },
    {
      headers: {
        Authorization: `bearer ${store.state.token}`
      }
    }
  )
  return response.data
}

export default { getDailyTask, createSubmission }