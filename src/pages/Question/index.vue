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
            to="/Question/add"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

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
                    <q-td key="real_id" :props="props">
                      {{ props.row.real_id }}
                    </q-td>
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
                    <q-td key="actions" :props="props">
                      <q-btn
                        color="primary"
                        size="sm"
                        icon="edit"
                        round
                        dense
                        flat
                        to="/Question/edit"
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
import { defineComponent, defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";

export default defineComponent({
  name: "Question",
  setup() {
    const store = useStore();
    const questions = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const fetchQuestions = (page = 1) => {
      loading.value = true;
      api
        .get("/questions?page=" + page)
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
    };
  },
  data() {
    return {
      name: "Question",
      //table header

      columns: [
        {
          name: "real_id",
          label: "Id",
          field: "real_id",
          align: "left",
          sortable: true,
        },
        {
          name: "content",
          label: "Content",
          field: "content",
          align: "left",
          sortable: true,
        },
        {
          name: "type",
          label: "Type",
          field: "type",
          align: "left",
          sortable: true,
        },
        {
          name: "score",
          label: "Score",
          field: "score",
          align: "left",
          sortable: true,
        },
        {
          name: "unit_negative_mark",
          label: "Unit Negative Mark",
          field: "unit_negative_mark",
          align: "left",
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: "actions",
          align: "left",
          sortable: false,
        },
      ],
      //table data
    };
  },
  components: {
    TableActions: defineAsyncComponent(() =>
      import("components/tables/TableActions.vue")
    ),
  },
  methods: {
    onEdit() {
      this.$router.push({ name: "question-edit" });
    },
    onDelete(row) {
      this.questions.map((question, index) => {
        if (question.name === row.name) {
          this.questions.splice(index, 1);
        }
      });
    },
  },
  mounted() {
    this.fetchQuestions();
  },
});
</script>

<style></style>
