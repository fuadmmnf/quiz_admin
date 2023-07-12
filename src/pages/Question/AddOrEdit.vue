<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit Question</div>
        <div class="row">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
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
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-lg">
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
                      v-model="name"
                      :label="`Question Name*`"
                      :hint="`Question must be unique`"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                    <!-- category and subcategory in the same row -->
                    <div class="row q-col-gutter-md q-mt-sm">
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="model"
                          :options="options"
                          :label="`Category`"
                          lazy-rules
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="model"
                          :options="options"
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
                          v-model="model"
                          :options="options"
                          :label="`Subject`"
                          lazy-rules
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="model"
                          :options="options"
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
                          v-model="model"
                          :options="options"
                          :label="`Faculty`"
                          lazy-rules
                        />
                      </div>
                      <div class="col-6">
                        <q-select
                          filled
                          v-model="model"
                          :options="options"
                          :label="`Discipline`"
                          lazy-rules
                        />
                      </div>
                    </div>
                    <!-- question type -->
                    <q-select
                      class="q-mt-md"
                      filled
                      v-model="question_type"
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

export default defineComponent({
  name: "AddOrEditQuestion",
  components: {
    OptionCard: defineAsyncComponent(() =>
      import("components/Question/OptionCard.vue")
    ),
  },
  data() {
    return {
      pageName: "Add/Edit Question",
      dense: true,
      name: "",
      model: "",
      expanded: false,
      options: [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" },
        { label: "Option 4", value: "opt4" },
      ],
      question_types: [
        { label: "Single Choice", value: "single_choice" },
        { label: "Multiple Choice", value: "multiple_choice" },
        { label: "True/False", value: "true_false" },
      ],
      question_type: "",
      questionData: {
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
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitted");
    },
    onReset() {
      console.log("Reset");
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
