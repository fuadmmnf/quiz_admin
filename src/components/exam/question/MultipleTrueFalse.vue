<template>
  <div class="q-page q-pa-md flex justify-center">
    <div>
      <q-card class="my-card" style="width: 100%; max-width: 1000px">
        <q-card-section>
          <div class="text-subtitle2" v-html="question.content"></div>
        </q-card-section>

        <q-card-actions class="grid-container">
          <div
            v-for="(option, index) in question.options.data"
            :key="option.id"
            class="grid-item"
          >
            <div class="question-row">
              <div class="serial-number">
                {{ String.fromCharCode(65 + index) }}.
              </div>
              <div class="question-content">{{ option.content }}</div>
              <div class="true-false-buttons q-ml-md">
                <q-btn
                  :color="
                    getOptionAnnotationColor(
                      option,
                      1
                    )
                  "
                  text-color="black"
                >
                  True
                </q-btn>
                <q-btn
                  :color="
                    getOptionAnnotationColor(
                      option,
                      0
                    )
                  "
                  class="q-ml-md"
                  text-color="black"
                >
                  False
                </q-btn>
              </div>
            </div>
          </div>
          <br />
          <br />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MultipleTrueFalse",

  props: {
    question: {
      type: Object,
      required: true,
    },
    showAnswer: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    getOptionAnnotationColor(option, idx) {
      return option.answer.data.is_correct === (idx === 1)
          ? "green"
          : "";
    },
  },
});
</script>

<style>
.grid-container {
  display: grid;
  gap: 1rem; /* Adjust this value to control the spacing between rows */
}

.grid-item {
  border: 1px solid #ccc; /* Add border for each item if desired */
  padding: 1rem; /* Adjust this value for spacing within each item */
}

.question-row {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  align-items: center;
  justify-items: center;
}

.serial-number {
  text-align: center;
}

.question-content {
  text-align: center;
}

.true-false-buttons {
  display: flex;

  justify-content: center;
  align-items: center;
  color: black;
}

.selected {
  background-color: #00bcd4; /* Change the background color for selected buttons */
  color: #fff; /* Change the text color for selected buttons */
}

.unanswered-question {
  border: 2px solid red;
}
</style>
