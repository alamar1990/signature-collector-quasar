<script setup>
import { computed, ref } from 'vue'

const signaturePad = ref(null)

const imgs = ref([])
const hex = ref('#000')

const options = computed(() => {
  return {
    penColor: hex
  }
})

const undo = () => {
  signaturePad.value.undoSignature()
}

async function save () {
  const { isEmpty, data } = signaturePad.value.saveSignature()
  console.log(isEmpty)
  console.log(data)
}
</script>

<template>
  <q-page class="flex flex-center">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">

      <div class="q-gutter-md">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 q-gutter-sm q-py-md q-pl-md">
            <p> Important Notice: Your signature is a unique and personal identifier. By using our signature collection app, you acknowledge that you are sharing your signature at your own risk. Please exercise caution and discretion when sharing your signature electronically. We take every measure to protect your data, but it is essential to be aware of potential risks associated with digital signature sharing. Thank you for understanding and using our app responsibly.</p>
            <q-separator />
            <div class="col">
              <q-input
                filled
                clearable
                label="Full name *"
                lazy-rules
              />
            </div>

            <div class="row">
              <div class="col q-gutter-y-sm q-pb-sm q-pr-sm ">
                <VueSignaturePad
                  id="signature"
                  ref="signaturePad"
                  :images="imgs"
                  :options="options"
                  class=""
                  style="min-height: 10em; max-height: 10em; max-width: 40em"
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
