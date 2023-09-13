<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Upcoming Exams
          <div class="text-subtitle2">
            List of all upcoming exams are shown here
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Exam" icon="add" to="/Exam/add" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <exam-list :examType="'upcoming'"></exam-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import ExamList from "src/components/exam/ExamList.vue";

export default {
  name: "UpcomingExams",
  components: {
    ExamList,
  },
  setup() {
    const store = useStore();
    const exams = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const loading = ref(true);
    const filter = ref("");
    const fetchExams = (page = 1) => {
      loading.value = true;
      api
        .get(`/exams?include=subject&page=${page}`)
        .then((response) => {
          exams.value = response.data.data;
          const meta = response.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const onRequest = (props) => {
      fetchExams(props.pagination.page);
    };
    return { store, pagination, loading, fetchExams, onRequest, exams, filter };
  },
  mounted() {
    this.fetchExams();
  },
  data() {
    return {
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
