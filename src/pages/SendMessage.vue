<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="showDialog" :position="'top'">
      <q-card flat bordered class="my-card" style="width: 60%">
        <q-card-section>
          <div class="text-h6">Select receiver</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-select
              filled
              v-model="dialogResult"
              input-debounce="0"
              :options="receiverOptions"
              stack-label
              use-input
              @filter="dialogFilterFn"
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
              Selected: {{ dialogResult }}
            </q-badge>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
              <div class="text-h6">{{ dialogResult }}</div>
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
import { onMounted, ref, watch } from "vue";

const stringOptions = ["Sultana", "Marjan", "Mitu"];
const receiverOptions = ["abc", "def", "ghi"];

export default {
  setup() {
    const options = ref(stringOptions);
    const dialogReceiverOptions = ref(receiverOptions);
    const showDialog = ref(false);
    const dialogResult = ref([]); // Define dialogResult as a ref

    onMounted(() => {
      showDialog.value = true;
    });

    // Watch for changes in dialogResult
    watch(dialogResult, (newResult) => {
      if (newResult !== "") {
        showDialog.value = false;
      }
      console.log("dialogResult:", newResult);
    });

    const receiverOption = ref("all");
    const modelMultiple = ref([]);

    return {
      receiverOption,
      modelMultiple,
      dialogResult,
      showDialog,
      stringOptions,
      options,
      dialogReceiverOptions,
      receiverOptions,

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

      dialogFilterFn(val, update) {
        if (val === "") {
          update(() => {
            dialogReceiverOptions.value = receiverOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          dialogReceiverOptions.value = receiverOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>

<!-- <script>
import { onMounted, ref, watch } from "vue";

const stringOptions = ["Sultana", "Marjan", "Mitu"];
const receiverOptions = ["abc", "def", "ghi"];

export default {
  setup() {
    const options = ref(stringOptions);
    const dialogReceiverOptions = ref(receiverOptions);
    const showDialog = ref(false);

    onMounted(() => {
      showDialog.value = true;
    });
    watch(dialogResult, (newResult) => {
      if (newResult !== "") {
        closeDialog();
      }
    });
    return {
      receiverOption: ref("all"),
      modelMultiple: ref([]),
      dialogResult: ref([]),
      showDialog,
      stringOptions,
      options,

      dialogReceiverOptions,
      receiverOptions,

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

      dialogFilterFn(val, update) {
        if (val === "") {
          update(() => {
            dialogReceiverOptions.value = receiverOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          dialogReceiverOptions.value = receiverOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script> -->
