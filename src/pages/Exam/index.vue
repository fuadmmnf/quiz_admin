<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          {{route.query.course_id?.length? "Course ": ""}} {{route.query.course_name?.length? `(${route.query.course_name.replace("%20", " ")}) -`: ""}} Exams
          <div class="text-subtitle2">
            List of {{route.params.status}} exams are shown here
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Exam" icon="add"
                 :to="{name: 'exam-create', query: route.query}"/>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>

    <exam-list :status="route.params.status"></exam-list>
  </q-page>
</template>

<script>

import ExamList from "src/components/exam/ExamList.vue";
import SearchExams from "src/components/exam/SearchExams.vue";
import {useRoute} from "vue-router";

export default {
  name: "Exam",
  components: {
    ExamList,
    SearchExams,
  },
  setup() {
    const route = useRoute();
    return {route};
  },
  mounted() {
  },
};
</script>

<style></style>
