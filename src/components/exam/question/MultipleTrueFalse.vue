<template>
  <div class="q-page q-pa-md flex justify-center">
    <div >
      <q-card
        class="my-card"
        :style="{
          width:
            $q.screen.width <= 576
              ? '100%'
              : $q.screen.width <= 992
              ? '80%'
              : '1000px',
        }"
      >
        <q-card-section class="bg-purple-12 text-white">
          <div
            class="text-subtitle2 option-title"
            v-html="question.content"
          ></div>
          <q-btn
            color="primary"
            size="md"
            icon="edit_square"
            round
            dense
            flat
            :to="`/question/${question.id}`"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong class="">Edit question</strong>
            </q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-section class="q-pa-md bg-blue-grey-11">
          <table>
            <tbody>
            <tr
              v-for="(option, index) in question.options.data"
              :key="option.id"
              class=""
            >
              <div class="row grid-item q-mb-md">
                <div class="col-1">
                  <div class="serial-number">
                    {{ String.fromCharCode(65 + index) }}.
                  </div>
                </div>
                <div class="col-8">
                  <q-expansion-item
                    expand-separator
                    :label="option.content"
                    v-if="showAnswer && option.explanation"
                  >
                    <small>
                      {{ option.explanation }}
                    </small>
                  </q-expansion-item>
                  <div class="question-content option-label" v-else>
                    {{ option.content }}
                  </div>
                </div>
                <div class="col-3">
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
            </tr>
            </tbody>
          </table>
          <br />
        </q-card-section>
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

<style scoped>
.grid-item {
  padding: 4px;
  margin-bottom: 5px;
  border-radius: 10px;
  justify-content: center;
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
.option-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 4px;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 10px;
  /* Adjust this value to control the spacing between options */
}

.selected {
  background-color: #00bcd4; /* Change the background color for selected buttons */
  color: #fff; /* Change the text color for selected buttons */
}

.unanswered-question {
  border: 2px solid red;
}
.option-title {
  font-size: 22px !important;
  line-height: 2.2rem;
}

.option-label {
  margin-left: 17px; /* Adjust this value to control the spacing between the radio button and label */
  text-align: left;
}
</style>
