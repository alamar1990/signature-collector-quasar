<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
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
          </q-item-section>
          <q-menu auto-close>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                to="/login"
              >
                <q-item-section>Login</q-item-section>
              </q-item>
              <q-item
                clickable
              >
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-grey-8"
    >
      <q-list dark>
        <q-item-label header>
          Let's see ...
        </q-item-label>
        <q-item
          clickable
          to="/protected"
        >
          <q-item-section avatar>
            <q-icon name="lock" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Protected</q-item-label>
            <q-item-label caption>
              Protected route
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          to="/form"
        >
          <q-item-section avatar>
            <q-icon name="feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Form</q-item-label>
            <q-item-label caption>
              Parse
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',

  components: {
  },
  methods: {

  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
