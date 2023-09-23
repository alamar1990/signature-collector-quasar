<script setup lang="js">
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const $q = useQuasar()
const authStore = useAuthStore()

const { getUser } = storeToRefs(authStore)
const generatedLink = computed(() => getUser.value.generated_link)

console.log({ $q })
console.log({ generatedLink })

</script>

<template>
  <q-page class="flex flex-center">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
      <div class="q-gutter-md">
        <div class="row" style="max-width: 550px">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 q-gutter-sm q-py-md q-pl-md">
            <div class="col">
              <q-input
                filled
                clearable
                :loading="false"
                label="Public link *"
                v-model="generatedLink"
                readonly
              >
                <template #append>
                  <q-icon
                    name="refresh"
                    @click.stop.prevent=""
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>

            <div class="row">
              <div class="col q-gutter-y-sm q-pb-sm q-pr-sm">
            </div>
            <div class="full-width row wrap justify-around items-start content-start">
              <q-btn
                icon="check"
                label="Save"
                type="submit"
                color="primary"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
  </q-page>
</template>
