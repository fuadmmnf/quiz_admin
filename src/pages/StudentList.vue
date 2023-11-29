<template>
  <q-layout>
    <q-page-container>
      <q-page class="">
        <br />
        <br />
        <div class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 1600px">
            <q-expansion-item
              icon="search"
              label="Search Students"
              default-open
              class="bg-grey-1"
            >
              <div class="q-pa-md">
                <SearchStudents @search="onSearch" />
              </div>
            </q-expansion-item>

            <q-separator spaced="" />
            <q-card>

              <q-table
                ref="tableRef"
                v-model:pagination="pagination"
                :columns="columns"
                :filter="filter"
                :loading="loading"
                :rows="students"
                binary-state-sort
                bordered
                flat
                :grid="$q.screen.lt.md"
                row-key="id"
                title="Student List"
                @request="fetchData"
              >


                <template #body-cell-faculty_id="props">
                  <q-td :props="props">
                    {{ getFacultyName(props.row.faculty_id) }}

                  </q-td>
                </template>

                <template #body-cell-institution_id="props">
                  <q-td :props="props">
                    {{ getInstitutionName(props.row.institution_id) }}

                  </q-td>
                </template>

                <template #body-cell-action="props">
                  <q-td :props="props">
                    <q-btn
                      :to="{
                        name: 'exam-detail',
                        params: { exam_id: props.row.id },
                      }"
                      color="primary"
                      label="Edit"
                    />
                  </q-td>
                </template>

                <template #item="props">
                  <div
                    class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                  >
                    <q-card bordered flat class="q-pa-md">
                      <q-list dense>
                        <q-item v-for="col in props.cols" :key="col.id">
                          <q-item-section>
                            <q-item-label>{{ col.label }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-item-label caption>{{ col.value }}</q-item-label>
                          </q-item-section>
                          <q-item-section v-if="col.name === 'action'" side>
                            <q-item-label caption>
                              <q-btn
                                :to="{
                                  name: 'exam-detail',
                                  params: { exam_id: props.row.id },
                                }"
                                color="primary"
                                label="Edit"
                              /></q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </div>
                </template>
              </q-table>


            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";

import { useRoute } from "vue-router";
import SearchStudents from "components/SearchStudents.vue";
import { useCategoryStore } from "stores/category";
import {getStudents} from "src/services/student_service";



const filter = ref("");
const loading = ref(false);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 1,
});



const columns = [

  {
    name: "username",
    label: "Student Name",
    align: "left",
    sortable: true,
    field: (row) => row.user.data.name,
  },

  {
    name: "mobile",
    label: "Mobile",
    align: "left",
    sortable: true,
    field: (row) => row.user.data.mobile,
  },

  {
    name: "gender",
    label: "Gender",
    field: "gender",
    sortable: true,
  },

  {
    name: "nid",
    label: "NID",
    field: "nid",
    sortable: true,
  },
  {
    name: "institution_id",
    label: "Institution",
    field: "institution_id",
    sortable: true,
  },
  {
    name: "faculty_id",
    label: "Faculty",
    field: "faculty_id",
    sortable: true,
  },
  {
    name: "birth",
    label: "Date of Birth",
    field: "birth",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
  },
];

export default {
  components: { SearchStudents },
  setup() {
    const route = useRoute();
    const categoryStore = useCategoryStore();
    const tableRef = ref(); // {draft: Object(), ongoing: Object(), }

    const students = ref([]);
    const filter = ref({
      keywords: "",
      institution: "",
      faculty: "",
    });

    onMounted(() => {

      tableRef.value.requestServerInteraction();

      // console.log(categoryStore.faculties);
      // console.log(categoryStore.institutions);
    });




        pagination.value = {
          sortBy: "desc",
          descending: false,
          page: 1,
          rowsPerPage: 15,
          rowsNumber: 1,
        };




    const onSearch = (search) => {
      filter.value = search;
      pagination.value = {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 1,
      };
      tableRef.value.requestServerInteraction();
    };

    async function fetchData(props) {
      loading.value = true;
      const { page } = props.pagination;


      const searchParam = `${
        filter.value.keywords.length ? "user.mobile:" + filter.value.keywords : ""
      }${
        filter.value.faculty.length ? ";faculty_id:" + filter.value.faculty : ""
      }${
        filter.value.institution.length ? ";institution_id:" + filter.value.institution : ""
      }`;

      const queryParams = {
        include: "user,institution,faculty",
        search: searchParam,
        orderBy: "id",
        sortedBy: "desc",
        searchJoin: "and",
        page,
      };

      console.log(searchParam);

      const { data, status, error } = await getStudents(queryParams);

      if (status === 200) {
        students.value = data.data;

        pagination.value = {
          ...props.pagination,
          rowsNumber: data.meta.pagination.total,
          rowsPerPage: data.meta.pagination.per_page,
        };
        // ...and turn of loading indicator
        loading.value = false;
      } else {
        console.error(error.message);
      }
    }

    return {
      tableRef,

      columns,
      loading,
      filter,
      pagination,
      categoryStore,
      students,
      fetchData,
      onSearch,
    };
  },
  methods: {


    getFacultyName(facultyId) {
      const faculty = this.categoryStore.getFacultyById(facultyId);
      return faculty ? faculty.name : "Null";
    },

    getInstitutionName(institutionId) {
      const institution = this.categoryStore.getInstitutionById(institutionId);
      return institution ? institution.name : "Null";

    },
  },
};
</script>

<style>
.q-table .q-tr-expand {
  background-color: #dfe6e9; /* Use the desired light grey color here */
}
</style>
