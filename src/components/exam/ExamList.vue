<template>
  <div class="q-pa-none">
    <div class="row q-col-gutter-md">
      <div class="col-12">
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
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <!-- table data -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="title" :props="props">
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="code" :props="props">
                    {{ props.row.code }}
                  </q-td>
                  <q-td key="duration_in_minutes" :props="props">
                    {{ props.row.duration_in_minutes }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <!-- users -->
                    <q-btn
                      color="primary"
                      size="md"
                      icon="people"
                      round
                      dense
                      flat
                      :to="`/Exam/${examType}/${props.row.id}/AttemptedUsers`"
                    />
                    <q-btn
                      color="primary"
                      size="md"
                      icon="edit"
                      round
                      dense
                      flat
                      :to="`/Exam/${props.row.id}`"
                    />
                    <q-btn
                      color="secondary"
                      size="md"
                      icon="edit_square"
                      round
                      dense
                      flat
                      :to="`/Exam/${props.row.id}/EditQuestions`"
                    />
                    <q-btn
                      color="secondary"
                      size="md"
                      icon="file_open"
                      round
                      dense
                      flat
                      :to="`/Exam/Checking/${props.row.id}/questions`"
                      v-if="examType === 'checking'"
                    />
                    <!-- if checking , mark as completed button -->
                    <q-btn
                      color="blue"
                      size="md"
                      icon="file_upload"
                      round
                      dense
                      flat
                      v-if="examType === 'checking'"
                    />
                    <q-btn
                      color="negative"
                      size="md"
                      icon="delete"
                      round
                      dense
                      flat
                    />
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
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";

export default {
  name: "ExamList",
  props: {
    examType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
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
        .get(
          `/exams?examConfiguration&search=status:${props.examType}&orderBy=id&sortedBy=desc&page=${page}`
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
    return { store, pagination, loading, fetchExams, onRequest, exams, filter };
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
