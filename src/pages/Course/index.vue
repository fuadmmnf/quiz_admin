<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Exams
          <div class="text-subtitle2">
            List of all {{route.params.type}} courses are shown here
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Course" icon="add"
                 :to="{name: 'course-create'}"/>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>

    <course-list :course-type="route.params.type"></course-list>
  </q-page>
</template>

<script>

import ExamList from "src/components/exam/ExamList.vue";
import SearchExams from "src/components/exam/SearchExams.vue";
import {useRoute} from "vue-router";
import CourseList from "components/course/CourseList.vue";

export default {
  name: "Course",
  components: {
    CourseList
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
