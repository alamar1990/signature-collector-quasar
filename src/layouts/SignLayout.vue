<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'SignLayout',

  components: {
  },
  methods: {
    doLogout () {
      this.authStore.doLogout()
      this.$router.push('/login')
    }
  },

  setup () {
    const authStore = useAuthStore()
    const { isAuthenticated, getUser } = storeToRefs(authStore)

    const leftDrawerOpen = ref(false)

    return {
      authStore,
      getUser,
      isAuthenticated,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
