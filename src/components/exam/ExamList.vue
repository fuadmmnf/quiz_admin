<template>
  <div class="q-pa-none">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-expansion-item
          icon="search"
          label="Search Exams"
          default-open
          class="bg-grey-1"
        >
          <div class="q-pa-md">
            <SearchExams @search="onSearch" />
          </div>
        </q-expansion-item>

        <q-separator spaced="" />
        <q-card>
          <q-card-section>
            <!-- List of Exams -->
            <q-table
              :columns="columns"
              :rows="exams"
              row-key="real_id"
              rows-per-page-options="[10]"
              :loading="loading"
              wrap-cells
              no-data-label="No data available"
              class="shadow-0"
              v-model:pagination="pagination"
              @request="onRequest"
            >
              <!-- table data -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="title" :props="props">
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="start_time" :props="props">
                    {{ props.row.visibility_start_time }}
                  </q-td>
                  <q-td key="end_time" :props="props">
                    {{ props.row.visibility_end_time }}
                  </q-td>
                  <q-td key="duration_in_minutes" :props="props">
                    {{ props.row.duration_in_minutes }}
                  </q-td>
                  <q-td key="course" :props="props">
                    {{ props.row.id }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <!-- move to draft -->
                    <q-btn
                      v-if="examType != 'draft'"
                      color="primary"
                      size="md"
                      icon="drafts"
                      round
                      dense
                      flat
                      @click="moveToDraft(props.row.id)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Move to draft</strong>
                      </q-tooltip>
                    </q-btn>
                    <!-- publish exam -->
                    <q-btn
                      v-if="examType === 'draft'"
                      color="green"
                      size="md"
                      icon="publish"
                      round
                      dense
                      flat
                      @click="publishExam(props.row.id)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Publish Exam</strong>
                      </q-tooltip>
                    </q-btn>
                    <!-- users -->
                    <q-btn
                      color="primary"
                      size="md"
                      icon="people"
                      round
                      dense
                      flat
                      :to="`/exam/${examType}/${props.row.id}/attempted-users`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Show Exam Attempts</strong>
                      </q-tooltip>
                    </q-btn>
                    <!-- <q-btn
                      color="primary"
                      size="md"
                      icon="edit"
                      round
                      dense
                      flat
                      :to="`/Exam/${props.row.id}`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Edit Exam</strong>
                      </q-tooltip>
                    </q-btn> -->
                    <q-btn
                      color="secondary"
                      size="md"
                      icon="edit_square"
                      round
                      dense
                      flat
                      :to="`/exam/${props.row.id}/edit-questions`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Edit exam questions</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="secondary"
                      size="md"
                      icon="file_open"
                      round
                      dense
                      flat
                      :to="`/exam/checking/${props.row.id}/questions`"
                      v-if="examType === 'checking'"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Check exam written questions</strong>
                      </q-tooltip>
                    </q-btn>
                    <!-- if checking , mark as completed button -->
                    <q-btn
                      color="blue"
                      size="md"
                      icon="file_upload"
                      round
                      dense
                      flat
                      v-if="examType === 'checking'"
                      @click="markAsCompleted(props.row.id)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Mark as completed</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="negative"
                      size="md"
                      icon="delete"
                      round
                      dense
                      flat
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Delete Exam</strong>
                      </q-tooltip>
                    </q-btn>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "ExamList",
  props: {
    examType: {
      type: String,
      required: true,
    },
  },
  components: {
    SearchExams: defineAsyncComponent(() =>
      import("src/components/exam/SearchExams.vue")
    ),
  },
  setup(props) {
    const store = useStore();
    const { $q } = useQuasar();
    const exams = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const loading = ref(true);
    const filter = ref({
      keywords: "",
      category: "",
      subject: "",
      faculty: "",
    });
    const onSearch = (search) => {
      filter.value = search;
      fetchExams();
    };
    const fetchExams = (page = 1) => {
      loading.value = true;
      api
        .get(
          `/exams?include=examConfiguration&searchJoin=and&search=status:${
            props.examType
          }${
            filter.value.keywords.length
              ? ";title:" + filter.value.keywords
              : ""
          }&orderBy=id&sortedBy=desc&page=${page}`
        )
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

    return {
      store,
      pagination,
      loading,
      fetchExams,
      onRequest,
      exams,
      filter,
      onSearch,
    };
  },
  mounted() {
    this.fetchExams();
  },
  data() {
    return {
      columns: [
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
          name: "start_time",
          align: "left",
          label: "Start Time",
          field: (row) => row.visibility_start_time,
          sortable: true,
        },
        {
          name: "end_time",
          align: "left",
          label: "End Time",
          field: (row) => row.visibility_end_time,
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
          name: "course",
          align: "left",
          label: "Course",
          field: (row) => row.id,
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
  methods: {
    moveToDraft(id) {
      api
        .patch(`/exams/${id}/status`, {
          status: "draft",
        })
        .then((res) => {
          this.$q.notify({
            message: "Exam moved to draft successfully",
            color: "positive",
            icon: "check",
          });
          this.fetchExams();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    publishExam(id) {
      api
        .patch(`/exams/${id}/status`, {
          status: "upcoming",
        })
        .then((res) => {
          this.$q.notify({
            message: "Exam published successfully",
            color: "positive",
            icon: "check",
          });
          this.fetchExams();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    markAsCompleted(id) {
      api
        .patch(`/exams/${id}/status`, {
          status: "completed",
        })
        .then((res) => {
          this.$q.notify({
            message: "Exam marked as completed successfully",
            color: "positive",
            icon: "check",
          });
          this.fetchExams();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
