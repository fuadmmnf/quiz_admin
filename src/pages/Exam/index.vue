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
                :rows="exams"
                row-key="name"
                wrap-cells
                no-data-label="No data available"
                class="shadow-0"
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
                <!-- table data -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <!-- serial -->
                    <q-td key="id" :props="props">
                      {{ props.row.id }}
                    </q-td>
                    <q-td key="name" :props="props">
                      {{ props.row.name }}
                    </q-td>
                    <q-td key="faculty" :props="props">
                      {{ props.row.faculty }}
                    </q-td>
                    <q-td key="discipline" :props="props">
                      {{ props.row.discipline }}
                    </q-td>
                    <q-td key="subject" :props="props">
                      {{ props.row.subject }}
                    </q-td>
                    <q-td key="duration" :props="props">
                      {{ props.row.duration }}
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
import { useCounterStore } from "src/stores/example-store";

export default {
  name: "Exam",
  setup() {
    const counterStore = useCounterStore();
    const exams = counterStore.exams;
    return { exams };
  },
  data() {
    return {
      columns: [
        {
          name: "id",
          required: true,
          label: "S.No.",
          align: "left",
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
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
          name: "faculty",
          align: "left",
          label: "Faculty",
          field: (row) => row.faculty,
          sortable: true,
        },
        {
          name: "discipline",
          align: "left",
          label: "Discipline",
          field: (row) => row.discipline,
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
          name: "duration",
          align: "left",
          label: "Duration",
          field: (row) => row.duration,
          sortable: true,
        },
        {
          name: "actions",
          label: "Actions",
          field: (row) => row.actions,
        },
      ],
    };
  },
};
</script>

<style></style>
