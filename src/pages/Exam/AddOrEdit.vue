<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="col-12 text-h6">Add/Edit Exam</div>
        <div class="text-subtitle1">{{route.query.course_id?.length? "Course ": ""}} {{route.query.course_name?.length? `(${route.query.course_name.replace("%20", " ")})`: ""}}</div>

      </q-card-section>
    </q-card>

    <q-separator spaced/>
    <!-- search card with filtering option filter icon -->
    <q-expansion-item
      expand-separator
      icon="search"
      label="Search"
      class="q-card"
      header-class=" text-h6"
    >
      <q-card class="no-shadow" bordered>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input filled v-model="name" :label="`Search Exam`">
                <template v-slot:append>
                  <!-- filter icon -->

                  <q-btn
                    flat
                    round
                    dense
                    icon="search"
                    class="bg-grey-3"
                    style="width: 40px; height: 40px"
                  />
                </template>
              </q-input>

              <!-- filtering options div -->
              <q-expansion-item
                class="q-mt-sm text-grey-6"
                v-model="expanded"
                icon="filter_list"
                label="Filtering Options"
              >
                <div class="row q-col-gutter-md q-mt-sm">
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Category`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subcategory`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subject`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Chapter`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Faculty`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Discipline`"
                      lazy-rules
                    />
                  </div>
                </div>
              </q-expansion-item>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-separator spaced/>
    <q-form
      @submit.prevent="onSubmit"
      id="examForm"
      @reset.prevent="onReset"
      class="q-gutter-md q-mt-lg"
    >
      <div class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <!-- card with two columns-->
            <div class="row q-col-gutter-md">
              <div class="col-5">
                <q-card class="no-shadow" bordered>
                  <!-- heading -->
                  <q-card-section class="row items-center justify-between">
                    <div class="text-h6">Exam Details</div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-select
                          filled
                          v-model="examData.course_id"
                          :label="`Course`"
                          :options="courseOptions"
                          emit-value
                          map-options
                          v-if="route.query.course_id?.length > 0"
                          readonly
                          @clear="
                            (val) => {
                              examData.course_id = null;
                            }
                          "
                        />
                      </div>
                      <!-- title, code, faculty, subject category, duration, start time, end time, start message , end message two columns -->
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="examData.title"
                          :label="`Title`"
                          :rules="[(val) => !!val || 'Title is required']"
                        />
                      </div>
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="examData.code"
                          :label="`Code`"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <!-- 3 coloumn -->
                      <div class="col-4">
                        <q-select
                          filled
                          v-model="examData.faculty_id"
                          :label="`Faculty`"
                          :options="categoryStore.getFacultyOptions"
                          emit-value
                          map-options
                          clearable
                          @clear="
                            (val) => {
                              examData.faculty_id = null;
                            }
                          "
                        />
                      </div>
                      <div class="col-4">
                        <q-select
                          filled
                          v-model="examData.category_id"
                          :label="`Category`"
                          :options="categoryStore.getCategoryOptions"
                          emit-value
                          map-options
                          clearable
                          @clear="
                            (val) => {
                              examData.category_id = null;
                            }
                          "
                        />
                      </div>
                      <div class="col-4">
                        <q-select
                          filled
                          v-model="examData.subject_id"
                          :label="`Subject`"
                          :options="categoryStore.getSubjectOptions"
                          emit-value
                          map-options
                          clearable
                          @clear="
                            (val) => {
                              examData.subject_id = null;
                            }
                          "
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-input
                          filled
                          v-model="examData.visibility_start_time"
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
                                  v-model="examData.visibility_start_time"
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
                                  v-model="examData.visibility_start_time"
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
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-input
                          filled
                          v-model="examData.visibility_end_time"
                          :label="`End Time`"
                          :rules="[(val) => !!val || 'End time is required']"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer q-ma-md">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="examData.visibility_end_time"
                                  mask="YYYY-MM-DD HH:mm"
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
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-time
                                  v-model="examData.visibility_end_time"
                                  mask="YYYY-MM-DD HH:mm"
                                  format24h
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
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-input
                          filled
                          v-model="examData.start_message"
                          :label="`Start Message`"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-input
                          filled
                          v-model="examData.end_message"
                          :label="`End Message`"
                        />
                      </div>
                    </div>
                    <!-- status -> draft, ongoing, finished, upcoming, checking and duration two column -->
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-input
                          filled
                          v-model="examData.duration_in_minutes"
                          :label="`Duration in minutes`"
                          :rules="[(val) => !!val || 'Duration is required']"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-7">
                <q-card class="no-shadow" bordered>
                  <!-- heading -->
                  <q-card-section class="row items-center justify-between">
                    <div class="text-h6">Exam Configuration</div>
                  </q-card-section>
                  <q-card-section>
                    <!-- Visbility , answer script visibility, marks visibility, merits visibility select-->
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="
                            examData.examConfiguration.question_display_type
                          "
                          :label="`Question Display Type`"
                          :options="question_display_type_option"
                          emit-value
                          map-options
                          :rules="[
                            (val) => !!val || 'Display type is required',
                          ]"
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="
                            examData.examConfiguration
                              .answer_script_visibility_time
                          "
                          :label="`Answer Script Visibility`"
                          :options="answer_script_visibility_option"
                          emit-value
                          map-options
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="
                            examData.examConfiguration.marks_visibility_time
                          "
                          :label="`Marks Visibility`"
                          :options="marks_visibility_option"
                          emit-value
                          map-options
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="
                            examData.examConfiguration.merit_visibility_time
                          "
                          :label="`Merits Visibility`"
                          :options="merits_visibility_option"
                          emit-value
                          map-options
                        />
                      </div>
                    </div>
                    <!-- question display type - vertical or horizontal, if horizontal, can skip horizontal -->
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-select
                          filled
                          v-model="
                            examData.examConfiguration.question_display_type
                          "
                          :label="`Question Display Type`"
                          :options="question_display_type_option"
                          emit-value
                          map-options
                          :rules="[
                            (val) => !!val || 'Display type is required',
                          ]"
                        />
                      </div>
                    </div>
                    <!-- if horizontal, "can skip horizontal questions" and "show answer between horizontal question" -->
                    <div
                      class="row q-col-gutter-md q-mt-auto"
                      v-if="
                        examData.examConfiguration.question_display_type ===
                        'horizontal'
                      "
                    >
                      <div class="col-6">
                        <q-toggle
                          v-model="
                            examData.examConfiguration
                              .can_skip_horizontal_question
                          "
                          :label="`Can Skip Horizontal Questions`"
                        />
                      </div>
                      <div class="col-6">
                        <q-toggle
                          v-model="
                            examData.examConfiguration
                              .show_answer_between_horizontal_question
                          "
                          :label="`Show Answer Between Horizontal Question`"
                        />
                      </div>
                    </div>
                    <!-- can change answer, can retake after exam, show merit list -->
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-toggle
                          v-model="examData.examConfiguration.can_change_answer"
                          :label="`Can Change Answer`"
                        />
                      </div>
                      <div class="col-6">
                        <q-toggle
                          v-model="
                            examData.examConfiguration.can_retake_after_exam
                          "
                          :label="`Can Retake After Exam`"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-toggle
                          v-model="examData.examConfiguration.show_merit_list"
                          :label="`Show Merit List`"
                        />
                      </div>
                      <div class="col-6">
                        <q-toggle
                          v-model="examData.examConfiguration.make_code_public"
                          :label="`Make Code Public`"
                        />
                      </div>
                    </div>

                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-toggle
                          v-model="
                            examData.examConfiguration.group_question_type
                          "
                          :label="`Group Questions By Type`"
                        />
                      </div>
                      <!--                      <div class="col-6">-->
                      <!--                        <q-toggle-->
                      <!--                          v-model="examData.make_code_public"-->
                      <!--                          :label="`Make Code Public`"-->
                      <!--                        />-->
                      <!--                      </div>-->
                    </div>
                    <!-- <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-select
                          filled
                          use-chips
                          v-model="examData.examConfiguration.merit_list_excluded_attributes"
                          :label="`Merit List Excluded Attributes`"
                          :options="merit_list_excluded_attributes_option"
                          multiple
                          emit-value
                          map-options
                        />
                      </div>
                    </div> -->
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <q-btn label="Submit" type="submit" color="primary" form="examForm"/>
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          form="examForm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import OptionCard from "src/components/question/OptionCard.vue";
import {defineComponent, defineAsyncComponent} from "vue";
import {ref} from "@vue/reactivity";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import _ from "lodash";
import {useCategoryStore} from "stores/category";
import {useRoute} from "vue-router";

