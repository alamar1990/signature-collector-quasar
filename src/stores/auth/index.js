import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { getTokenFromLocalstorage } from 'src/utils/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: '',
    isAuthenticated: false
  }),
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user
  },
  actions: {
    async doLogin ({ email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const { data } = await api.post('/auth/login', {
          email,
          password
        })
        const { accessToken, refreshToken } = data.tokens
        this.setToken(accessToken)
        this.setRefreshToken(refreshToken)
        api.defaults.headers.common.Authorization = 'Bearer ' + accessToken
        const user = await this.getUserByToken(accessToken)
        this.setUser(user)
      } catch (e) {
        throw e
      }
    },
    doLogout () {
      this.removeToken()
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('refresh_token')
      this.user = {}
    },
    setToken (token) {
      this.token = token
      this.isAuthenticated = true
      window.localStorage.setItem('access_token', token)
    },
    setRefreshToken (refreshToken) {
      window.localStorage.setItem('refresh_token', refreshToken)
    },
    removeToken () {
      this.token = ''
      this.isAuthenticated = false
    },
    setUser (user) {
      this.user = user
    },
    async getUserByToken (token) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await api.post('/auth/get-user', { token })
        const { user } = response.data
        return user
      } catch (e) {
        throw e
      }
    },
    async init () {
      const token = getTokenFromLocalstorage()
      if (token) {
        this.setToken(token)
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        const user = await this.getUserByToken(token)
        this.setUser(user)
        return
      }
      this.removeToken()
    }
  }
})
