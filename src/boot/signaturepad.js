import SignaturePad from 'vue-signature-pad'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(SignaturePad)
})
