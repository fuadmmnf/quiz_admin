<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Questions in Exam</div>
      </q-card-section>
    </q-card>
    <!-- questions table with serial, type, name, cateogry, actions -->
    <q-table
      :rows="examQuestions"
      :columns="columns"
      row-key="real_id"
      class="q-mt-md"
      :filter="filter"
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
            {{ props.row.content.substring(0, 50) + "..." }}
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.type }}
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
              :to="`/Exam/Checking/${exam_id}/${exam_real_id}/questions/${props.row.id}/${props.row.real_id}/answers`"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ExamQuestions",
  data() {
    return {
      filter: "",
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
          name: "type",
          label: "Type",
          field: "type",
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
      examQuestions: [
        {
          id: 1,
          real_id: 1,
          content: "What is the capital of India?",
          type: "MCQ",
          score: 1,
          unit_negative_mark: 0.25,
        },
        {
          id: 2,
          real_id: 2,
          content: "What is the capital of India?",
          type: "MCQ",
          score: 1,
          unit_negative_mark: 0.25,
        },
        {
          id: 3,
          real_id: 3,
          content: "What is the capital of India?",
          type: "MCQ",
          score: 1,
          unit_negative_mark: 0.25,
        },
        {
          id: 4,
          real_id: 4,
          content: "What is the capital of India?",
          type: "MCQ",
          score: 1,
          unit_negative_mark: 0.25,
        },
        {
          id: 5,
          real_id: 5,
          content: "What is the capital of India?",
          type: "MCQ",
          score: 1,
          unit_negative_mark: 0.25,
        },
        {
          id: 6,
          real_id: 6,
          content: "What is the capital of India?",
          type: "MCQ",
          score: 1,
          unit_negative_mark: 0.25,
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
        "/Exam/Checking/" +
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
  computed: {
    examQuestions() {
      return this.$store.state.examQuestions;
    },
  },
});
</script>

<style></style>
