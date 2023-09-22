import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { refreshToken } from 'src/utils/auth'
const api = axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL })

export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  api.interceptors.response.use(response => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const access_token = await refreshToken()
        if (access_token.tokenInvalid) {
          router.push('/login')
        }
        error.config.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)
      }

      return error
    }
  )
})

export { api }
