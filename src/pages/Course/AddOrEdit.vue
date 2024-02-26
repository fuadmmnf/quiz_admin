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

    <q-separator spaced/>
    <q-form
      @submit.prevent="onSubmit"
      id="courseForm"
      @reset="onReset"
      class="q-gutter-md q-mt-lg"
      ref="courseFormRef"
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
                          v-model.trim="courseData.title"
                          :label="`Title`"
                          :rules="[(val) => !!val || 'Title is required']"
                          lazy-rules
                          :error="!!errors && !!errors.title"
                          :error-message="
                        errors && errors.title
                          ? errors.title[0]
                          : ''"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model.trim="courseData.description"
                          :label="`Course Description`"
                          @click="openCourseDescriptionTinyMceModal"
                          readonly
                          :error="!!errors && !!errors.description"
                          :error-message="
                        errors && errors.description
                          ? errors.description[0]
                          : ''"
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
                          v-model.trim="courseData.coordinator_name"
                          :label="`Co-ordinator Name`"
                          :error="!!errors && !!errors.coordinator_name"
                          :error-message="
                        errors && errors.coordinator_name
                          ? errors.coordinator_name[0]
                          : ''"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model.trim="courseData.coordinator_number"
                          :label="`Co-ordinator Phone number`"
                          :error="!!errors && !!errors.coordinator_number"
                          :error-message="
                        errors && errors.coordinator_number
                          ? errors.coordinator_numbere[0]
                          : ''"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-my-sm">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model.trim="courseData.num_classes"
                          :label="`Number of classes`"
                          :rules="[
                            (val) => !!val || 'Number of classes is required',
                          ]"
                          lazy-rules
                          :error="!!errors && !!errors.num_classes"
                          :error-message="
                        errors && errors.num_classes
                          ? errors.num_classes[0]
                          : ''"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model.trim="courseData.num_exams"
                          :label="`Number of exams`"
                          :rules="[
                            (val) => !!val || 'Number of exams is required',
                          ]"
                          lazy-rules
                          :error="!!errors && !!errors.num_exams"
                          :error-message="
                        errors && errors.num_exams
                          ? errors.num_exams[0]
                          : ''"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <div class="col-6">
                          <q-input
                            filled
                            v-model="courseData.photo"
                            :label="`Course Cover Image Link`"
                            :error="!!errors && !!errors.photo"
                            :error-message="
                        errors && errors.photo
                          ? errors.photo[0]
                          : ''"
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="courseData.intro_video"
                          :label="`Course Intro Video Link`"
                          :error="!!errors && !!errors.intro_video"
                          :error-message="
                        errors && errors.intro_video
                          ? errors.intro_video[0]
                          : ''"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model.trim="courseData.start_date"
                          :label="`Start Date`"
                          :rules="[(val) => !!val || 'Start Date is required']"
                          lazy-rules
                          :error="!!errors && !!errors.start_date"
                          :error-message="
                        errors && errors.start_date
                          ? errors.start_date[0]
                          : ''"
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
                          v-model.trim="courseData.end_date"
                          :label="`End Date`"
                          :rules="[(val) => !!val || 'End Date is required']"
                          lazy-rules
                          :error="!!errors && !!errors.end_date"
                          :error-message="
                        errors && errors.end_date
                          ? errors.end_date[0]
                          : ''"
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
                        <q-select
                          filled
                          v-model="courseData.category_id"
                          :label="`Category`"
                          :options="categoryOptions"
                          emit-value
                          map-options
                          :error="!!errors && !!errors.category_id"
                          :error-message="
                        errors && errors.category_id
                          ? errors.category_id[0]
                          : ''"
                        />
                      </div>

                      <div class="col-6">
                        <!-- subject dropdown -->
                        <q-select
                          filled
                          v-model="courseData.subject_id"
                          :label="`Subject`"
                          :options="subjectOptions"
                          emit-value
                          map-options
                          :error="!!errors && !!errors.subject_id"
                          :error-message="
                        errors && errors.subject_id
                          ? errors.subject_id[0]
                          : ''"
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
import {defineComponent, defineAsyncComponent} from "vue";
import {ref} from "vue";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import _ from "lodash";
function initCourseData() {
  return {
    title: "",
    description: "",
    num_classes: "",
    num_exams: "",
    category_id: null,
    subject_id: null,
    start_date: "",
    end_date: "",
    coordinator_name: "",
    coordinator_number: "",
    photo: null,
    intro_video: ref(null),
  };
}
export default defineComponent({
  name: "AddOrEdit Course",
  components: {
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
  },

  setup() {
    const store = useStore();
    const {$q} = useQuasar();
    const courseFormRef = ref(null);
    const errors = ref(null);
    return {
      $q,
      courseFormRef,
      errors,
    };
  },
  data() {
    return {
      pageName: "Add/Edit Course",
      dense: true,
      name: "",
      model: "",
      expanded: false,
      courseData: initCourseData(),
      subjectOptions: [],
      categoryOptions: [],
    };
  },
  methods: {
    async onSubmit() {
      console.log(this.courseData);
      if (this.$route.params.id) {
      if(this.courseFormRef.validate()){
        try{
          const res = await api.patch(`/courses/${this.$route.params.id}`, this.courseData)

          this.$q.notify({
            message: "Course updated Successfully",
            color: "positive",
            icon: "check",
          });

          this.onReset();
        }catch(err){
          if (err.response && err.response.status === 422) {
            this.errors = err.response.data.errors;
            console.log(err.response)
          }
        }
      }
      } else {
       if(this.courseFormRef.validate()){
         try{
           const res = await api.post("/courses", this.courseData)

           this.$q.notify({
             message: "Course Added Successfully",
             color: "positive",
             icon: "check",
           })

           this.onReset();
         }catch(err){
           if (err.response && err.response.status === 422) {
             this.errors = err.response.data.errors;
             console.log(err.response)
           }
         }
       }

      }
    },
    onReset() {
      console.log("Reset");
      this.courseData = initCourseData();
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
    getCategories() {
      api.get("/categories/category").then((response) => {
        response.data.data.map((category) => {
          this.categoryOptions.push({
            label: category.name,
            value: category.id,
          });
        });
      });
    },
  },
  mounted() {
    this.getSubjects();
    this.getCategories();
    if (this.$route.params.id) {
      api.get("/courses/" + this.$route.params.id).then((response) => {
        this.courseData = response.data.data;
      });
    }
  },
});
</script>

<style></style>
