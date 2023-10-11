<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from 'stores/auth'

export default defineComponent({
  name: 'App',
  mounted () {
    console.log('PROCESS', process.env)
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
