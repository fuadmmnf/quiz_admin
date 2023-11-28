<template>
  <div class="q-pa-none">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-expansion-item
          icon="search"
          label="Search Question Bank"
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
            <!-- List of Question Bank -->
            <q-table
              :columns="columns"
              :rows="questionBanks"
              row-key="real_id"
              :loading="loading"
              wrap-cells
              no-data-label="No data available"
              class="shadow-0"
            >
              <!-- table data -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    key="title"
                    :props="props"
                    @click="onView(props.row)"
                    style="cursor: pointer"
                  >
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="title" :props="props">
                    {{ props.row.code }}
                  </q-td>
                  <q-td key="category" :props="props">
                    {{
                      props.row.category === null ||
                      props.row.category === undefined
                        ? ""
                        : props.row.category
                    }}
                  </q-td>
                  <q-td key="subject" :props="props">
                    {{
                      props.row.subject === null ||
                      props.row.subject === undefined
                        ? ""
                        : props.row.subject
                    }}
                  </q-td>
                  <q-td key="faculty" :props="props">
                    {{
                      props.row.faculty === null ||
                      props.row.faculty === undefined
                        ? ""
                        : props.row.faculty
                    }}
                  </q-td>
                  <q-td key="visibility_start_time" :props="props">
                    {{ props.row.visibility_start_time }}
                  </q-td>
                  <q-td key="visibility_end_time" :props="props">
                    {{ props.row.visibility_end_time }}
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
                      :to="`/#`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">See Buyers</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="primary"
                      size="md"
                      icon="edit"
                      round
                      dense
                      flat
                      to="`/#`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Edit Question Bank</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="secondary"
                      size="md"
                      icon="edit_square"
                      round
                      dense
                      flat
                      :to="`/#`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Edit question bank</strong>
                      </q-tooltip>
                    </q-btn>

                    <!-- if checking , mark as completed button -->
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
                        <strong class="">Delete Question Bank</strong>
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
  name: "QuestionBankList",
  components: {
    SearchExams: defineAsyncComponent(() =>
      import("src/components/exam/SearchExams.vue")
    ),
  },
  setup(props) {
    const store = useStore();
    const { $q } = useQuasar();
    const questionBanks = ref([]);
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
      fetchQuestionBanks();
    };
    const fetchQuestionBanks = (page = 1) => {
      loading.value = true;
      //   api
      //     .get(
      //       `/exams?include=examConfiguration,subject,category,faculty,course&searchJoin=and&search=status:${
      //         props.examType
      //       }${
      //         filter.value.keywords.length
      //           ? ";title:" + filter.value.keywords
      //           : ""
      //       }${
      //         filter.value.faculty && filter.value.faculty.length
      //           ? ";faculty_id:" + filter.value.faculty
      //           : ""
      //       }${
      //         filter.value.subject && filter.value.subject.length
      //           ? ";subject_id:" + filter.value.subject
      //           : ""
      //       }${
      //         filter.value.category && filter.value.category.length
      //           ? ";category_id:" + filter.value.category
      //           : ""
      //       }&orderBy=id&sortedBy=desc&page=${page}`
      //     )
      //     .then((response) => {
      //       exams.value = response.data.data;
      //       const meta = response.data.meta.pagination;
      //       pagination.value = {
      //         page: meta.current_page,
      //         rowsPerPage: meta.per_page,
      //         rowsNumber: meta.total,
      //       };
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
      //     .finally(() => {
      //       loading.value = false;
      //     });

      questionBanks.value = [
        {
          title: "Question Bank 1",
          code: "Q001",
          category: "Category 1",
          subject: "Subject 1",
          faculty: "Faculty 1",
          visibility_start_time: "2023-06-01",
          visibility_end_time: "2023-06-30",
          real_id: 1,
        },

        {
          title: "Question Bank 2",
          code: "Q002",
          category: "Category 2",
          subject: "Subject 2",
          faculty: "Faculty 2",
          visibility_start_time: "1023-06-01",
          visibility_end_time: "1023-06-30",
          real_id: 2,
        },

        {
          title: "Question Bank 3",
          code: "Q003",
          category: "Category 3",
          subject: "Subject 3",
          faculty: "Faculty 3",
          visibility_start_time: "2024-06-21",
          visibility_end_time: "2024-08-30",
          real_id: 3,
        },
      ];
      loading.value = false;
    };

    const onRequest = (props) => {
      fetchQuestionBanks(props.pagination.page);
    };

    return {
      store,
      pagination,
      loading,
      fetchQuestionBanks,
      onRequest,
      questionBanks,
      filter,
      onSearch,
    };
  },
  mounted() {
    this.fetchQuestionBanks();
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
          // sortable: true,
        },
        {
          name: "code",
          align: "left",
          label: "Code",
          field: (row) => row.code,
          // sortable: true,
        },
        {
          name: "category",
          align: "left",
          label: "Category",
          field: (row) => row.category,
          // sortable: true,
        },
        {
          name: "subject",
          align: "left",
          label: "Subject",
          field: (row) => row.subject,
          // sortable: true,
        },
        {
          name: "faculty",
          align: "left",
          label: "Faculty",
          field: (row) => row.faculty,
          // sortable: true,
        },
        {
          name: "visibility_start_time",
          align: "left",
          label: "Start Time",
          field: (row) => row.visibility_start_time,
          // sortable: true,
        },
        {
          name: "visibility_end_time",
          align: "left",
          label: "End Time",
          field: (row) => row.visibility_end_time,
          //sortable: true,
        },

        {
          name: "actions",
          label: "Actions",
          align: "center",
          field: (row) => row.actions,
        },
      ],
    };
  },
  methods: {
    onView(row) {
      this.$router.push("/question-bank/" + row.real_id);
    },
  },
};
</script>
