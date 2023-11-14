<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">
          <!-- back to list -->
          <q-btn
            color="primary"
            icon="arrow_back"
            flat
            dense
            round
            outline
            @click="$router.push('/question')"
          />
          Add/Edit Question
        </div>

      </q-card-section>
    </q-card>

    <q-separator spaced/>
    <!-- search card with filtering option filter icon -->
    <q-expansion-item
      icon="search"
      label="Search Questions"
      class="q-card q-mt-md"
    >
      <search-questions @search="onSearch"/>
    </q-expansion-item>

    <q-separator spaced/>
    <q-form
      id="questionForm"
      @submit.prevent="onSubmit()"
      @reset="onReset"
      class="q-gutter-md q-mt-lg"
    >
      <div class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <!-- two columns -->
            <div v-for="(question, index) in questions" :key="index">
              <!-- question content -->
              <q-expansion-item
                default-opened
                icon="edit"
                :label="index > 0 ? `Question ${index}` : `Question`"
                class="q-card q-mt-md"
                header-class=" text-h6"
                v-if="
                  questions[0].type === 'multilayered-type-1' || index === 0
                "
              >
                <q-card class="q-mt-md">
                  <q-card-section class="row q-col-gutter-md">
                    <div class="col-5">
                      <q-card>
                        <!-- card header -->
                        <q-card-section>
                          <div class="text-h6">Question Details</div>
                        </q-card-section>
                        <q-card-section>
                          <!-- question type -->
                          <q-select
                            class="q-mt-md"
                            filled
                            v-model="question.type"
                            :options="
                              questions[0].type === 'multilayered-type-1'
                                ? types_without_multilayered
                                : types
                            "
                            :label="`Question Type`"
                            lazy-rules
                            emit-value
                            map-options
                          />
                          <q-input
                            filled
                            v-model="question.content"
                            :label="`Question Content*`"
                            @click="openQuestionContentTinyMceModal(index)"
                            :rules="[(val) => !!val || 'Content is required']"
                            readonly
                          >
                            <template v-slot:append>
                              <tiny-mce-modal
                                :content="question.content"
                                :index="0"
                                :parentIndex="index"
                                @save="onDescriptionChange"
                              />
                            </template>
                          </q-input>
                          <!-- category and subcategory in the same row -->
                          <div class="row q-col-gutter-md q-mt-sm">
                            <div class="col-6">
                              <q-select
                                filled
                                v-model="question.selected_category"
                                :options="categoryOptions"
                                option-value="id"
                                option-label="name"
                                :label="`Category`"
                                lazy-rules
                                v-if="index === 0"
                                map-options
                                emit-value
                                clearable
                                @update:model-value="(val) => {onCategorySelect(val, index)}"
                                @clear="(val) => {question.selected_category = null}"

                              />
                            </div>
                            <div class="col-6">
                              <q-select
                                filled
                                v-model="question.category_id"
                                :options="question.selected_category? categoryOptions.find(c => c.id === question.selected_category).children.data: []"
                                option-value="id"
                                option-label="name"
                                :label="`Subcategory`"
                                lazy-rules
                                map-options
                                v-if="index === 0"
                                emit-value
                                clearable
                                @clear="(val) => {question.category_id = null}"
                              />
                            </div>
                          </div>

                          <!-- subject and chapter selection -->
                          <div class="row q-col-gutter-md q-mt-sm">
                            <div class="col-6">
                              <q-select
                                filled
                                v-model="question.selected_subject"
                                :options="subjectOptions"
                                option-value="id"
                                option-label="name"
                                :label="`Subject`"
                                lazy-rules
                                v-if="index === 0"
                                map-options
                                emit-value
                                clearable
                                @update:model-value="(val) => {onSubjectSelect(val, index)}"
                                @clear="(val) => {question.selected_subject = null}"

                              />
                            </div>
                            <div class="col-6">
                              <q-select
                                filled
                                v-model="question.subject_id"
                                :options="question.selected_subject? subjectOptions.find(s => s.id === question.selected_subject).children.data: []"
                                option-value="id"
                                option-label="name"
                                :label="`Chapter`"
                                lazy-rules
                                v-if="index === 0"
                                map-options
                                emit-value
                                clearable
                                @clear="(val) => {question.subject_id = null}"
                              />
                            </div>
                          </div>


                          <!-- score and negative marks -->
                          <div class="row q-col-gutter-md q-mt-sm">
                            <div class="col-6">
                              <q-input
                                filled
                                v-model="question.score"
                                label="Score"
                                lazy-rules
                                :rules="[(val) => !!val || 'Score is required']"
                              />
                            </div>
                            <div class="col-6">
                              <q-input
                                filled
                                v-model="question.unit_negative_mark"
                                :label="`Negative Marks`"
                                lazy-rules
                                :rules="[
                                  (val) =>
                                    !!val || 'Negative marks is required',
                                ]"
                              />
                            </div>
                          </div>
                          <!-- button add questions -->
                          <q-btn
                            v-if="
                              index === 0 &&
                              questions[0].type === 'multilayered-type-1'
                            "
                            label="Add Question"
                            type="submit"
                            color="primary"
                            @click="addQuestion"
                            class="q-mt-md"
                          />
                          <q-btn
                            v-if="
                              index > 0 &&
                              questions[0].type === 'multilayered-type-1'
                            "
                            label="Delete"
                            class="q-mt-md"
                            icon="delete"
                            color="red"
                            size="sm"
                            @click="questions.splice(index, 1)"
                          />
                        </q-card-section>
                      </q-card>

                    </div>
                    <div class="col-7">
                      <q-card
                        v-if="
                          index > 0 ||
                          questions[0].type != 'multilayered-type-1'
                        "
                      >
                        <q-card-section>
                          <div class="text-h6">Options</div>
                        </q-card-section>
                        <q-card-section>
                          <!-- <option-card
                      v-for="(option, index) in questionData.options"
                      :key="index"
                      :option="option"
                      :index="index"
                      :type="type"
                    ></option-card> -->
                          <q-expansion-item
                            v-for="(option, idx) in question.options"
                            class="q-ma-md"
                            :label="`Option ${idx + 1}`"
                            :key="idx"
                            :value="idx"
                            :expand-separator="true"
                            default-opened
                          >
                            <q-card>
                              <q-card-section>
                                <!-- inputr -->
                                <q-input
                                  filled
                                  label="Content"
                                  :rules="[
                                    (val) => !!val || 'Content is required',
                                  ]"
                                  v-model="option.content"
                                  :key="idx"
                                  :name="`content${idx}`"
                                  :id="`content${idx}`"
                                >
                                </q-input>
                                <q-input
                                  filled
                                  label="Explanation"
                                  v-model="option.explanation"
                                  :key="idx"
                                  :name="`explanation${idx}`"
                                  :id="`explanation${idx}`"
                                  @click="
                                    openOptionExplanationTinyMceModal(
                                      index,
                                      idx
                                    )
                                  "
                                  readonly
                                >
                                  <template v-slot:append>
                                    <tiny-mce-modal
                                      :content="option.explanation"
                                      :index="idx"
                                      :parentIndex="index"
                                      @save="onExplanationChange"
                                    />
                                  </template>
                                </q-input>
                                <!-- same row + delete button-->
                                <div class="row">
                                  <q-checkbox
                                    v-model="option.is_correct"
                                    :key="idx"
                                    :name="`is_correct${idx}`"
                                    :id="`is_correct${idx}`"
                                    label="Correct"
                                    class="q-ma-md"
                                  />
                                  <q-btn
                                    @click="deleteItem(idx, index)"
                                    icon="delete"
                                    size="sm"
                                    color="negative"
                                    class="q-ma-lg"
                                  >
                                    Delete
                                  </q-btn>
                                </div>
                              </q-card-section>
                            </q-card>
                          </q-expansion-item>
                          <div class="q-mt-md">
                            <q-btn
                              label="Add Option"
                              type="submit"
                              color="primary"
                              @click="addOption($event, index)"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                      <q-card
                        id="hint-card"
                        class="q-mt-md"
                        v-if="question.type === 'multilayered-type-2'"
                      >
                        <q-card-section>
                          <div class="text-h6">Hints</div>
                        </q-card-section>
                        <q-card-section>
                          <q-expansion-item
                            v-for="(option, idx) in question.hints"
                            class="q-ma-md"
                            :label="`Hint ${idx + 1}`"
                            :key="idx"
                            :value="idx"
                            :expand-separator="true"
                            default-opened
                          >
                            <q-card>
                              <q-card-section>
                                <!-- inputr -->
                                <q-input
                                  filled
                                  label="Content"
                                  v-model="option.content"
                                  :rules="[
                                    (val) => !!val || 'Content is required',
                                  ]"
                                  :key="idx"
                                  :name="`content${idx}`"
                                  :id="`content${idx}`"
                                  readonly
                                >
                                  <template v-slot:append>
                                    <tiny-mce-modal
                                      :content="option.content"
                                      :index="idx"
                                      :parentIndex="index"
                                      @save="onHintContentChange"
                                    />
                                  </template>
                                </q-input>
                                <!-- negative mark -->
                                <q-input
                                  filled
                                  label="Negative Mark"
                                  v-model="option.negative_mark"
                                  :key="idx"
                                  :name="`negative_mark${idx}`"
                                  :id="`negative_mark${idx}`"
                                  lazy-rules
                                />
                                <!-- same row + delete button-->
                                <div class="row">
                                  <q-btn
                                    @click="deleteHint(idx, index)"
                                    icon="delete"
                                    size="sm"
                                    color="negative"
                                    class="q-ma-lg"
                                  >
                                    Delete
                                  </q-btn>
                                </div>
                              </q-card-section>
                            </q-card>
                          </q-expansion-item>
                          <div class="q-mt-md">
                            <q-btn
                              label="Add Hint"
                              color="primary"
                              @click="addHint(index)"
                            />
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <q-btn
          label="Submit"
          type="submit"
          form="questionForm"
          color="primary"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
          form="questionForm"
          @click="onReset"
        />
      </div>

    </q-form>
  </q-page>
