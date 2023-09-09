import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  const appConfig = {
    mode: undefined
  }

  appConfig.mode = process.env.MODE
  appConfig.apiBaseUrl = process.env.VUE_APP_API_BASE_URL || 'http://localhost:6009/api/v1'

  app.config.globalProperties.$appConfig = appConfig
})
