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
            <div class="row q-col-gutter-md">
              <div class="col-5">
                <q-card>
                  <!-- card header -->
                  <q-card-section>
                    <div class="text-h6">Question Details</div>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      v-model="questionData.name"
                      :label="`Question Name*`"
                      readonly
                    >
                      <template v-slot:append>
                        <tiny-mce-modal
                          :content="questionData.name"
                          @save="onDescriptionChange"
                        />
                      </template>
                    </q-input>
                    <!-- category and subcategory in the same row -->
                    <div class="row q-col-gutter-md q-mt-sm">
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="questionData.category"
                          :options="categoryOptions"
                          :label="`Category`"
                          lazy-rules
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="questionData.subcategory"
                          :options="subcategoryOptions"
                          :label="`Subcategory`"
                          lazy-rules
                        />
                      </div>
                    </div>
                    <!-- input subject and chapter two select same row-->
                    <div class="row q-col-gutter-md q-mt-sm">
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="questionData.subject"
                          :options="subjectOptions"
                          :label="`Subject`"
                          lazy-rules
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="questionData.chapter"
                          :options="chapterOptions"
                          :label="`Chapter`"
                          lazy-rules
                        />
                      </div>
                    </div>
                    <!-- input faculty and discipline two select same row -->
                    <div class="row q-col-gutter-md q-mt-sm">
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="questionData.faculty"
                          :options="facultyOptions"
                          :label="`Faculty`"
                          lazy-rules
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="questionData.discipline"
                          :options="disciplineOptions"
                          :label="`Discipline`"
                          lazy-rules
                        />
                      </div>
                    </div>
                    <!-- question type -->
                    <q-select
                      class="q-mt-md"
                      filled
                      v-model="questionData.question_type"
                      :options="question_types"
                      :label="`Question Type`"
                      lazy-rules
                    />
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-7">
                <q-card>
                  <q-card-section>
                    <div class="text-h6">Options</div>
                  </q-card-section>
                  <q-card-section>
                    <option-card
                      v-for="(option, index) in questionData.options"
                      :key="index"
                      :option="option"
                      :index="index"
                      :question_type="question_type"
                    ></option-card>
                    <div class="q-mt-md">
                      <q-btn
                        label="Add Option"
                        type="submit"
                        color="primary"
                        @click="addOption"
                      />
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
import { useCounterStore } from "src/stores/example-store";

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
    const counterStore = useCounterStore();
    const questions = counterStore.questions;
    return {
      questions,
    };
  },
  data() {
    return {
      pageName: "Add/Edit Question",
      dense: true,
      questionData: {
        name: "Question 1",
        category: "Category 1",
        subcategory: "Subcategory 1",
        subject: "Subject 1",
        chapter: "Chapter 2",
        faculty: "Faculty 1",
        discipline: "Discipline 2",
        question_type: "MCQ",
        options: [
          {
            description: "This is an options data",
            is_correct: false,
            visible: true,
            hint: " This is demo hint",
            explanation: "This is demo explanation",
          },
        ],
      },
      model: "",
      expanded: false,
      categoryOptions: [
        { label: "Category 1", value: "category_1" },
        { label: "Category 2", value: "category_2" },
        { label: "Category 3", value: "category_3" },
      ],
      subcategoryOptions: [
        { label: "Subcategory 1", value: "subcategory_1" },
        { label: "Subcategory 2", value: "subcategory_2" },
        { label: "Subcategory 3", value: "subcategory_3" },
      ],
      subjectOptions: [
        { label: "Subject 1", value: "subject_1" },
        { label: "Subject 2", value: "subject_2" },
        { label: "Subject 3", value: "subject_3" },
      ],
      chapterOptions: [
        { label: "Chapter 1", value: "chapter_1" },
        { label: "Chapter 2", value: "chapter_2" },
        { label: "Chapter 3", value: "chapter_3" },
      ],
      facultyOptions: [
        { label: "Faculty 1", value: "faculty_1" },
        { label: "Faculty 2", value: "faculty_2" },
        { label: "Faculty 3", value: "faculty_3" },
      ],
      disciplineOptions: [
        { label: "Discipline 1", value: "discipline_1" },
        { label: "Discipline 2", value: "discipline_2" },
        { label: "Discipline 3", value: "discipline_3" },
      ],
      question_types: [
        { label: "Single Choice", value: "single_choice" },
        { label: "Multiple Choice", value: "multiple_choice" },
        { label: "True/False", value: "true_false" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitted");
      this.questions.push(this.questionData);
      this.$router.push("/Question");
    },
    onReset() {
      console.log("Reset");
      this.questionData = {
        name: "",
        category: "",
        subcategory: "",
        subject: "",
        chapter: "",
        faculty: "",
        discipline: "",
        question_type: "",
        options: [],
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
    onDescriptionChange(value) {
      this.name = value;
    },
  },
});
</script>

<style></style>
