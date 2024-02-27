<template>
  <div class="q-page q-pa-md flex justify-center items-center">
    <div>
      <q-card class="my-card" style="width: 100%; max-width: 1000px">
        <q-card-section>
          <div class="text-subtitle2" v-html="question.content"></div>
        </q-card-section>
        <q-card-actions align="center" vertical>
          <!-- Input field for answer options -->
          <q-input
            v-model="answer"
            :readonly="
              shouldShowAnswer &&
              question.options.data !== undefined &&
              question.options.data[0].answer !== undefined
            "
            debounce="1500"
            dense
            filled
            hint="Type Your Answer Here"
            rows="2"
            style="max-width: 100%; width: 100%"
            type="textarea"
          />

          <br />

          <br />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "WrittenAnswer",

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

  setup(props) {
    const shouldShowAnswer = props.showAnswer;
    const answer = ref(props.question.options.data[0].answer.data.explanation);
    return {
      shouldShowAnswer,
      answer,
    };
  },

});
</script>

<style>
.unanswered-question {
  border: 2px solid red;
}
</style>
