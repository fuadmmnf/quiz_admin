<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Course Question Bank
          <div class="text-subtitle2">
            List of all Course Question Bank are shown here
          </div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Question Bank"
            icon="add"
            @click="
              this.$router.push({
                path: '/questionbanks/add',
                query: { courseId: this.$route.params.courseId },
              })
            "
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";

export default {
  name: "CourseQuestionBankList",

  setup() {},
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style></style>
