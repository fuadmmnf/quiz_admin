<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Questions
          <div class="text-subtitle2">List of all questions are shown here</div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Question"
            icon="add"
            to="/question/add"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>
    <q-expansion-item
      expand-separator
      icon="search"
      label="Search Questions"
      class="q-card"
    >
      <search-questions @search="onSearch"></search-questions>
    </q-expansion-item>
    <q-separator spaced/>

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <!-- List of Questions -->
              <q-table
                :columns="columns"
                :rows="questions"
                :loading="loading"
                row-key="real_id"
                wrap-cells
                no-data-label="No data available"
                class="shadow-0"
                @request="onRequest"
                v-model:pagination="pagination"
              >
                <!-- table data -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <!-- serial -->

                    <!--                    <q-td key="content" :props="props">-->
                    <!--                      {{-->
                    <!--                        props.row.content.length > 50-->
                    <!--                          ? props.row.content.substring(0, 50) + "..."-->
                    <!--                          : props.row.content-->
                    <!--                      }}-->
                    <!--                    </q-td>-->
                    <q-td
                      key="content"
                      :props="props"
                      v-html="props.row.content"
                    >
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
                    <q-td key="actions" :props="props">
                      <q-btn
                        color="primary"
                        size="sm"
                        icon="edit"
                        round
                        dense
                        flat
                        :to="`/question/${props.row.id}`"
                      />

                      <q-btn
                        color="negative"
                        size="sm"
                        icon="delete"
                        round
                        dense
                        flat
                        @click="onDelete(props.row)"
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
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent, ref, computed} from "vue";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import SearchQuestions from "components/question/SearchQuestions.vue";

export default defineComponent({
  name: "Question",
  setup() {
    const {$q} = useQuasar();
    const store = useStore();
    const questions = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({
      type: "",
      keywords: "",
      category: "",
      subject: "",
    });
    const fetchQuestions = (page = 1) => {
      loading.value = true;
      console.log(searchData.value);
      const searchParams = [];

      if (searchData.value.type.length) {
        searchParams.push("type:" + searchData.value.type);
      }
      if (searchData.value.keywords.length) {
        searchParams.push("content:" + searchData.value.keywords);
      }
      if (searchData.value.category && searchData.value.category.length) {
        searchParams.push("category_id:" + searchData.value.category);
      }
      if (searchData.value.subject && searchData.value.subject.length) {
        searchParams.push("subject_id:" + searchData.value.subject);
      }
      const searchQuery = searchParams.length ? `&search=${searchParams.join(";")}` : "";
      api
        .get(
          `/questions?include=category,subject&searchJoin=and&${searchQuery}&page=${page}&orderBy=id&sortedBy=desc&limit=50`
        )
        .then((response) => {
          questions.value = response.data.data;
          const meta = response.data.meta.pagination;
          console.log(meta.current_page);
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .finally(() => {
          loading.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const loading = ref(true);

    const onRequest = (props) => {
      fetchQuestions(props.pagination.page);
    };

    return {
      store,
      pagination,
      loading,
      fetchQuestions,
      onRequest,
      questions,
      $q,
      searchData,
    };
  },
  data() {
    return {
      name: "Question",
      customTdRefs: {},
      columns: [
        {
          name: "content",
          label: "Content",
          field: "content",
          align: "left",
          // sortable: true,
        },
        {
          name: "type",
          label: "Type",
          field: "type",
          align: "left",
          // sortable: true,
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
          label: "Score",
          field: "score",
          align: "left",
          // sortable: true,
        },
        {
          name: "unit_negative_mark",
          label: "Negative",
          field: "unit_negative_mark",
          align: "left",
          // sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
          // sortable: false,
        },
      ],
      //table data
    };
  },
  components: {
    SearchQuestions,
  },
  methods: {
    onEdit() {
      this.$router.push({name: "question-edit"});
    },
    onDelete(row) {
      this.$q
        .dialog({
          title: "Confirm Delete",
          message: "Are you sure you want to delete this question?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api.delete("/questions/" + row.id).then((response) => {
            this.$q.notify({
              color: "positive",
              message: "Question deleted successfully",
              icon: "check",
            });
            this.fetchQuestions();
          });
        });
    },
    onSearch(search) {
      this.searchData.type = search.type;
      this.searchData.keywords = search.keywords;
      this.searchData.category = search.category;
      this.searchData.subject = search.subject;

      console.log(this.searchData);
      this.fetchQuestions();
    },
  },
  mounted() {
    this.fetchQuestions();
  },
  updated() {

  },
});
</script>

<style scoped>

.custom-td {
  font-size: 15px !important;
  font-weight: normal!important;
}

.custom-td strong img {
  width: 100px!important;
  height: 100px!important;
}
</style>
