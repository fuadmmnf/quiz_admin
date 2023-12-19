<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Course Exams
          <div class="text-subtitle2">
            List of all exams of the course are shown here
          </div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Exam"
            icon="add"
            @click="
              this.$router.push({
                path: '/exam/add',
                query: { courseId: courseId },
              })
            "
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
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
                      {{ props.row.status }}
                    </q-td>
                    <q-td key="actions" :props="props">
                      <q-btn
                        v-if="props.row.status !== 'draft'"
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
                      <q-btn
                        v-if="props.row.status === 'draft'"
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
                        :to="`/exam/${props.row.status}/${props.row.id}/attempted-users`"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          <strong class="">Show Exam Attempts</strong>
                        </q-tooltip>
                      </q-btn>
                      <q-btn
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
                      </q-btn>
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
                        v-if="props.row.status === 'checking'"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          <strong class="">Check exam written questions</strong>
                        </q-tooltip>
                      </q-btn>
                      <q-btn
                        color="blue"
                        size="md"
                        icon="file_upload"
                        round
                        dense
                        flat
                        v-if="props.row.status === 'checking'"
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
                        @click="onDelete(props.row.id)"
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
  </q-page>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "CourseExamList",

  components: {
    SearchExams: defineAsyncComponent(() =>
      import("src/components/exam/SearchExams.vue")
    ),
  },
  setup() {
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
    const courseId = ref("");
    const fetchExams = (page = 1) => {
      loading.value = true;
      api
        .get(
          `exams?search=course_id:${courseId.value}${
            filter.value.keywords.length
              ? ";title:" + filter.value.keywords
              : ""
          }${
            filter.value.faculty && filter.value.faculty.length
              ? ";faculty_id:" + filter.value.faculty
              : ""
          }${
            filter.value.subject && filter.value.subject.length
              ? ";subject_id:" + filter.value.subject
              : ""
          }${
            filter.value.category && filter.value.category.length
              ? ";category_id:" + filter.value.category
              : ""
          }&orderBy=id&sortedBy=desc&searchJoin=and&page=${page}`
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
      courseId,
    };
  },
  mounted() {
    this.courseId = this.$route.params.courseId;
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
          label: "Exam Status",
          field: (row) => row.status,
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
    onDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete this exam?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api
            .delete(`/exams/${id}`, {
              status: "completed",
            })
            .then((res) => {
              this.$q.notify({
                message: "Exam deleted successfully",
                color: "positive",
                icon: "check",
              });
              this.fetchExams();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
    },
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
          this.recalculateMarks(id);
          this.fetchExams();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    recalculateMarks(exam_id) {
      api
        .put(`/exam-markings`, { exam_id: exam_id, exam_attempt_ids: "*" })
        .then(() => {
          // confirm
          $q.notify({
            message: "Marks recalculated successfully",
            color: "green",
            icon: "check",
          });
        });
    },
  },
};
</script>
