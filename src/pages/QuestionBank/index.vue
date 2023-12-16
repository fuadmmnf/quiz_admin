<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Question Banks
          <div class="text-subtitle2">
            List of all question banks are shown here
          </div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Question Bank"
            icon="add"
            to="/question-bank-list/add"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <question-bank-list></question-bank-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import QuestionBankList from "src/components/question-bank/QuestionBankList.vue";
import SearchExams from "src/components/exam/SearchExams.vue";

export default {
  name: "QuestionBank",
  components: {
    QuestionBankList,
    SearchExams,
  },
  setup() {},
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style></style>
