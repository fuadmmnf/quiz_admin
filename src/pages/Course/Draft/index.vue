<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Draft Course
          <div class="text-subtitle2">List of all Course are shown here</div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Course"
            icon="add"
            to="/course/add"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-separator spaced />

    <course-list :courseType="'draft'"></course-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import CourseList from "src/components/course/CourseList.vue";

export default {
  name: "Exam",
  components: {
    CourseList,
  },
  setup() {},
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style></style>
