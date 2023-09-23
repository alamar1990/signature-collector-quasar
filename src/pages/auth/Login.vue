<template>
  <q-page
    class="window-height window-width row justify-center items-center"
  >
    <div class="column q-pa-lg">
      <div class="row q-py-md justify-center">
        <q-img
          src="~assets/signature_icon.svg"
          spinner-color="black"
          style="height: 100px; max-width: 100px; background: #002865; border-radius: 50%"
        />
      </div>
      <div class="row items-center">
        <q-card square class="shadow-24 bordered-radius" style="width:300px;height:350px;">
          <q-card-section class="bg-grey-9">
            <h4 class="text-h5 text-white q-my-md">
              Login
            </h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm">
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
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="primary" class="full-width text-white" label="Sign In"
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

export default {
  setup () {
    const authStore = useAuthStore()
    return {
      authStore,
      submitting: ref(false),
      identity: ref(''),
      email: ref(''),
      password: ref(''),
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
      try {
        await this.authStore.doLogin({
          email: this.email, password: this.password
        })
        const toPath = this.$route.query.to || '/'
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
