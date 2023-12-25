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
                        <q-select
                          filled
                          v-model="lectureData.subject_id"
                          :label="`Subject`"
                          :options="subjectOptions"
                          emit-value
                          map-options
                        />
                      </div>
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="lectureData.start_date"
                          :label="`Start Time`"
                          :rules="[(val) => !!val || 'Start time is required']"
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
                                  mask="YYYY-MM-DD HH:mm"
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-time
                                  v-model="lectureData.start_date"
                                  mask="YYYY-MM-DD HH:mm"
                                  format24h
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="lectureData.zoom_link"
                          :label="`Zoom Link`"
                          type="url"
                          hint="https://example.com"
                          :rules="[(val) => !!val || 'Url is required']"
                        />
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
import {
  createLectureClass,
  editLectureClass,
} from "src/services/course_services";

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
    const courseId = ref("");
    return {
      courseId,
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
        subject_id: "",
        start_date: "",
        zoom_link: "",
      },
      subjectOptions: [],
    };
  },
  methods: {
    async onSubmit() {
      console.log("Submitted");
      console.log(this.courseId);
      console.log(this.lectureData);
      if (this.$route.params.id) {
        // const lectureId = this.$route.params.id;
        // const { data, status, error } = await editLectureClass(lectureId, {
        //   subject_id: this.courseData.subject_id,
        //   title: this.courseData.title,
        //   description: this.courseData.description,
        //   num_classes: this.courseData.number_of_classes,
        //   num_exams: this.courseData.number_of_exams,
        //   coordinator_name: this.courseData.co_ordinator_name,
        //   coordinator_number: this.courseData.co_ordinator_phone,
        //   intro_video: "https://www.youtube.com/watch?v=9JSYB59QmZw",
        // });
        //
        // if (status === 200) {
        //   this.$q.notify({
        //     message: "Lecture updated Successfully",
        //     color: "positive",
        //     icon: "check",
        //   });
        // } else {
        //   console.error(error);
        // }

        api
          .patch(`/courses/${this.$route.params.id}`, {
            subject_id: this.courseData.subject_id,
            title: this.courseData.title,
            description: this.courseData.description,
            num_classes: this.courseData.number_of_classes,
            num_exams: this.courseData.number_of_exams,
            coordinator_name: this.courseData.co_ordinator_name,
            coordinator_number: this.courseData.co_ordinator_phone,
            intro_video: "https://www.youtube.com/watch?v=9JSYB59QmZw",
          })
          .then((response) => {
            console.log(response);
            this.$q.notify({
              message: "Course updated Successfully",
              color: "positive",
              icon: "check",
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.onReset();
          });
      } else {
        const { data, status, error } = await createLectureClass({
          course_id: this.courseId,
          title: this.lectureData.title,
          description: this.lectureData.description,
          link: this.lectureData.zoom_link,
          start_time: this.lectureData.start_date,
          subject_id: this.lectureData.subject_id,
        });

        if (status === 201) {
          this.$q.notify({
            message: "Lecture class Added Successfully",
            color: "positive",
            icon: "check",
          });
          this.onReset();
        } else {
          console.error(error);
        }
      }
    },
    onReset() {
      console.log("Reset");
      this.lectureData = {
        title: "",
        description: "",
        subject_id: "",
        start_date: "",
        zoom_link: "",
      };
    },
    openLectureDescriptionTinyMceModal() {
      this.$refs.lectureDescriptionTinyMceModal.show = true;
    },
    onDescriptionChange(value, index, parentIndex) {
      this.lectureData.description = value;
    },
    getSubjects() {
      api.get("/categories/subject").then((response) => {
        response.data.data.map((category) => {
          this.subjectOptions.push({
            label: category.name,
            value: category.id,
          });
        });
      });
    },
  },
  mounted() {
    this.getSubjects();
    this.courseId = this.$route.params.courseId;
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
