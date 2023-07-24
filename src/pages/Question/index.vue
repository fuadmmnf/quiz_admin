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
                row-key="name"
                wrap-cells
                no-data-label="No data available"
                class="shadow-0"
              >
                <!-- table data -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="name" :props="props">
                      {{ props.row.name }}
                    </q-td>
                    <q-td key="category" :props="props">
                      {{ props.row.category }}
                    </q-td>
                    <q-td key="subcategory" :props="props">
                      {{ props.row.subcategory }}
                    </q-td>
                    <q-td key="subject" :props="props">
                      {{ props.row.subject }}
                    </q-td>
                    <q-td key="chapter" :props="props">
                      {{ props.row.chapter }}
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
import { defineComponent, defineAsyncComponent } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";

export default defineComponent({
  name: "Question",
  setup() {
    const store = useStore();
    const questions = store.questions;
    return { questions };
  },
  data() {
    return {
      name: "Question",
      //table header
      columns: [
        {
          name: "name",
          label: "Question Name",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "category",
          label: "Category",
          field: "category",
          align: "left",
          sortable: true,
        },
        {
          name: "subcategory",
          label: "Subcategory",
          field: "subcategory",
          align: "left",
          sortable: true,
        },
        {
          name: "subject",
          label: "Subject",
          field: "subject",
          align: "left",
          sortable: true,
        },
        {
          name: "chapter",
          label: "Chapter",
          field: "chapter",
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
      rows: [
        {
          name: "Question 1",
          category: "Category 1",
          subcategory: "Subcategory 1",
          subject: "Subject 1",
          chapter: "Chapter 1",
        },
        {
          name: "Question 2",
          category: "Category 2",
          subcategory: "Subcategory 2",
          subject: "Subject 2",
          chapter: "Chapter 2",
        },
        {
          name: "Question 3",
          category: "Category 3",
          subcategory: "Subcategory 3",
          subject: "Subject 3",
          chapter: "Chapter 3",
        },
      ],
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
          this.questions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
});
</script>

<style></style>
