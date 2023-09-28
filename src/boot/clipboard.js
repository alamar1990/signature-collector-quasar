import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(VueClipboard)
})
