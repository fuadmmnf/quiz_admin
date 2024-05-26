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
          >
          </div>
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
          <!-- Radio buttons for answer options -->
          <div>
            <div class="q-layout" style="display: flex; flex-direction: column">
              <table>
                <tbody class="">
                <tr
                  v-for="(option, index) in question.options.data"
                  :key="option.id"
                  class="option-container"
                >
                  <q-avatar
                    :color="
                        getOptionAnnotationColor(
                          option
                        )
                      "
                    style="border: 1px solid #000"
                    text-color="black"
                    class="smaller-avatar"
                  >
                    {{ String.fromCharCode(65 + index) }}
                  </q-avatar>

                  <q-expansion-item
                    expand-separator
                    :label="option.content"
                    v-if="showAnswer && option.explanation"
                  >
                    <small>
                      {{ option.explanation }}
                    </small>
                  </q-expansion-item>

                  <label class="option-label" v-else
                  >{{ option.content }}
                  </label>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
        </q-card-section>

        <div></div>
      </q-card>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import {getOptionAnnotationColor} from "components/exam/utils";


export default defineComponent({
  name: "SingleBestAnswer",
  methods: {getOptionAnnotationColor},

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
});
</script>


<style scoped>
.my-card {
  border-radius: 10px;
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

.option-label {
  margin-left: 17px; /* Adjust this value to control the spacing between the radio button and label */
  text-align: left;
}

.unanswered-question {
  border: 2px solid red;
}

.smaller-avatar {
  width: 32px;
  height: 32px;
}

.option-title {
  font-size: 22px !important;
  line-height: 2.2rem;
}
</style>
