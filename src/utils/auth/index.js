import VueJwtDecode from 'vue-jwt-decode'
import { api } from 'boot/axios'

export function isTokenExpired (token) {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!token) throw new Error('No token was provided to check expiry')
    const decoded = VueJwtDecode.decode(token)
    const tokenExpirationDate = new Date(decoded.exp * 1000)
    const today = new Date()
    return today > tokenExpirationDate
  } catch (e) {
    throw e
  }
}
export async function isValidToken (token) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post('/auth/check-token', { token })
    const { isValid } = response.data
    return isValid
  } catch (e) {
    throw e
  }
}
// @ts-ignore
export async function refreshToken () {
  try {
    const refreshToken = getRefreshTokenFromLocalstorage()
    if (!refreshToken) throw new Error('No refresh token was provided')
    const response = await api.post('/auth/refresh-token', { refreshToken })
    // @ts-ignore
    if (response.response && response.response.data.message === '[CONTROLLER ERROR] Error: Provided refresh token is expired') {
      return { tokenInvalid: true }
    }
    api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
    localStorage.setItem('access_token', response.data.access_token)
    return response.data.access_token
  } catch (e) {
    console.log('error', e)
    throw e
  }
}
export function getTokenFromLocalstorage () {
  return localStorage.getItem('access_token')
}
export function getRefreshTokenFromLocalstorage () {
  return localStorage.getItem('refresh_token')
}
