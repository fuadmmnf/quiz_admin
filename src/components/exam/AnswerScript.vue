<template>
  <q-page class="text-center">
    <p>Hello World</p>
    <div class="q-ma-md">
      <div class="q-gutter-md q-mb-md">
        <div>
          <div>
            <!--                <p>-->
            <!--                  Question {{ store.currentQuestionIndex + 1 }} out of-->
            <!--                  {{ store.examQuestions.length }}-->
            <!--                </p>-->
          </div>
        </div>
      </div>
    </div>

    <!--        <VerticalView-->
    <!--          v-if="store.examConfig.data.question_display_type === 'vertical'"-->
    <!--        />-->
    <!--        <HorizontalView v-else @attempt-submitted="handleQuizCompletion" />-->
  <VerticalView   :exam-questions="exam_questions"/>
  </q-page>
</template>

<script setup>
import {api} from "boot/axios";
import {onMounted, ref} from "vue";
import VerticalView from "components/exam/VerticalView.vue";

const exam_questions=ref([])
const exam_id=ref('ODQNWb31ja48Jw2P')
const fetchExamSolution=async ()=>{
  const params = {
    include: "question",
    customInclude: "option.answer",
    limit: 0,
  };
  const response =await api.get(`exam-questions/${exam_id.value}`, {
    params,
  });
  console.log(response.data)
  exam_questions.value=response.data.data
}

onMounted(()=>{
  fetchExamSolution()
})
</script>

<style></style>
