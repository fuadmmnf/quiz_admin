<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit Question</div>
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
              <q-input filled v-model="name" :label="`Search Question`">
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
                expand-separator
                icon="edit"
                :label="index > 0 ? `Question ${index}` : `Question`"
                class="q-card q-mt-md"
                header-class=" text-h6"
              >
                <q-card class="no-shadow">
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
                            :options="types"
                            :label="`Question Type`"
                            lazy-rules
                            emit-value
                            map-options
                            v-if="index === 0"
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
                                @save="onDescriptionChange"
                              />
                            </template>
                          </q-input>
                          <!-- category and subcategory in the same row -->
                          <div class="row q-col-gutter-md q-mt-sm">
                            <div class="col-6">
                              <q-select
                                filled
                                v-model="question.category"
                                :options="categoryOptions"
                                :label="`Category`"
                                lazy-rules
                                v-if="index === 0"
                              />
                            </div>
                            <div class="col-6">
                              <q-select
                                filled
                                v-model="question.subcategory"
                                :options="subcategoryOptions"
                                :label="`Subcategory`"
                                lazy-rules
                                v-if="index === 0"
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
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-7">
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
                      />
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
                            v-for="(option, index) in question.options"
                            class="q-ma-md"
                            :label="`Option ${index + 1}`"
                            :key="index"
                            :value="index"
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
                                  :key="index"
                                  :name="`content${index}`"
                                  :id="`content${index}`"
                                  readonly
                                >
                                  <template v-slot:append>
                                    <tiny-mce-modal
                                      :content="option.content"
                                      :index="index"
                                      @save="onContentChange"
                                    />
                                  </template>
                                </q-input>
                                <q-input
                                  filled
                                  label="Explanation"
                                  v-model="option.explanation"
                                  :key="index"
                                  :name="`explanation${index}`"
                                  :id="`explanation${index}`"
                                  readonly
                                >
                                  <template v-slot:append>
                                    <tiny-mce-modal
                                      :content="option.explanation"
                                      :index="index"
                                      @save="onExplanationChange"
                                    />
                                  </template>
                                </q-input>
                                <!-- same row + delete button-->
                                <div class="row">
                                  <q-checkbox
                                    v-model="option.is_correct"
                                    :key="index"
                                    :name="`is_correct${index}`"
                                    :id="`is_correct${index}`"
                                    label="Correct"
                                    class="q-ma-md"
                                  />
                                  <q-btn
                                    @click="deleteItem(index)"
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
                            v-for="(option, index) in question.options"
                            class="q-ma-md"
                            :label="`Hint ${index + 1}`"
                            :key="index"
                            :value="index"
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
                                  :key="index"
                                  :name="`content${index}`"
                                  :id="`content${index}`"
                                  readonly
                                >
                                  <template v-slot:append>
                                    <tiny-mce-modal
                                      :content="option.content"
                                      :index="index"
                                      @save="onContentChange"
                                    />
                                  </template>
                                </q-input>
                                <!-- same row + delete button-->
                                <div class="row">
                                  <q-btn
                                    @click="deleteItem(index)"
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
                              @click="addHint"
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
    OptionCard: defineAsyncComponent(() =>
      import("components/Question/OptionCard.vue")
    ),
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
      pageName: "Add/Edit Question",
      dense: true,
      questions: [],
      questionData: {
        content: "Demo content",
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
            content: "This is an options data",
            is_correct: true,
            explanation: "This is demo explanation",
            is_hint: false,
            visibility: true,
          },
          {
            content: "This is an options data",
            is_correct: false,
            explanation: "This is demo explanation",
            is_hint: false,
            visibility: true,
          },
          {
            content: "This is an options data",
            is_correct: false,
            explanation: "This is demo explanation",
            is_hint: false,
            visibility: true,
          },
          {
            content: "This is an options data",
            is_correct: false,
            explanation: "This is demo explanation",
            is_hint: false,
            visibility: true,
          },
          {
            content: "This is an options data",
            is_correct: false,
            explanation: "This is demo explanation",
            is_hint: false,
            visibility: true,
          },
        ],
        hints: [
          {
            content: "This is an hints data",
            is_correct: true,
            explanation: "",
            is_hint: true,
            visibility: true,
          },
          {
            content: "This is an hints data",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
          },
          {
            content: "This is an hints data",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
          },
          {
            content: "This is an hints data",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
          },
          {
            content: "This is an hints data",
            is_correct: false,
            explanation: "",
            is_hint: true,
            visibility: true,
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
        { label: "Fill in the blanks", value: "written" },
        { label: "Essay", value: "written" },
        { label: "Multilayered Type 1", value: "multilayered-type-1" },
        { label: "Multilayered Type 2", value: "multilayered-type-2" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("Submit");
      if (this.questions[0].type === "multilayered-type-2") {
        this.questions[0].options.concat(this.questions[0].hints);
      }
      api.post("/questions", this.questions[0]).then((response) => {
        console.log(response);
        this.$q.notify({
          message: "Question Added Successfully",
          color: "positive",
          icon: "check",
        });
        this.onReset();
      });
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
      };
    },
    addOption(event, index) {
      event.preventDefault();

      this.questions[index].options.push({
        content: "This is another demo option",
        is_correct: false,
        visibility: true,
        hint: " This is demo hint",
        explanation: " This is demo explanation",
      });
    },
    onDescriptionChange(value) {
      this.questionData.content = value;
    },
    onContentChange(value, index) {
      this.questionData.options[index].content = value;
    },
    onExplanationChange(value, index) {
      this.questionData.options[index].explanation = value;
    },
    deleteItem(index) {
      this.questionData.options.splice(index, 1);
    },

    getCategories() {
      api.get("/categories/category").then((response) => {
        response.data.data.map(
          (category) => {
            this.categoryOptions.push({
              label: category.name,
              value: category.id,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    getSubcategories() {
      api.get("/categories/sub-category").then((response) => {
        response.data.data.map(
          (subcategory) => {
            this.subcategoryOptions.push({
              label: subcategory.name,
              value: subcategory.id,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    getSubjects() {
      api.get("/categories/subject").then((response) => {
        response.data.data.map(
          (subject) => {
            this.subjectOptions.push({
              label: subject.name,
              value: subject.id,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    getChapters() {
      api.get("/categories/chapter").then((response) => {
        response.data.data.map(
          (chapter) => {
            this.chapterOptions.push({
              label: chapter.name,
              value: chapter.id,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    getFaculties() {
      api.get("/categories/faculty").then((response) => {
        response.data.data.map(
          (faculty) => {
            this.facultyOptions.push({
              label: faculty.name,
              value: faculty.id,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    getDisciplines() {
      api.get("/categories/discipline").then((response) => {
        response.data.data.map(
          (discipline) => {
            this.disciplineOptions.push({
              label: discipline.name,
              value: discipline.id,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
  },
  mounted() {
    this.questions.push(this.questionData);
    this.getCategories();
    this.getSubcategories();
    if (this.$route.params.id) {
      api
        .get(`/questions/${this.$route.params.id}?include=category`)
        .then((response) => {
          this.questionData = response.data.data;
          this.questionData.options = response.data.data.options.data;
          this.questionData.type = this.types.find(
            (type) => type.value === this.questionData.type
          );
        });
    }
  },
});
</script>

<style></style>