function initExamData() {
  return {
    title: "",
    code: "",
    faculty_id: "",
    parent_id: null,
    category_id: "",
    subject_id: "",
    course_id: "",
    visibility_start_time: "",
    visibility_end_time: "",
    start_message: "",
    end_message: "",
    status: "Draft",
    duration_in_minutes: "",
    examConfiguration: {
      answer_script_visibility_time: "after-exam",
      marks_visibility_time: "after-exam",
      merit_visibility_time: "after-exam",
      question_display_type: "vertical",
      can_skip_horizontal_question: false,
      show_answer_between_horizontal_question: false,
      can_change_answer: true,
      can_retake_after_exam: true,
      show_merit_list: true,
      make_code_public: false,
      group_question_type: true,
      merit_list_excluded_attributes: null,
    },
  };
}

export default defineComponent({
  name: "AddOrEditEzam",
  components: {
    OptionCard: OptionCard,
  },
  setup() {
    const store = useStore();
    const categoryStore = useCategoryStore();
    const exams = store.exams;
    const {$q} = useQuasar();
    const route = useRoute();
    return {
      exams,
      $q,
      route,
      categoryStore,
    };
  },
  data() {
    return {
      examData: initExamData(),
      visibility_option: [
        {label: "Public", value: "public"},
        {label: "Private", value: "private"},
      ],
      courseOptions: [],
      answer_script_visibility_option: [
        {label: "After Attempt", value: "after-attempt"},
        {label: "After Exam", value: "after-exam"},
      ],
      marks_visibility_option: [
        {label: "After Attempt", value: "after-attempt"},
        {label: "After Exam", value: "after-exam"},
      ],
      merits_visibility_option: [
        {label: "After Attempt", value: "after-attempt"},
        {label: "After Exam", value: "after-exam"},
      ],
      question_display_type_option: [
        {label: "Vertical", value: "vertical"},
        {label: "Horizontal", value: "horizontal"},
      ],
      merit_list_excluded_attributes_option: [
        {label: "Individual Name", value: "Individual Name"},
        {label: "Position", value: "Position"},
        {label: "Correct Answer", value: "Correct Answer"},
        {label: "Neg Marking", value: "Neg Marking"},
        {label: "Final Score", value: "Final Score"},
        {label: "Time Needed", value: "Time Needed"},
      ],
    };
  },
  methods: {
    onSubmit: _.debounce(function () {
      if (this.$route.params.id) {
        api
          .put(`/exams/${this.$route.params.id}`, this.examData)
          .then((response) => {
            this.$q.notify({
              message: "Exam Updated Successfully",
              color: "positive",
              icon: "check",
            });
            // this.$router.push("/Exams");
          });
      } else {
        api.post("/exams", this.examData).then((response) => {
          this.$q.notify({
            message: "Exam Added Successfully",
            color: "positive",
            icon: "check",
          });
          this.onReset();
        });
      }
    }, 2000),
    onReset() {
      this.examData = initExamData();
      if (this.route.query.course_id?.length > 0) {
        this.examData.course_id = this.route.query.course_id;
      }
    },

    getCourses() {
      return api
        .get("/courses?orderBy=id&sortedBy=desc&limit=100")
        .then((response) => {
          response.data.data.map((course) => {
            this.courseOptions.push({
              label: course.title,
              value: course.id,
            });
          });
        });
    },
  },
  mounted() {
    if (this.route.query.course_id?.length > 0) {
      this.examData.course_id = this.route.query.course_id;
    }
    Promise.all([
      this.getCourses(),
    ]).then((value) => {
      if (this.route.query.courseId) {
        this.examData.course_id = this.route.query.courseId

      }
      if (this.route.params.id) {
        api
          .get("/exams/" + this.route.params.id + "?include=examConfiguration")
          .then((response) => {
            this.examData = response.data.data;
            this.examData.examConfiguration =
              response.data.data.examConfiguration.data;
          });
      }
    });


  },
});
</script>

<style></style>
