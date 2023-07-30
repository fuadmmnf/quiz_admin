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
                row-key="real_id"
                wrap-cells
                no-data-label="No data available"
                class="shadow-0"
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
                <template v-slot:pagination="scope">
                  <q-btn
                    v-if="scope.pagesNumber > 2"
                    icon="first_page"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="scope.isFirstPage"
                    @click="scope.firstPage"
                  />

                  <q-btn
                    icon="chevron_left"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="scope.isFirstPage"
                    @click="scope.prevPage"
                  />

                  <q-btn
                    icon="chevron_right"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="scope.isLastPage"
                    @click="scope.nextPage"
                  />

                  <q-btn
                    v-if="scope.pagesNumber > 2"
                    icon="last_page"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="scope.isLastPage"
                    @click="scope.lastPage"
                  />
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
    const pagination = ref({
      descending: false,
      page: 2,
      rowsPerPage: 10,
    });

    return {
      store,
      pagination,
      pagesNumber: computed(() => {
        return Math.ceil(rows.length / pagination.value.rowsPerPage);
      }),
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
      questions: [],
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
    getQuestions() {
      api
        .get("/questions")
        .then((response) => {
          this.questions = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getQuestions();
  },
});
</script>

<style></style>
