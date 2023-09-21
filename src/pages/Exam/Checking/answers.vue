<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Written answers of students</div>
        <div class="row items-center">
          <q-btn
            color="green"
            size="md"
            icon="add"
            label="Submit Marks"
            @click="markAttemptedAnswers"
          />
        </div>
      </q-card-section>
    </q-card>
    <!-- questions table with serial, type, name, cateogry, actions -->
    <q-table
      :rows="writtenAnswers"
      :columns="columns"
      row-key="real_id"
      class="q-mt-md"
      :filter="filter"
      rows-per-page-options="[10]"
      no-data-label="No data available"
      :loading="loading"
      wrap-cells
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="content" :props="props"> {{ props.row.content }} </q-td>
          <q-td key="obtained_marks" :props="props" class="row">
            <!-- input marks, save button same line -->
            <q-input
              outlined
              dense
              v-model="props.row.obtained_marks"
              type="number"
              min="0"
              max="10"
              step="0.5"
              class="col-12"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "ExamAnswers",
  setup() {
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const loading = ref(false);
    const filter = ref("");
    const writtenAnswers = ref([]);
    const route = useRoute();
    const $q = useQuasar();

    const fetchWrittenAnswers = async (page) => {
      loading.value = true;
      api
        .get(
          `/exam-attempt-answers?search=exam_id:${route.params.exam_id};question_id:${route.params.id}&searchJoin=and&orderBy=id&sortedBy=desc&page=${page}`
        )
        .then((res) => {
          writtenAnswers.value = res.data.data;
          const meta = res.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const onRequest = (props) => {
      fetchWrittenAnswers(props.pagination.page);
    };

    const markAttemptedAnswers = async () => {
      loading.value = true;
      const gradings = [];
      writtenAnswers.value.map((answer) => {
        if (answer.obtained_marks != null)
          gradings.push({
            exam_attempt_answer_id: answer.id,
            obtained_marks: Number(answer.obtained_marks),
          });
      });
      api
        .patch("/exam-attempt-answers/obtained_marks", { gradings })
        .then((res) => {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Marks submitted successfully",
            position: "top",
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    return {
      pagination,
      loading,
      filter,
      writtenAnswers,
      onRequest,
      fetchWrittenAnswers,
      markAttemptedAnswers,
    };
  },
  data() {
    return {
      columns: [
        {
          name: "content",
          required: true,
          label: "Content",
          align: "left",
          field: (row) => row.content,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "obtained_marks",
          required: true,
          label: "Obtained Marks",
          align: "center",
          field: (row) => row.obtained_marks,
          format: (val) => `${val}`,
        },
      ],
    };
  },
  mounted() {
    this.fetchWrittenAnswers();
  },
};
</script>

<style></style>
