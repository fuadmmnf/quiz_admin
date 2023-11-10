<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add Lecture</div>
        <div class="row">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            form="lectureForm"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            form="lectureForm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <q-form
      @submit.prevent="onSubmit"
      id="lectureForm"
      @reset="onReset"
      class="q-gutter-md q-mt-lg"
    >
      <div class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <!-- card with two columns-->
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-card class="no-shadow" bordered>
                  <!-- heading -->
                  <q-card-section class="row items-center justify-between">
                    <div class="text-h6">Lecture Details</div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="lectureData.title"
                          :label="`Title`"
                          :rules="[(val) => !!val || 'Title is required']"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="lectureData.description"
                          :label="`Lecture Description`"
                          @click="openLectureDescriptionTinyMceModal"
                          readonly
                        >
                          <template v-slot: append>
                            <tiny-mce-modal
                              ref="lectureDescriptionTinyMceModal"
                              v-model="lectureData.description"
                              @save="onDescriptionChange"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="lectureData.subject"
                          :label="`Subject `"
                          :rules="[(val) => !!val || 'Subject is required']"
                        />
                      </div>
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="lectureData.start_date"
                          :label="`Start Date`"
                          :rules="[(val) => !!val || 'Start Date is required']"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer q-ma-md">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="lectureData.start_date"
                                  mask="YYYY-MM-DD"
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                      size="sm"
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Add Lecture",
  components: {
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
  },

  setup() {
    const store = useStore();
    const { $q } = useQuasar();
    return {
      $q,
    };
  },
  data() {
    return {
      pageName: "Add Lecture",
      dense: true,
      name: "",
      model: "",
      expanded: false,
      lectureData: {
        title: "",
        description: "",
        subject: "",
        start_date: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitted");
      console.log(this.lectureData);
    },
    onReset() {
      console.log("Reset");
      this.lectureData = {
        title: "",
        description: "",
        subject: "",
        start_date: "",
      };
    },
    openLectureDescriptionTinyMceModal() {
      this.$refs.lectureDescriptionTinyMceModal.show = true;
    },
    onDescriptionChange(value, index, parentIndex) {
      this.lectureData.description = value;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      //   api
      //     .get("")
      //     .then((response) => {
      //       this.lectureData = response.data.data;
      //     });
    }
  },
});
</script>

<style></style>
