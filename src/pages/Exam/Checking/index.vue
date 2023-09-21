<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Exams
          <div class="text-subtitle2">List of all Exams are shown here</div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Exam" icon="add" to="/Exam/add" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <exam-list :examType="'checking'"></exam-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import ExamList from "src/components/exam/ExamList.vue";

export default {
  name: "Checking",
  components: {
    ExamList,
  },
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    api
      .get(
        "/exams?include=subject&search=status:checking&orderBy=id&sortedBy=desc"
      )
      .then((response) => {
        this.exams = response.data.data;
      });
  },
  data() {
    return {
      exams: [],
      columns: [
        {
          name: "real_id",
          required: true,
          label: "S.No.",
          align: "left",
          field: (row) => row.real_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "code",
          align: "left",
          label: "Code",
          field: (row) => row.code,
          sortable: true,
        },
        {
          name: "duration_in_minutes",
          align: "left",
          label: "Duration (In Minutes)",
          field: (row) => row.duration_in_minutes,
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: (row) => row.actions,
        },
      ],
    };
  },
};
</script>

<style></style>
