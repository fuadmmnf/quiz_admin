<template>
  <div class="q-mt-md">
    <div v-for="(q, index) in examQuestions" :key="q.id">
      <br />
      <div class="question-number">
        Question:{{ index + 1 }}/ {{ examQuestions.length }}
      </div>
      <component
        :is="resolveQuestionComponent(q.question.data.type)"
        v-if="
          !['multilayered-type-1', 'multilayered-type-2'].includes(
            q.question.data.type
          )
        "
        :ref="(el) => questionRefs.push(el)"
        :question="q.question.data"
        :show-answer="shouldShowAnswer"
      />
      <!--        @answer-selected="onAnswerSelected"-->
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import {
  defineComponent, onMounted,
  ref
} from "vue";
import SingleBestAnswer from "components/exam/question/SingleBestAnswer.vue";
import WrittenAnswer from "components/exam/question/WrittenAnswer.vue";
import MultipleTrueFalse from "components/exam/question/MultipleTrueFalse.vue";
import MultiLayer2 from "components/exam/question/MultiLayer2.vue";
import MultiLayer1 from "components/exam/question/MultiLayer1.vue";
import MultipleAnswer from "components/exam/question/MultipleAnswer.vue";
import {resolveQuestionComponent} from "components/exam/utils";


export default defineComponent({
  components: {
    SingleBestAnswer,
    WrittenAnswer,
    MultipleTrueFalse,
    MultiLayer2,
    MultiLayer1,
    MultipleAnswer,
  },
  props: {
    examQuestions:{
      required: true,
    }
  },
  setup(props) {
    const questionRefs = ref([]);
    const shouldShowAnswer = true;
    onMounted(()=>{
      console.log("Exam Questions:")
      console.log(props.examQuestions)
    })
    return {
      shouldShowAnswer,
      resolveQuestionComponent,
      questionRefs,
    };
  },
});
</script>

<style>
.fixed-timer {
  position: fixed;
  width: 400px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px;
  top: 0;
  left: 50%; /* Center horizontally */
  transform: translateX(-50%);
  z-index: 1000; /* Ensure it appears above other content */
}
</style>
