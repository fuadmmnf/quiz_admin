<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Ongoing Exams
          <div class="text-subtitle2">
            List of all ongoing exams are shown here
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Exam" icon="add" to="/exam/add" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <exam-list :examType="'ongoing'"></exam-list>
  </q-page>
</template>

<script>

import ExamList from "src/components/exam/ExamList.vue";

export default {
  name: "Ongoing",
  components: {
    ExamList,
  },
  setup() {},
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style></style>
