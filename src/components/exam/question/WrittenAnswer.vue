<template>
  <div class="q-page q-pa-md flex justify-center items-center">
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

        <q-card-actions align="center" vertical>
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

<style scoped>
.unanswered-question {
  border: 2px solid red;
}
.option-title {
  font-size: 22px !important;
  line-height: 2.2rem;
}
</style>

