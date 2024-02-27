<template>
  <div class="q-page q-pa-md flex justify-center items-center">
    <div>
      <q-card class="my-card" style="width: 100%; max-width: 1000px">
        <div class="">
          <q-stepper
            ref="stepper"
            v-model="currentQuestionLevel"
            animated
            color="primary"
          >
            <q-step
              v-for="(_, index) in Array(calculateNumQuestions(question))"
              :key="question.id + '-' + index"
              :name="question.id + '-' + index + 1"
              :title="getNestedQuestion(question, index + 1).type"
            >
              <!--              :done="step > index + 1"-->

              <component
                :is="
                  resolveQuestionComponent(
                    getNestedQuestion(question, index + 1).type
                  )
                "
                :question="getNestedQuestion(question, index + 1)"
                :show-answer="showNestedAnswer"
              ></component>
            </q-step>

            <template #navigation>
              <q-stepper-navigation>
                <q-btn
                  v-if="canProceedToNextStep()"
                  class="q-ml-sm"
                  color="primary"
                  flat
                  label="Previous"
                  @click="
                    () => {
                      currentQuestionLevel = currentQuestionLevel + 1;
                    }
                  "
                />
                <q-btn
                  v-if="currentQuestionLevel > 0"
                  color="primary"
                  label="Next"
                  @click="
                    () => {
                      currentQuestionLevel = currentQuestionLevel - 1;
                    }
                  "
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import SingleBestAnswer from "components/exam/question/SingleBestAnswer.vue";
import WrittenAnswer from "components/exam/question/WrittenAnswer.vue";
import MultipleTrueFalse from "components/exam/question/MultipleTrueFalse.vue";
import MultiLayer2 from "components/exam/question/MultiLayer2.vue";
import MultipleAnswer from "components/exam/question/MultipleAnswer.vue";
import {resolveQuestionComponent} from "components/exam/utils";


export default defineComponent({
  name: "MultiLayer1",
  components: {
    SingleBestAnswer,
    WrittenAnswer,
    MultipleTrueFalse,
    MultiLayer2,
    MultipleAnswer,
  },

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
    const store = useExamStore();
    const showNestedAnswer = props.showAnswer;
    const lastSolvedLevel = ref(0);
    const currentQuestionLevel = ref(0);
    // onMounted(() => {
    //   // console.log(tableRefs.value[tab.value]);
    // });

    return {
      store,
      showNestedAnswer,
      lastSolvedLevel,
      currentQuestionLevel,
      resolveQuestionComponent,
    };
  },
  computed: {
    totalSubQuestions: function () {
      // `this` points to the vm instance
      return this.calculateNumQuestions(this.question);
    },
    currentQuestion: function () {
      return this.getNestedQuestion(
        this.question,
        this.currentQuestionLevel + 1
      );
    },
  },
  methods: {
    canProceedToNextStep() {
      let proceed = false;
      proceed =
        this.currentQuestionLevel < this.totalSubQuestions - 1 &&
        (this.currentQuestion.options.data[0].answer !== undefined ||
          this.store.getAnswers(this.currentQuestion.id).length > 0);

      // if (widget.onAnswerChange != null) {
      //   widget.onAnswerChange!(
      //     is_question_answered:
      //     currentQuestionLevel == totalSubQuestions - 1 &&
      //   ExamAnswerTracker()
      //     .getAnswers(questionId: currentQuestion.id) !=
      //   null &&
      //   ExamAnswerTracker()
      //     .getAnswers(questionId: currentQuestion.id)!
      // .isNotEmpty);
      // }

      return proceed;
    },

    getNestedQuestion(q, depth) {
      if (depth > 0) {
        return this.getNestedQuestion(q.children.data[0], depth - 1);
      }

      return q;
    },

    calculateNumQuestions(q) {
      if (q.children.data.length > 0) {
        return 1 + this.calculateNumQuestions(q.children.data[0]);
      }
      return 0;
    },
  },
});
</script>

<style></style>
