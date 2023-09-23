<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'App',
  mounted () {
    console.log('VUE_APP_API_BASE_URL', process.env.VUE_APP_API_BASE_URL)
  },
  beforeCreate () {
    this.authStore.init() // Auth step 1 on reload
  },
  setup () {
    const authStore = useAuthStore()
    return {
      authStore
    }
  }
})
</script>
