<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit course</div>
        <div class="row">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            form="courseForm"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            form="courseForm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <q-form
      @submit.prevent="onSubmit"
      id="courseForm"
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
                    <div class="text-h6">Course Details</div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="courseData.title"
                          :label="`Title`"
                          :rules="[(val) => !!val || 'Title is required']"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="courseData.description"
                          :label="`Course Description`"
                          @click="openCourseDescriptionTinyMceModal"
                          readonly
                        >
                          <template v-slot: append>
                            <tiny-mce-modal
                              ref="courseDescriptionTinyMceModal"
                              v-model="courseData.description"
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
                          v-model="courseData.co_ordinator_name"
                          :label="`Co-ordinator Name`"
                          :rules="[
                            (val) => !!val || 'Co-ordinator Name is required',
                          ]"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="courseData.co_ordinator_phone"
                          :label="`Co-ordinator Phone number`"
                          :rules="[
                            (val) => !!val || 'Phone number is required',
                          ]"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="courseData.number_of_classes"
                          :label="`Number of classes`"
                          :rules="[
                            (val) => !!val || 'Number of classes is required',
                          ]"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="courseData.number_of_exams"
                          :label="`Number of exams`"
                          :rules="[
                            (val) => !!val || 'Number of exams is required',
                          ]"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-file
                          filled
                          bottom-slots
                          v-model="courseData.course_icon"
                          label="Course icon"
                          counter
                        >
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" @click.stop.prevent />
                          </template>
                          <template v-if="courseData.course_icon" v-slot:append>
                            <q-icon
                              name="close"
                              @click.stop.prevent="
                                courseData.course_icon = null
                              "
                              class="cursor-pointer"
                            />
                          </template>

                          <template v-slot:hint> png/jpg </template>
                        </q-file>
                      </div>
                      <div class="col-6">
                        <q-file
                          filled
                          bottom-slots
                          v-model="courseData.course_short_video"
                          label="Short video"
                          counter
                        >
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" @click.stop.prevent />
                          </template>
                          <template
                            v-if="courseData.course_short_video"
                            v-slot:append
                          >
                            <q-icon
                              name="close"
                              @click.stop.prevent="
                                courseData.course_short_video = null
                              "
                              class="cursor-pointer"
                            />
                          </template>

                          <template v-slot:hint> mp4/mkv </template>
                        </q-file>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="courseData.start_date"
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
                                  v-model="courseData.start_date"
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
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="courseData.end_date"
                          :label="`End Date`"
                          :rules="[(val) => !!val || 'End Date is required']"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer q-ma-md">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="courseData.end_date"
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
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <!-- subject dropdown -->
                        <q-select
                          filled
                          v-model="courseData.subject_id"
                          :label="`Subject`"
                          :options="subjectOptions"
                          emit-value
                          map-options
                        />
                      </div>
                      <div class="col-6"></div>
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
import _ from "lodash";

export default defineComponent({
  name: "AddOrEdit Course",
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
      pageName: "Add/Edit Course",
      dense: true,
      name: "",
      model: "",
      expanded: false,
      courseData: {
        title: "",
        description: "",
        number_of_classes: "",
        number_of_exams: "",
        subject_id: "",
        start_date: "",
        end_date: "",
        co_ordinator_name: "",
        co_ordinator_phone: "",
        course_icon: ref(null),
        course_short_video: ref(null),
      },
      subjectOptions: [],
    };
  },
  methods: {
    onSubmit() {
      console.log(this.courseData);
      if (this.$route.params.id) {
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
        api
          .post("/courses", {
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
              message: "Course Added Successfully",
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
      }
    },
    onReset() {
      console.log("Reset");
      this.courseData = {
        id: "",
        title: "",
        description: "",
        number_of_classes: "",
        number_of_exams: "",
        subject_id: "",
        start_date: "",
        end_date: "",
        co_ordinator_name: "",
        co_ordinator_phone: "",
        course_icon: ref(null),
        course_short_video: ref(null),
      };
    },
    openCourseDescriptionTinyMceModal() {
      this.$refs.courseDescriptionTinyMceModal.show = true;
    },
    onDescriptionChange(value, index, parentIndex) {
      this.courseData.description = value;
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
    if (this.$route.params.id) {
      api.get("/courses/" + this.$route.params.id).then((response) => {
        const result = response.data.data;
        this.courseData.title = result.title;
        this.courseData.subject_id = result.subject_id;
        this.courseData.description = result.description;
        this.courseData.number_of_classes = result.num_classes;
        this.courseData.number_of_exams = result.num_exams;
        this.courseData.co_ordinator_name = result.coordinator_name;
        this.courseData.co_ordinator_phone = result.coordinator_number;
        this.courseData.course_short_video = result.intro_video;
      });
    }
  },
});
</script>

<style></style>
