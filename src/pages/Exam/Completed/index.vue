<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Completed Exams
          <div class="text-subtitle2">
            List of all completed exams are shown here
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Exam" icon="add" to="/Exam/add" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <exam-list :examType="'completed'"></exam-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import ExamList from "src/components/exam/ExamList.vue";

export default {
  name: "CompletedExams",
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
