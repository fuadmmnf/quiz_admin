<template>
    <q-page class="q-pa-sm">
      <q-card class="no-shadow" bordered>
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-indigo-8">
            Registered Students
            <div class="text-subtitle2">
              List of all registered students are shown here
            </div>
          </div>
          <div class="row">
            <!-- <q-btn
              color="primary"
              label="Add Question"
              icon="add"
              to="/Question/add"
            /> -->
          </div>
        </q-card-section>
      </q-card>
  
      <!-- <q-separator spaced />
      <q-expansion-item
        expand-separator
        icon="search"
        label="Search Questions"
        class="q-card"
      >
        <search-questions @search="onSearch"></search-questions>
      </q-expansion-item>
      <q-separator spaced /> -->
  
      <div class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-card>
              <q-card-section>
                <!-- List of Questions -->
                <q-table
                  :columns="columns"
                  :rows="students"
                  row-key="student_mobile"
                  wrap-cells
                  no-data-label="No data available"
                  class="shadow-0"
                >
                  <!-- table data -->
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <!-- serial -->
  
                      <q-td key="student_name" :props="props">
                        {{ props.row.student_name }}
                      </q-td>
                      <q-td key="student_mobile" :props="props">
                        {{ props.row.student_mobile }}
                      </q-td>
                      <q-td key="student_institution" :props="props">
                        {{ props.row.student_institution }}
                      </q-td>
  
                      <q-td key="action" :props="props">
                        <q-btn
                          color="primary"
                          size="sm"
                          icon="edit"
                          round
                          dense
                          flat
                          :to="`/RegisteredStudents/${props.row.id}`"
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
  import { useQuasar } from "quasar";
  import SearchQuestions from "components/question/SearchQuestions.vue";
  
  export default defineComponent({
    name: "RegisteredStudents",
    setup() {
      const { $q } = useQuasar();
      const store = useStore();
      const students = ref([]);
      const pagination = ref({
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      });
      const searchData = ref({ type: "", keywords: "" });
      const fetchStudents = (page = 1) => {
        loading.value = true;
  
        students.value = [
          {
            id: 1,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 2,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 3,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 4,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 5,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 6,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 7,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 8,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
          {
            id: 9,
            student_name: "Sajid",
            student_mobile: "01700000000",
            student_institution: "Dhaka College",
            action: "action",
          },
        ];
      };
  
      const loading = ref(true);
  
      return {
        store,
        pagination,
        loading,
        fetchStudents,
        students,
        $q,
        searchData,
      };
    },
    data() {
      return {
        name: "Question",
        //table header
        //name , mobile , institution, action
        columns: [
          {
            name: "student_name",
            label: "Name",
            field: "student_name",
            align: "left",
            sortable: true,
          },
          {
            name: "student_mobile",
            label: "Mobile",
            field: "student_mobile",
            align: "left",
            sortable: true,
          },
          {
            name: "student_institution",
            label: "Institution",
            field: "student_institution",
            align: "left",
            sortable: true,
          },
          {
            name: "action",
            label: "Action",
            field: "action",
            align: "left",
            sortable: true,
          },
        ],
        //table data
      };
    },
    components: {
      TableActions: defineAsyncComponent(() =>
        import("components/tables/TableActions.vue")
      ),
      SearchQuestions,
    },
  
    mounted() {
      this.fetchStudents();
    },
  });
  </script>
  
  <style></style>
  