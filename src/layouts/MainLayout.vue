<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-img
          class="self-center"
          src="~assets/signature_icon.svg"
          spinner-color="white"
          style="height: 35px; max-width: 35px"
        />

        <q-toolbar-title> Signature collector</q-toolbar-title>

        <!--        <div>Right up here</div>-->
        <q-item
          clickable
          v-ripple
          class="text-white"
        >
          <q-item-section avatar>
            <q-icon
              name="login"
              class="text-white  rotate-180"
            />
          </q-item-section>

          <q-item-section>
            {{ getUser?.name }}
          </q-item-section>
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-if="isAuthenticated"
                @click="doLogout"
              >
                <q-item-section>Logout</q-item-section>
              </q-item>
              <q-item
                clickable
                v-else
                to="/login"
              >
                <q-item-section>Login</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-toolbar>
    </q-header>

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
  name: 'MainLayout',

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
