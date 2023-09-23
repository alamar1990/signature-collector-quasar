<script setup>
import { computed, onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

const $q = useQuasar()
const { params } = useRoute()

const signaturePad = ref(null)
const isValidLink = ref(false)
const imgs = ref([])
const hex = ref('#000')
const fullName = ref(null)
const signatureString = ref(null)
const options = computed(() => {
  return {
    penColor: hex
  }
})

onMounted(async () => {
  try {
    const { data: result } = await api.post('/user/valid-link', {
      link: params.public_link
    })

    isValidLink.value = result.valid
    console.log({ result: isValidLink.value })
  } catch (e) {
    console.error(e)
  }

  console.log({ params })
})

const undo = () => {
  signaturePad.value.undoSignature()
}

async function save () {
  const { isEmpty, data } = signaturePad.value.saveSignature()

  console.log(isEmpty)

  if (isEmpty) {
    $q.notify({
      color: 'negative',
      position: 'top',
      icon: 'announcement',
      message: 'Fill out signature in the box'
    })
    return
  }

  if (!fullName.value) {
    $q.notify({
      color: 'negative',
      icon: 'announcement',
      position: 'top',
      message: 'Fill out the full name'
    })
    return
  }

  signatureString.value = data

  try {
    const { data: requestResult } = await api.post('/client', {
      name: fullName.value,
      address: '',
      phone: '',
      s_ssn: '',
      file: signatureString.value
    })

    console.log({ requestResult })
    if (requestResult.result.code === 200) {
      $q.notify({
        color: 'green',
        position: 'top-right',
        icon: 'check_circle',
        message: 'Signature saved'
      })
      clearDataAndResetApp()
    }
  } catch (e) {
    console.error(e.response.data.result.message)
    $q.notify({
      color: 'negative',
      icon: 'warning',
      position: 'top-right',
      message: e.response.data.result.message
    })
  }
}

function clearDataAndResetApp () {
  signaturePad.value.clearSignature()
  fullName.value = null
  signatureString.value = null
  imgs.value = []
  hex.value = '#000'
}

</script>

<template>
  <q-page class="flex flex-center">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
      <div class="q-gutter-md">
        <div class="row" style="max-width: 550px">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 q-gutter-sm q-py-md q-pl-md">
            <p> Important Notice: Your signature is a unique and personal identifier. By using our signature collection app, you acknowledge that you are sharing your signature at your own risk. Please exercise caution and discretion when sharing your signature electronically. We take every measure to protect your data, but it is essential to be aware of potential risks associated with digital signature sharing. Thank you for understanding and using our app responsibly.</p>
            <q-separator />
            <div class="col">
              <q-input
                v-model="fullName"
                filled
                clearable
                label="Full name *"
                lazy-rules
              />
            </div>

            <div class="row">
              <div class="col q-gutter-y-sm q-pb-sm q-pr-sm">
                <VueSignaturePad
                  id="signature"
                  ref="signaturePad"
                  :images="imgs"
                  :options="options"
                  class=""
                  style="min-height: 10em; max-height: 10em; max-width: 40em; display: flex; justify-content: center;"
                />
              </div>
            </div>
            <div class="full-width row wrap justify-around items-start content-start">
              <q-btn
                icon="undo"
                label="Undo"
                type="submit"
                color="secondary"
                @click="undo"
              />
              <q-btn
                icon="send"
                label="Send"
                type="submit"
                color="primary"
                @click="save"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
  radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>