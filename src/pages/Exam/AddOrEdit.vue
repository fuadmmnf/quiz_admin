<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit Exam</div>
        <div class="row">
          <q-btn label="Submit" type="submit" color="primary" form="examForm" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            form="examForm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
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

    <q-separator spaced />
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
                      <!-- title, code, faculty, subject category, duration, start time, end time, start message , end message two columns -->
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="examData.name"
                          :label="`Title`"
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
                          v-model="examData.faculty"
                          :label="`Faculty`"
                        />
                      </div>
                      <div class="col-4">
                        <q-select
                          filled
                          v-model="examData.discipline"
                          :label="`Discipline`"
                        />
                      </div>
                      <div class="col-4">
                        <q-select
                          filled
                          v-model="examData.subject"
                          :label="`Subject`"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-input
                          filled
                          v-model="examData.start_time"
                          :label="`Start Time`"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer q-ma-md">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="examData.start_time"
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
                                  v-model="examData.start_time"
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
                          v-model="examData.end_time"
                          :label="`End Time`"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer q-ma-md">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="examData.end_time"
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
                                  v-model="examData.end_time"
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
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="examData.status"
                          :label="`Status`"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="examData.duration"
                          :label="`Duration`"
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
                          v-model="examData.visibility"
                          :label="`Visibility`"
                          :options="visibility_option"
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="examData.answer_script_visibility"
                          :label="`Answer Script Visibility`"
                          :options="answer_script_visibility_option"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="examData.marks_visibility"
                          :label="`Marks Visibility`"
                          :options="marks_visibility_option"
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="examData.merits_visibility"
                          :label="`Merits Visibility`"
                          :options="merits_visibility_option"
                        />
                      </div>
                    </div>
                    <!-- question display type - vertical or horizontal, if horizontal, can skip horizontal -->
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-select
                          filled
                          v-model="examData.question_display_type"
                          :label="`Question Display Type`"
                          :options="question_display_type_option"
                        />
                      </div>
                    </div>
                    <!-- if horizontal, "can skip horizontal questions" and "show answer between horizontal question" -->
                    <div
                      class="row q-col-gutter-md q-mt-auto"
                      v-if="
                        examData.question_display_type.value === 'Horizontal'
                      "
                    >
                      <div class="col-6">
                        <q-toggle
                          v-model="examData.can_skip_horizontal_questions"
                          :label="`Can Skip Horizontal Questions`"
                        />
                      </div>
                      <div class="col-6">
                        <q-toggle
                          v-model="
                            examData.show_answer_between_horizontal_question
                          "
                          :label="`Show Answer Between Horizontal Question`"
                        />
                      </div>
                    </div>
                    <!-- can change answer, can retake after exam, show merit list -->
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-toggle
                          v-model="examData.can_change_answer"
                          :label="`Can Change Answer`"
                        />
                      </div>
                      <div class="col-6">
                        <q-toggle
                          v-model="examData.can_retake_after_exam"
                          :label="`Can Retake After Exam`"
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <q-toggle
                          v-model="examData.show_merit_list"
                          :label="`Show Merit List`"
                        />
                      </div>
                    </div>
                    <!-- multi-select dropdown for merit list excluded attributes
                    individual name
                    c. Position
                    d. Correct answer,
                    e. Neg marking
                    f. final score
                    g. time needed -->
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-12">
                        <q-select
                          filled
                          use-chips
                          v-model="examData.merit_list_excluded_attributes"
                          :label="`Merit List Excluded Attributes`"
                          :options="merit_list_excluded_attributes_option"
                          multiple
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
import OptionCard from "src/components/question/OptionCard.vue";
import { defineComponent, defineAsyncComponent } from "vue";
import { ref } from "@vue/reactivity";
import { useStore } from "src/stores/store";

export default defineComponent({
  name: "AddOrEditEzam",
  components: {
    OptionCard: defineAsyncComponent(() =>
      import("components/Question/OptionCard.vue")
    ),
  },
  setup() {
    const store = useStore();
    const exams = store.exams;
    return {
      exams,
    };
  },
  data() {
    return {
      pageName: "Add/Edit Question",
      dense: true,
      name: "",
      model: "",
      expanded: false,
      examData: {
        id: 4,
        name: "Demo Exam",
        code: "EXM",
        faculty: "Faculty 1",
        discipline: "Discipline 1",
        subject: "Subject 1",
        start_time: "",
        end_time: "",
        start_message: "Demo start message",
        end_message: "Demo end message",
        status: "Draft",
        duration: "60",
        visibility: "Public",
        answer_script_visibility: "Private",
        marks_visibility: "Public",
        merits_visibility: "Private",
        question_display_type: "Vertical",
        can_skip_horizontal_questions: false,
        show_answer_between_horizontal_question: false,
        can_change_answer: false,
        can_retake_after_exam: false,
        show_merit_list: false,
        merit_list_excluded_attributes: [],
      },
      date: ref("2021-01-01 12:00"),
      visibility_option: [
        { label: "Public", value: "Public" },
        { label: "Private", value: "Private" },
      ],
      answer_script_visibility_option: [
        { label: "After Attempt", value: "After Attempt" },
        { label: "After Exam", value: "After Exam" },
      ],
      marks_visibility_option: [
        { label: "After Attempt", value: "After Attempt" },
        { label: "After Exam", value: "After Exam" },
      ],
      merits_visibility_option: [
        { label: "After Attempt", value: "After Attempt" },
        { label: "After Exam", value: "After Exam" },
      ],
      question_display_type_option: [
        { label: "Vertical", value: "Vertical" },
        { label: "Horizontal", value: "Horizontal" },
      ],
      merit_list_excluded_attributes_option: [
        { label: "Individual Name", value: "Individual Name" },
        { label: "Position", value: "Position" },
        { label: "Correct Answer", value: "Correct Answer" },
        { label: "Neg Marking", value: "Neg Marking" },
        { label: "Final Score", value: "Final Score" },
        { label: "Time Needed", value: "Time Needed" },
      ],

      exam_data: {
        visibility: "Public",
        answer_script_visibility: "After Attempt",
        marks_visibility: "After Attempt",
        merits_visibility: "After Attempt",
        question_display_type: "Vertical",
        can_skip_horizontal_questions: false,
        show_answer_between_horizontal_question: false,
        can_change_answer: false,
        can_retake_after_exam: false,
        show_merit_list: false,
        merit_list_excluded_attributes: [],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitted");
      this.exams.push(this.examData);
      this.$router.push("/Exam");
    },
    onReset() {
      console.log("Reset");
      this.examData = {
        id: "",
        name: "",
        code: "",
        faculty: "",
        discipline: "",
        subject: "",
        start_time: "",
        end_time: "",
        start_message: "",
        end_message: "",
        status: "",
        duration: "",
        visibility: "",
        answer_script_visibility: "",
        marks_visibility: "",
        merits_visibility: "",
        question_display_type: "",
        can_skip_horizontal_questions: false,
        show_answer_between_horizontal_question: false,
        can_change_answer: false,
        can_retake_after_exam: false,
        show_merit_list: false,
        merit_list_excluded_attributes: [],
      };
    },
    addOption() {
      this.questionData.options.push({
        option: "",
        is_correct: false,
        visible: true,
        hint: "",
        explanation: "",
      });
    },
  },
});
</script>

<style></style>
