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

        </q-item>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
// import { symOutlinedSignature } from '@quasar/extras/material-symbols-outlined'
export default defineComponent({
  name: 'MainLayout',

  components: {
  },
  methods: {

  },

  setup () {
    return {

    }
  }
})
</script>
