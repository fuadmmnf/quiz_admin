<template>
  <q-page class="text-center">
    <VerticalView  :exam-questions="exam_questions" />
  </q-page>
</template>

<script >
import {api} from "boot/axios";
import {computed, onMounted, ref} from "vue";
import VerticalView from "components/exam/VerticalView.vue";
import {useRoute} from "vue-router";
export default {
  components: { VerticalView},

  setup(){
    const exam_questions=ref([])
    const route=useRoute()
    const exam_id=computed(()=>route.params.exam_id)
    const fetchExamSolution=async ()=>{
      const params = {
        include: "question",
        customInclude: "option.answer",
        limit: 0,
      };
      const response =await api.get(`exam-questions/${exam_id.value}`, {
        params,
      });
      exam_questions.value=response.data.data
    }

    onMounted(()=>{
      fetchExamSolution()
    })

    return{
      exam_questions,
      exam_id
    }
  }
}

</script>

<style></style>