</template>

<script>
import OptionCard from "src/components/question/OptionCard.vue";
import {defineAsyncComponent, defineComponent} from "vue";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import _ from "lodash";

export default defineComponent({
  name: "AddOrEditQuestion",
  components: {
    OptionCard: OptionCard,
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
    SearchQuestions: defineAsyncComponent(() =>
      import("components/question/SearchQuestions.vue")
    ),
  },
  setup() {
    const store = useStore();
    const {$q} = useQuasar();
    return {
      $q,
      store,
    };
  },
  data() {
    return {
      pageName: "Add/Edit Question",
      dense: true,
      questions: [],
      question_id: null,
      questionData: {
        content: "",
        selected_category: null,
        category_id: null,
        selected_subject: null,
        subject_id: "",
        parent_id: null,
        score: "",
        unit_negative_mark: "",
        type: "",
        options: [
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: false,
            visibility: true,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: false,
            visibility: true,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: false,
            visibility: true,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: false,
            visibility: true,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: false,
            visibility: true,
          },
        ],
        hints: [
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
            negative_mark: 0,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
            negative_mark: 0,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
            negative_mark: 0,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
            negative_mark: 0,
          },
          {
            content: "",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
            negative_mark: 0,
          },
        ],
      },
      model: "",
      expanded: false,
      categoryOptions: [],
      subjectOptions: [],
      facultyOptions: [],
      disciplineOptions: [],
      types: [
        {label: "Single Best Answer", value: "single-best-answer"},
        {label: "Multiple Answer", value: "multiple-answer"},
        {label: "Multiple True/False", value: "multiple-true-false"},
        {label: "Written", value: "written"},
        {label: "Multilayered Type 1", value: "multilayered-type-1"},
        {label: "Multilayered Type 2", value: "multilayered-type-2"},
      ],
      types_without_multilayered: [
        {label: "Single Best Answer", value: "single-best-answer"},
        {label: "Multiple Answer", value: "multiple-answer"},
        {label: "Multiple True/False", value: "multiple-true-false"},
        {label: "Written", value: "written"},
      ],
    };
  },
  methods: {
    onCategorySelect(val, idx) {
      this.questions[idx] = {...this.questions[idx], selected_category: val, category_id: null};
    },
    onSubjectSelect(val, idx) {
      this.questions[idx] = {...this.questions[idx], selected_subject: val, subject_id: null};
    },
    onSubmit: _.debounce(function () {
      // const origQuestions = [...this.questions];
      this.questions = this.questions.map((q) => {
        q.category_id = (q.category_id == null ? q.selected_category : q.category_id)
        q.subject_id = (q.subject_id == null ? q.selected_subject : q.subject_id)
        return q;
      });

      if (this.questions[0].type === "multilayered-type-2") {
        this.questions[0].options = [
          ...this.questions[0].options,
          ...this.questions[0].hints,
        ];
      }
      if (this.question_id) {
        // add id to questions
        this.questions[0].id = this.question_id;
        api
          .put(`/questions/${this.question_id}`, this.questions[0])
          .then((response) => {
            this.$q.notify({
              message: "Question Updated Successfully",
              color: "positive",
              icon: "check",
            });
            this.$router.push("/question");
          });
      } else {
        if (this.questions[0].type === "multilayered-type-1") {
          this.questions[0].options = [];
          this.questions[0].content = "";
          console.log(this.questions);
          api
            .post("/questions/multilayered", {questions: this.questions})
            .then((response) => {
              console.log(response);
              this.$q.notify({
                message: "Question Added Successfully",
                color: "positive",
                icon: "check",
              });
              this.onContentReset();
            })
            .catch((error) => {
              this.$q.notify({
                message: "Something went wrong",
                color: "negative",
                icon: "warning",
              });
            });
        } else {
          api.post("/questions", this.questions[0]).then((response) => {
            console.log(response);
            this.$q.notify({
              message: "Question Added Successfully",
              color: "positive",
              icon: "check",
            });
            this.onContentReset();
          });
        }
      }

    }, 2000),
    addQuestion(event) {
      event.preventDefault();
      this.questions.push({...this.questionData});
    },
    onReset() {
      this.questions = [{...this.questionData}];
    },
    onContentReset() {
      this.questions = this.questions.map((question) => {
        return {
          ...question, content: this.questionData.content, options: this.questionData.options
        }
      })
    },
    addOption(event, index) {
      event.preventDefault();
      this.questions[index].options.push({...this.questionData.options[0]});
    },
    addHint(index) {
      this.questions[index].hints.push({...this.questionData.hints[0]});
    },
    onDescriptionChange(value, index, parentIndex) {
      this.questions[parentIndex].content = value;
    },
    onContentChange(value, idx, parentIndex) {
      this.questions[parentIndex].options[idx].content = value;
    },
    onHintContentChange(value, idx, parentIndex) {
      this.questions[parentIndex].hints[idx].content = value;
    },
    onExplanationChange(value, idx, parentIndex) {
      this.questions[parentIndex].options[idx].explanation = value;
    },
    deleteItem(idx, index) {
      this.questions[index].options.splice(idx, 1);
    },
    deleteHint(idx) {
      event.preventDefault();
      this.questions[0].hints.splice(idx, 1);
    },
    processQuestion(questionData, index) {
      const question = this.questions[index];
      const {options, content, category_id, subject_id, type, score, unit_negative_mark} =
        questionData;

      const catData = this.categoryOptions.reduce((acc, c) => {
        return acc.concat(c.children.data)
      }, []).find(sc => sc.id === category_id)

      const subData = this.subjectOptions.reduce((acc, s) => {
        return acc.concat(s.children.data)
      }, []).find(sc => sc.id === subject_id)

      const optionsData = options.data

      question.options = optionsData.filter((option) => !option.is_hint);
      question.hints = optionsData.filter((option) => option.is_hint);

      Object.assign(question, {
        content,
        category_id: catData ? catData.id : null,
        selected_category: (category_id === "" || category_id === null || category_id === undefined) ? null : (catData ? catData.parent_id : this.categoryOptions.find(c => c.id === category_id).id),
        subject_id: subData ? subData.id : null,
        selected_subject: (subject_id === "" || subject_id === null || subject_id === undefined) ? null : (subData ? subData.parent_id : this.subjectOptions.find(s => s.id === subject_id).id),
        type,
        score,
        unit_negative_mark,
      });
      if (questionData.children.data.length > 0) {
        this.questions.push({...this.questionData});
        this.processQuestion(questionData.children.data[0], index + 1);
      }
    },
    openQuestionContentTinyMceModal(index) {
      console.log(this.$refs.questionContentTinyMceModal[index]);
      this.$refs.questionContentTinyMceModal[index].show = true;
    },
    openOptionExplanationTinyMceModal(questionIndex, optionIndex) {
      const optionExplanationTinyMceModals =
        this.$refs.optionExplanationTinyMceModal;

      const target = optionExplanationTinyMceModals.filter(
        (model) =>
          model.index === optionIndex && model.parentIndex === questionIndex
      );

      target[0].show = true;
    },
    onQuestionTypeChange(question) {
      if (question.type === "single-best-answer") {
        for (const option of question.options) {
          option.is_correct = false;
        }
        if (question.options.length > 0) {
          question.options[0].is_correct = true;
        }
      }
    },

    onCheckboxClick(question, option_index) {
      if (question.type === "single-best-answer") {
        question.options.map((option, index) => {
          if (index !== option_index) {
            option.is_correct = false;
          }
        });
      }
    },
    getCategories() {
      return api.get("/categories/category").then((response) => {
        this.categoryOptions = response.data.data
      });
    },
    getSubjects() {
      return api.get("/categories/subject").then((response) => {
        this.subjectOptions = response.data.data
      });
    },


  },

  async mounted() {
    this.questions.push(this.questionData);
    Promise.all([
      this.getCategories(),
      this.getSubjects()
    ]).then(value => {
      if (this.$route.params.id) {
        this.question_id = this.$route.params.id;
        api
          .get(
            `/questions/${this.$route.params.id}?include=options,children.options`
          )
          .then((response) => {
            this.processQuestion(response.data.data, 0);
          });
      }
    });

  },
});
</script>

<style></style>
