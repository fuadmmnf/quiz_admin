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
            @click="$router.push('/Question')"
          />
          Add/Edit Question
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
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <!-- search card with filtering option filter icon -->
    <q-expansion-item
      icon="search"
      label="Search Questions"
      class="q-card q-mt-md"
    >
      <search-questions @search="onSearch" />
    </q-expansion-item>

    <q-separator spaced />
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
                                v-model="question.category_id"
                                :options="categoryOptions"
                                :label="`Category`"
                                lazy-rules
                                v-if="index === 0"
                                emit-value
                                map-options
                              />
                            </div>
                            <div class="col-6">
                              <q-select
                                filled
                                v-model="question.subcategory_id"
                                :options="subcategoryOptions"
                                :label="`Subcategory`"
                                lazy-rules
                                v-if="index === 0"
                                emit-value
                                map-options
                              />
                            </div>
                          </div>
                          <!-- score and negative marks -->
                          <div class="row q-col-gutter-md q-mt-sm">
                            <div class="col-6">
                              <q-input
                                filled
                                v-model="question.score"
                                :label="`Score`"
                                lazy-rules
                              />
                            </div>
                            <div class="col-6">
                              <q-input
                                filled
                                v-model="question.unit_negative_mark"
                                :label="`Negative Marks`"
                                lazy-rules
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
                            :default-open="true"
                          >
                            <q-card>
                              <q-card-section>
                                <!-- inputr -->
                                <q-input
                                  filled
                                  label="Content"
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
                            :default-open="true"
                          >
                            <q-card>
                              <q-card-section>
                                <!-- inputr -->
                                <q-input
                                  filled
                                  label="Content"
                                  v-model="option.content"
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
    </q-form>
  </q-page>
</template>

<script>
import OptionCard from "src/components/question/OptionCard.vue";
import { defineComponent, defineAsyncComponent } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
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
    const { $q } = useQuasar();
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
        category_id: null,
        subcategory: "",
        subject: "",
        chapter: "",
        faculty: "",
        discipline: "",
        parent_id: null,
        score: 0,
        unit_negative_mark: 0,
        type: "",
        options: [
          {
            content: "",
            is_correct: true,
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
            is_correct: true,
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
      subcategoryOptions: [],
      subjectOptions: [],
      chapterOptions: [],
      facultyOptions: [],
      disciplineOptions: [],
      types: [
        { label: "Single Best Answer", value: "single-best-answer" },
        { label: "Multiple Answer", value: "multiple-answer" },
        { label: "Multiple True/False", value: "multiple-true-false" },
        { label: "Written", value: "written" },
        { label: "Multilayered Type 1", value: "multilayered-type-1" },
        { label: "Multilayered Type 2", value: "multilayered-type-2" },
      ],
      types_without_multilayered: [
        { label: "Single Best Answer", value: "single-best-answer" },
        { label: "Multiple Answer", value: "multiple-answer" },
        { label: "Multiple True/False", value: "multiple-true-false" },
        { label: "Written", value: "written" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("Submit");
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
            this.$router.push("/Question");
          });
      } else {
        if (this.questions[0].type === "multilayered-type-1") {
          this.questions[0].options = [];
          this.questions[0].content = "";
          console.log(this.questions);
          api
            .post("/questions/multilayered", { questions: this.questions })
            .then((response) => {
              console.log(response);
              this.$q.notify({
                message: "Question Added Successfully",
                color: "positive",
                icon: "check",
              });
              this.onReset();
            })
            .catch((error) => {
              this.$q.notify({
                message: "Something went wrong",
                color: "negative",
                icon: "warning",
              });
            });
        } else {
          api
            .post("/questions", this.questions[0])
            .then((response) => {
              console.log(response);
              this.$q.notify({
                message: "Question Added Successfully",
                color: "positive",
                icon: "check",
              });
              this.onReset();
            })
            .catch((error) => {
              this.$q.notify({
                message: "Something went wrong",
                color: "negative",
                icon: "warning",
              });
            });
        }
      }
    },
    addQuestion(event) {
      event.preventDefault();
      this.questions.push({
        content: "",
        category_id: null,
        subcategory: "",
        subject: "",
        chapter: "",
        faculty: "",
        discipline: "",
        parent_id: null,
        score: 0,
        unit_negative_mark: 0,
        type: "",
        options: [
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
          },
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
          },
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
          },
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
          },
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
          },
        ],
        hints: [
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
            negative_mark: 0,
          },
        ],
      });
    },
    onReset() {
      console.log("Reset");
      this.questionData = {
        content: "",
        category_id: null,
        subcategory: "",
        subject: "",
        chapter: "",
        faculty: "",
        discipline: "",
        parent_id: null,
        score: 0,
        unit_negative_mark: 0,
        type: "",
        options: [
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
          },
        ],
        hints: [
          {
            content: "",
            is_correct: false,
            visibility: true,
            hint: "",
            explanation: "",
            negative_mark: 0,
          },
        ],
      };
      this.questions = [];
      this.questions.push(this.questionData);
    },
    addOption(event, index) {
      event.preventDefault();
      this.questions[index].options.push({
        content: "",
        is_correct: false,
        explanation: "",
        is_hint: false,
      });
    },
    addHint(index) {
      this.questions[index].hints.push({
        content: "",
        is_correct: false,
        is_hint: true,
        explanation: "",
      });
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
      const responseData = questionData;

      const { options, content, category_id, type, score, unit_negative_mark } =
        responseData;
      const optionsData = options.data;

      question.options = optionsData.filter((option) => !option.is_hint);
      question.hints = optionsData.filter((option) => option.is_hint);

      Object.assign(question, {
        content,
        category_id,
        type,
        score,
        unit_negative_mark,
      });
      if (questionData.children.data.length > 0) {
        this.questions.push({
          content: "",
          category_id: null,
          subcategory: "",
          subject: "",
          chapter: "",
          faculty: "",
          discipline: "",
          parent_id: null,
          score: 0,
          unit_negative_mark: 0,
          type: "",
          options: [
            {
              content: "",
              is_correct: false,
              visibility: true,
              hint: "",
              explanation: "",
            },
          ],
        });
        this.processQuestion(questionData.children.data[0], index + 1);
      }
    },
  },
  mounted() {
    this.questions.push(this.questionData);
    this.store.categories.map((category) => {
      this.categoryOptions.push({
        label: category.name,
        value: category.id,
      });
    });
    this.store.subcategories.map((subcategory) => {
      this.subcategoryOptions.push({
        label: subcategory.name,
        value: subcategory.id,
      });
    });
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
  },
});
</script>

<style></style>
