<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">
          Add/Edit Questions in Exam
          <div class="text-subtitle2">Exam : {{ examTitle }}</div>
        </div>

        <div class="row">
          <q-btn
            label="Update Question"
            color="orange"
            icon="add"
            class="q-ml-sm"
            @click="updateQuestionList"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <!-- search card with filtering option filter icon -->
    <q-expansion-item
      expand-separator
      icon="search"
      label="Search Questions"
      class="q-card"
    >
      <search-questions @search="onQuestionSearch"></search-questions>
      <q-card>
        <q-card-section>
          <!-- table -->
          <q-table
            v-if="searchResults.length > 0"
            :rows="searchResults"
            :columns="columns"
            :loading="loading"
            rows-per-page-options="[10]"
            row-key="id"
            wrap-cells
            class="q-mt-md"
            v-model:pagination="questionPagination"
            @request="onQuestionRequest"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="sn" :props="props">
                  {{ props.row.sn }}
                </q-td>
                <q-td key="content" :props="props" v-html="props.row.content">
                </q-td>
                <q-td key="type" :props="props">
                  {{ props.row.type }}
                </q-td>
                <q-td key="subject" :props="props">
                  {{
                    props.row.subject === null ||
                    props.row.subject === undefined
                      ? ""
                      : props.row.subject.data.name
                  }}
                </q-td>
                <q-td key="category" :props="props">
                  {{
                    props.row.category === null ||
                    props.row.category === undefined
                      ? ""
                      : props.row.category.data.name
                  }}
                </q-td>

                <q-td key="score" :props="props">
                  {{ props.row.score }}
                </q-td>
                <q-td key="unit_negative_mark" :props="props">
                  {{ props.row.unit_negative_mark }}
                </q-td>
                <q-td key="actions" :props="props" class="">
                  <q-btn
                    dense
                    flat
                    size="sm"
                    color="primary"
                    label="Add"
                    icon="add"
                    @click="addQuestion(props.row)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <q-separator />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-separator spaced=""></q-separator>
    <q-expansion-item
      expand-separator
      icon="search"
      label="Search Exams"
      class="q-card"
    >
      <search-exams @search="searchExams"></search-exams>
      <q-card>
        <q-card-section>
          <!-- table -->
          <q-table
            v-if="searchExamResults.length > 0"
            :rows="searchExamResults"
            :columns="examColumns"
            rows-per-page-options="[10]"
            row-key="id"
            wrap-cells
            class="q-mt-md"
            v-model:pagination="pagination"
            hide-pagination
          >
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
                <q-td key="actions" :props="props" class="">
                  <q-btn
                    dense
                    flat
                    size="sm"
                    color="primary"
                    label="Add"
                    icon="add"
                    @click="addExamQuestions(props.row)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <q-separator />
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-separator></q-separator>
    <!-- questions table with serial, type, name, cateogry, actions -->
    <q-table
      :rows="examQuestions"
      :columns="columns"
      :loading="loading"
      row-key="real_id"
      wrap-cells
      class="q-mt-md"
      :filter="filter"
      v-model:pagination="pagination"
      hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="sn" :props="props">
            {{ props.row.sn }}
          </q-td>
          <q-td key="content" :props="props" v-html="props.row.content"> </q-td>
          <q-td key="type" :props="props">
            {{ props.row.type }}
          </q-td>
          <q-td key="category" :props="props">
            {{
              props.row.category === null || props.row.category === undefined
                ? ""
                : props.row.category.data.name
            }}
          </q-td>
          <q-td key="subject" :props="props">
            {{
              props.row.subject === null || props.row.subject === undefined
                ? ""
                : props.row.subject.data.name
            }}
          </q-td>
          <q-td key="score" :props="props">
            {{ props.row.score }}
          </q-td>
          <q-td key="unit_negative_mark" :props="props">
            {{ props.row.unit_negative_mark }}
          </q-td>
          <q-td key="actions" :props="props" class="">
            <q-btn
              dense
              flat
              size="sm"
              color="primary"
              label="Edit"
              icon="edit"
              @click="edit(props.row.id)"
            />
            <q-btn
              dense
              flat
              size="sm"
              color="negative"
              label="Delete"
              icon="delete"
              @click="deleteRow(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "AddEditQuestions",
  components: {
    // define async
    SearchQuestions: defineAsyncComponent(() =>
      import("components/question/SearchQuestions.vue")
    ),
    SearchExams: defineAsyncComponent(() =>
      import("components/exam/SearchExams.vue")
    ),
  },
  setup() {
    const pagination = ref({
      page: 1,
      rowsPerPage: 200,
      rowsNumber: 0,
    });
    const questionPagination = ref({
      page: 1,
      rowsPerPage: 200,
      rowsNumber: 0,
    });
    const $q = useQuasar();
    const filter = ref("");
    const questionFilter = ref({
      keywords: "",
      type: "",
      category: "",
      subject: "",
      faculty: "",
    });
    const loading = ref(true);
    const examQuestions = ref([]);
    const route = useRoute();
    const searchResults = ref([]);
    const onQuestionSearch = (search) => {
      questionFilter.value = search;
      searchQuestions(search, 1);
    };

    const fetchExamQuestions = (page = 1) => {
      loading.value = true;
      api
        .get(
          "/exam-questions/" +
            route.params.id +
            "?include=question,question.subject,question.category&limit=0"
        )
        .then((res) => {
          examQuestions.value = [];
          if (res.data.data.length > 0) {
            res.data.data.forEach((item, index) => {
              item.question.data.sn = res.data.data.length - index;
              examQuestions.value.push(item.question.data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const searchQuestions = async (searchData, page = 1) => {
      await api
        .get(
          `/questions?include=category,subject&searchJoin=and&search=${
            questionFilter.value.type.length ? "type:" + questionFilter.value.type : ""
          }${
            questionFilter.value.keywords.length
              ? ";content:" + questionFilter.value.keywords
              : ""
          }${
            questionFilter.value.category && questionFilter.value.category.length
              ? ";category_id:" + questionFilter.value.category
              : ""
          }${
            questionFilter.value.subject && questionFilter.value.subject.length
              ? ";subject_id:" + questionFilter.value.subject
              : ""
          }&page=${page}&orderBy=id&sortedBy=desc&limit=50`
        )
        .then((res) => {
          const meta = res.data.meta.pagination;
          searchResults.value = [];
          if (res.data.data.length > 0) {
            res.data.data.forEach((item, index) => {
              item.sn =
                meta.total - (meta.current_page - 1) * meta.per_page - index;
              searchResults.value.push(item);
            });
          }
          questionPagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const onRequest = (props) => {
      fetchExamQuestions(props.pagination.page);
    };
    const onQuestionRequest = (props) => {
      searchQuestions(questionFilter.value, props.pagination.page);
    };
    return {
      pagination,
      filter,
      loading,
      fetchExamQuestions,
      examQuestions,
      onRequest,
      $q,
      searchQuestions,
      questionPagination,
      onQuestionRequest,
      questionFilter,
      onQuestionSearch,
      searchResults,
    };
  },
  data() {
    return {
      examTitle: "",
      selected: [],
      searchText: "",
      expanded: true,
      type: "",
      type_options: [
        { label: "Single Best Answer", value: "single-best-answer" },
        { label: "Multiple Answer", value: "multiple-answer" },
        { label: "Multiple True/False", value: "multiple-true-false" },
        { label: "Fill in the blanks", value: "written" },
        { label: "Essay", value: "written" },
      ],
      pagination: {
        sortBy: "name",
      },
      searchExamResults: [],
      filter: "",
      loading: false,
      show: false,
      columns: [
        {
          name: "sn",
          label: "SN",
          align: "left",
          field: "sn",
          sortable: true,
        },
        {
          name: "content",
          required: true,
          label: "Content",
          align: "left",
          field: "content",
          sortable: true,
        },
        {
          name: "type",
          required: true,
          label: "Type",
          align: "left",
          field: "type",
          sortable: true,
        },
        {
          name: "subject",
          label: "Subject",
          field: "Subject",
          align: "left",
          // sortable: true,
        },
        {
          name: "category",
          label: "Category",
          field: "Category",
          align: "left",
          // sortable: true,
        },
        {
          name: "score",
          required: true,
          label: "Score",
          align: "left",
          field: "score",
          sortable: true,
        },
        {
          name: "unit_negative_mark",
          required: true,
          label: "Negative Marks",
          align: "left",
          field: "unit_negative_mark",
          sortable: true,
        },
        {
          name: "actions",
          required: true,
          label: "Actions",
          align: "left",
          field: "actions",
          sortable: true,
        },
      ],
      examColumns: [
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: "title",
          sortable: true,
        },
        {
          name: "code",
          required: true,
          label: "Code",
          align: "left",
          field: "code",
          sortable: true,
        },
        {
          name: "duration_in_minutes",
          required: true,
          label: "Duration (In Minutes)",
          align: "left",
          field: "duration_in_minutes",
          sortable: true,
        },
        {
          name: "actions",
          required: true,
          label: "Actions",
          align: "left",
          field: "actions",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    getExamTitle() {
      api
        .get(`/exams/${this.$route.params.id}?filter=title`)
        .then((res) => {
          this.examTitle += res.data.data.title;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(id) {
      this.$router.push(`/question/` + id);
    },
    deleteRow(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to Delete?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.examQuestions.splice(
            this.examQuestions.findIndex((item) => item.id == id),
            1
          );
          this.$q.notify({
            color: "negative",
            message: "Question Deleted Successfully",
            icon: "delete",
          });
        })
        .onCancel(() => {
          console.log("cancel");
        });
    },

    searchExams(searchData) {
      if (
        searchData.keywords == "" &&
        searchData.category == "" &&
        searchData.type == "" &&
        searchData.faculty == "" &&
        searchData.subject == ""
      ) {
        this.searchExamResults = [];
        return;
      }
      api
        .get(
          `/exams?searchJoin=and&search=title:${searchData.keywords}&orderBy=id&sortedBy=desc&limit=0`
        )
        .then((res) => {
          this.searchExamResults = res.data.data;
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addQuestion(item) {
      if (
        this.examQuestions.findIndex((question) => question.id == item.id) ===
        -1
      ) {
        this.examQuestions.push(item);
        this.$q.notify({
          color: "positive",
          message: "Question Added Successfully",
          icon: "check",
        });
      } else {
        this.$q.notify({
          color: "negative",
          message: "Question Already Added",
          icon: "delete",
        });
      }
    },
    updateQuestionList() {
      var question_ids = [];
      this.examQuestions.map((item) => {
        question_ids.push(item.id);
      });
      api
        .post("/exam-questions", {
          exam_id: this.$route.params.id,
          question_ids: question_ids,
        })
        .then((res) => {
          this.$q.notify({
            color: "positive",
            message: "Question Added Successfully",
            icon: "check",
          });
          // this.searchResults.splice(this.searchResults.indexOf(item), 1);
          this.fetchExamQuestions();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addExamQuestions(item) {
      var question_ids = [];
      this.examQuestions.map((item) => {
        question_ids.push(item.id);
      });
      api
        .get(
          "/exam-questions/" +
            item.id +
            "?include=question,question.subject,question.category&limit=0"
        )
        .then(
          (res) => {
            if (res.data.data.length > 0) {
              res.data.data.forEach((item) => {
                if (
                  this.examQuestions.findIndex(
                    (question) => question.id == item.question.data.id
                  ) == -1
                ) {
                  this.examQuestions.push(item.question.data);
                }
              });
              this.$q.notify({
                color: "positive",
                message: "Questions Added Successfully",
                icon: "check",
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      if (question_ids.length > 0) {
      }
    },
  },
  async mounted() {
    this.getExamTitle();
    this.fetchExamQuestions();
    await this.searchQuestions(this.questionFilter, 1);
  },
});
</script>

<style></style>
