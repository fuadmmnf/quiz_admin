<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Course
          <div class="text-subtitle2">List of all Course are shown here</div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Course"
            icon="add"
            to="/Course/add"
          />
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <q-table
                :columns="columns"
                :rows="courses"
                row-key="id"
                wrap-cells
                no-data-label="No data available"
                class="shadow-0"
              >
                <!-- table data -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <!-- serial -->

                    <q-td key="title" :props="props">
                      {{ props.row.title }}
                    </q-td>
                    <q-td key="number_of_classes" :props="props">
                      {{ props.row.number_of_classes }}
                    </q-td>
                    <q-td key="number_of_exams" :props="props">
                      {{ props.row.number_of_exams }}
                    </q-td>
                    <q-td key="start_date" :props="props">
                      {{ props.row.start_date }}
                    </q-td>
                    <q-td key="end_date" :props="props">
                      {{ props.row.end_date }}
                    </q-td>

                    <q-td key="action" :props="props">
                      <q-btn
                        color="primary"
                        size="sm"
                        icon="edit"
                        round
                        dense
                        flat
                        :to="`/Course/${props.row.id}`"
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

export default defineComponent({
  name: "Courses",
  setup() {
    const { $q } = useQuasar();
    const store = useStore();
    const courses = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({ type: "", keywords: "" });
    const fetchCourses = (page = 1) => {
      loading.value = true;

      courses.value = [
        {
          id: 1,
          title: "Hello World",
          number_of_classes: "10",
          number_of_exams: "3",
          start_date: "12-12-2022",
          end_date: "22-12-2022",
          action: "action",
        },
        {
          id: 2,
          title: "Testing",
          number_of_classes: "20",
          number_of_exams: "1",
          start_date: "02-12-2022",
          end_date: "26-12-2022",
          action: "action",
        },
        {
          id: 3,
          title: "Hello World",
          number_of_classes: "10",
          number_of_exams: "3",
          start_date: "12-12-2022",
          end_date: "22-12-2022",
          action: "action",
        },
        {
          id: 4,
          title: "ABC",
          number_of_classes: "140",
          number_of_exams: "36",
          start_date: "12-12-2022",
          end_date: "22-12-2022",
          action: "action",
        },
      ];
    };

    const loading = ref(true);

    return {
      store,
      pagination,
      loading,
      fetchCourses,
      courses,
      $q,
      searchData,
    };
  },
  data() {
    return {
      name: "Course",
      //table header
      //name , mobile , institution, action
      columns: [
        {
          name: "title",
          label: "Title",
          field: "title",
          align: "left",
          sortable: true,
        },
        {
          name: "number_of_classes",
          label: "Number of Classes",
          field: "number_of_classes",
          align: "left",
          sortable: true,
        },
        {
          name: "number_of_exams",
          label: "Number of Exams",
          field: "number_of_exams",
          align: "left",
          sortable: true,
        },
        {
          name: "start_date",
          label: "Start Date",
          field: "start_date",
          align: "left",
          sortable: true,
        },
        {
          name: "end_date",
          label: "End Date",
          field: "end_date",
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
  },

  mounted() {
    this.fetchCourses();
  },
});
</script>

<style></style>
