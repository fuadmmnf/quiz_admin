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
                row-key="real_id"
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
                    <q-td key="real_id" :props="props">
                      {{ props.row.real_id }}
                    </q-td>
                    <q-td key="title" :props="props">
                      {{ props.row.title }}
                    </q-td>
                    <q-td key="code" :props="props">
                      {{ props.row.code }}
                    </q-td>
                    <q-td key="duration_in_minutes" :props="props">
                      {{ props.row.duration_in_minutes }}
                    </q-td>
                    <q-td key="actions" :props="props">
                      <q-btn
                        color="primary"
                        size="md"
                        icon="edit"
                        round
                        dense
                        flat
                        :to="`/Exam/${props.row.real_id}`"
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
import { useStore } from "src/stores/store";
import { api } from "boot/axios";

export default {
  name: "Exam",
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    api.get("/exams?include=subject").then((response) => {
      this.exams = response.data.data;
    });
  },
  data() {
    return {
      exams: [],
      columns: [
        {
          name: "real_id",
          required: true,
          label: "S.No.",
          align: "left",
          field: (row) => row.real_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "title",
          required: true,
          label: "Title",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "code",
          align: "left",
          label: "Code",
          field: (row) => row.code,
          sortable: true,
        },
        {
          name: "duration_in_minutes",
          align: "left",
          label: "Duration (In Minutes)",
          field: (row) => row.duration_in_minutes,
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
