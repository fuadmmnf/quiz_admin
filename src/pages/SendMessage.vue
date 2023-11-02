<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Send Message
          <div class="text-subtitle2">Mail to all or specific user</div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Send" icon="send" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-card class="no-shadow" bordered>
            <q-card-section class="row items-center justify-between">
              <div class="text-h6">Receiver Configuration</div>
            </q-card-section>
            <q-card-section>
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="receiverOption" val="all" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>All Users</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio
                      v-model="receiverOption"
                      val="custom"
                      color="orange"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Custom Users</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-if="receiverOption == 'custom'">
                <q-select
                  filled
                  v-model="modelMultiple"
                  input-debounce="0"
                  multiple
                  :options="options"
                  use-chips
                  stack-label
                  use-input
                  @filter="filterFn"
                  label="Select Users"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-badge color="secondary" class="q-mb-md">
                  Selected: {{ modelMultiple || "[]" }}
                </q-badge>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6">
          <q-card class="no-shadow" bordered>
            <q-card-section class="row items-center justify-between">
              <div class="text-h6">Template Configuration</div>
            </q-card-section>
            <q-card-section> </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

const stringOptions = ["Sultana", "Marjan", "Mitu"];

export default {
  setup() {
    const options = ref(stringOptions);

    return {
      receiverOption: ref("all"),
      modelMultiple: ref([]),
      stringOptions,
      options,

      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options.value = stringOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
