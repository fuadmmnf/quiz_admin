<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Written Questions in Exam</div>
      </q-card-section>
    </q-card>
    <!-- questions table with serial, type, name, cateogry, actions -->
    <q-table
      :rows="examQuestions"
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
          <q-td key="content" :props="props">
            {{ props.row.content.substring(0, 70) + "..." }}
          </q-td>
          <q-td key="score" :props="props">
            {{ props.row.score }}
          </q-td>
          <q-td key="unit_negative_mark" :props="props">
            {{ props.row.unit_negative_mark }}
          </q-td>
          <q-td key="actions" :props="props" class="">
            <q-btn
              outline
              size="sm"
              color="primary"
              label="Answers"
              icon="edit"
              :to="`/exam/checking/${exam_id}/questions/${props.row.id}/answers`"
            ></q-btn>
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

export default defineComponent({
  name: "ExamQuestions",
  setup() {
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const loading = ref(false);
    const filter = ref("");
    const route = useRoute();
    const exam_id = route.params.id;
    const examQuestions = ref([]);

    const fetchExamQuestions = (page = 1) => {
      loading.value = true;
      api
        .get(
          `/exam-questions/${exam_id}?include=question&search=question.type:written&searchJoin=and&random=false&page=${page}`
        )
        .then((res) => {
          examQuestions.value = [];
          if (res.data.data.length > 0) {
            res.data.data.forEach((item) => {
              examQuestions.value.push(item.question.data);
            });
          }
          const meta = res.data.meta.pagination;
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
      fetchExamQuestions(props.pagination.page);
    };
    return {
      pagination,
      loading,
      filter,
      examQuestions,
      fetchExamQuestions,
      onRequest,
    };
  },
  data() {
    return {
      exam_id: this.$route.params.id,
      exam_real_id: this.$route.params.real_id,
      columns: [
        {
          name: "content",
          label: "Question",
          field: "content",
          align: "center",
          sortable: true,
        },
        {
          name: "score",
          label: "Score",
          field: "score",
          align: "center",
          sortable: true,
        },
        {
          name: "unit_negative_mark",
          label: "Unit Negative Mark",
          field: "unit_negative_mark",
          align: "center",
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "center",
        },
      ],
    };
  },
  methods: {
    deleteRow() {
      this.$q
        .dialog({
          title: "Confirm Delete",
          message: "Are you sure you want to delete this question?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.notify({
            color: "negative",
            message: "Question deleted",
            icon: "delete",
          });
        });
    },
    showAnswers(id, real_id) {
      this.$router.push(
        "/exam/checking/" +
          this.$route.params.id +
          "/" +
          this.$route.params.real_id +
          "/questions/" +
          1 +
          "/" +
          1 +
          "/answers"
      );
    },
  },
  mounted() {
    this.fetchExamQuestions();
  },
});
</script>

<style></style>
