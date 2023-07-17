<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Exams
          <div class="text-subtitle2">List of all Exams are shown here</div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Exam" icon="add" to="/Exam/add" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <!-- List of Exams -->
              <q-table
                :columns="columns"
                :rows="rows"
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
                        size="md"
                        icon="edit"
                        round
                        dense
                        flat
                        to="/Exam/edit"
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
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Exam",
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "category",
          align: "left",
          label: "Category",
          field: (row) => row.category,
          sortable: true,
        },
        {
          name: "subcategory",
          align: "left",
          label: "Subcategory",
          field: (row) => row.subcategory,
          sortable: true,
        },
        {
          name: "subject",
          align: "left",
          label: "Subject",
          field: (row) => row.subject,
          sortable: true,
        },
        {
          name: "chapter",
          align: "left",
          label: "Chapter",
          field: (row) => row.chapter,
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: (row) => row.actions,
        },
      ],
      rows: [
        {
          id: 1,
          name: "Exam 1",
          category: "Category 1",
          subcategory: "Subcategory 1",
          subject: "Subject 1",
          chapter: "Chapter 1",
          actions: "",
        },
        {
          id: 2,
          name: "Exam 2",
          category: "Category 2",
          subcategory: "Subcategory 2",
          subject: "Subject 2",
          chapter: "Chapter 2",
          actions: "",
        },
        {
          id: 3,
          name: "Exam 3",
          category: "Category 3",
          subcategory: "Subcategory 3",
          subject: "Subject 3",
          chapter: "Chapter 3",
          actions: "",
        },
        {
          id: 4,
          name: "Exam 4",
          category: "Category 4",
          subcategory: "Subcategory 4",
          subject: "Subject 4",
          chapter: "Chapter 4",
          actions: "",
        },
        {
          id: 5,
          name: "Exam 5",
          category: "Category 5",
          subcategory: "Subcategory 5",
          subject: "Subject 5",
          chapter: "Chapter 5",
          actions: "",
        },
      ],
    };
  },
});
</script>

<style></style>
