<template>
  <q-page
    class="window-height window-width row justify-center items-center"
  >
    <div class="column q-pa-lg">
      <div class="row q-py-md justify-center">
        <q-img
          src="~assets/signature_icon.svg"
          spinner-color="black"
          style="height: 80px; max-width: 80px; background: #002865; border-radius: 10%"
        />
      </div>
      <div class="row items-center">
        <q-card square class="shadow-24 bordered-radius" style="width:300px;height:410px;">
          <q-card-section class="bg-grey-9">
            <h4 class="text-h5 text-white q-my-xs">
              Register
            </h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm">
              <q-input v-model="fullName" square clearable type="text" label="Full name">
                <template #prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input v-model="email" square clearable type="email" label="Email">
                <template #prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input v-model="password" square clearable type="password" label="Password">
                <template #prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input v-model="passwordRetype" square clearable type="password" label="Repeat password">
                <template #prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="primary" class="full-width text-white" label="Submit"
                   @click="submitForm"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import { ROUTES } from 'src/router/routes'

export default {
  setup () {
    const authStore = useAuthStore()
    return {
      authStore,
      submitting: ref(false),
      identity: ref(''),
      fullName: ref(''),
      email: ref(''),
      password: ref(''),
      passwordRetype: ref(''),
      isPassword: ref(true),
      rememberPassword: ref(false),
      dialog: ref(false),
      message: ''
    }
  },
  mounted () {
    // $q = useQuasar()
    console.log(this.$api.defaults.baseURL)
  },
  methods: {
    async submitForm () {
      if (!this.email || !this.password) {
        this.$q.notify({
          type: 'negative',
          message: 'Invalid input data'
        })
        return
      }
      if (this.password.length < 6) {
        this.$q.notify({
          type: 'negative',
          message: 'The password must be 6 characters at least'
        })
        return
      }
      if (this.password !== this.passwordRetype) {
        this.$q.notify({
          type: 'negative',
          message: 'The passwords should match'
        })
        return
      }
      try {
        const { emailCreated } = await this.authStore.doRegister({
          email: this.email, password: this.password, name: this.fullName
        })
        if (!emailCreated) throw new Error('Error creating user')
        const toPath = ROUTES.Login.staticPath
        this.$router.push(toPath)
      } catch (err) {
        console.log(err)
        this.$q.notify({
          type: 'negative',
          message: err
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordered-radius {
  border-radius: 10px !important;
}
</style>
