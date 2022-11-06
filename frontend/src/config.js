const env = process.env.NODE_ENV || 'development'

export default {
  apiBase: env.toLowerCase() === 'production'
    ? process.env.VUE_APP_PUBLIC_URL + '/api/v1'
    : 'http://localhost:3000/api/v1'
}
