<script setup lang="js">
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { api } from 'boot/axios'

const $q = useQuasar()
const authStore = useAuthStore()

const isRefreshingPublicLink = ref(false)

const { getUser } = storeToRefs(authStore)
const generatedLink = computed(() => getUser.value.generated_link)
const fullPastableLink = computed(() => `${new URL(window.location.origin).origin}/sign/${generatedLink.value}`)

const onCopyToClipboardSuccess = () => {
  $q.notify({
    color: 'green',
    position: 'top',
    icon: 'check_circle',
    message: 'Copied to clipboard'
  })
}

const onCopyToClipboardError = () => {
  $q.notify({
    color: 'negative',
    icon: 'warning',
    position: 'top-right',
    message: 'Error copying to clipboard'
  })
}

async function updatePublicLink () {
  try {
    isRefreshingPublicLink.value = true
    if (!getUser.value.generated_link) return console.log('There is no generated link')

    const { data: requestResult } = await api.post('/client/refresh-public-link', {
      public_link: getUser.value.generated_link
    })

    await authStore.init()
    if (requestResult.generated_link) {
      $q.notify({
        color: 'green',
        position: 'top',
        icon: 'check_circle',
        message: 'Public link updated'
      })
    }
    isRefreshingPublicLink.value = false
  } catch (e) {
    console.error(e)
    $q.notify({
      color: 'negative',
      icon: 'warning',
      position: 'top-right',
      message: e.message
    })
    isRefreshingPublicLink.value = false
  }
}

</script>

<template>
  <q-page class="flex flex-center">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
      <div class="q-gutter-md">
        <div class="row" style="max-width: 550px">
          <div class="flex column col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 q-gutter-sm q-py-md q-pl-md">
            <div class="self-center text-blue-8">{{ getUser.name || 'No name'  }}</div>
            <div class="self-center q-ml-md">{{ `Here you can update your public link`  }}</div>

            <div class="flex row self-center content-center items-center">
              <div>
                <div class="self-center text-amber-8">{{ fullPastableLink  }}</div>
              </div>
              <div class="self-center items-center content-center">
                <q-btn round dense flat icon="content_copy"
                       :disable="isRefreshingPublicLink"
                       v-clipboard:copy="fullPastableLink"
                       v-clipboard:success="onCopyToClipboardSuccess"
                       v-clipboard:error="onCopyToClipboardError"
                />
                <q-btn round dense flat icon="refresh"
                       :disable="isRefreshingPublicLink"
                       @click.stop.prevent="updatePublicLink"
                       class="cursor-pointer" />
              </div>
            </div>

<!--            <div class="full-width row wrap justify-around items-start content-start">-->
<!--              <q-btn-->
<!--                icon="check"-->
<!--                label="Save"-->
<!--                type="submit"-->
<!--                color="primary"-->
<!--              />-->
<!--            </div>-->

        </div>

      </div>
    </div>
    </div>
  </q-page>
</template>
