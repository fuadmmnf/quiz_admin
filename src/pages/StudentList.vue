<template>
  <q-layout>
    <q-page-container>
      <q-page class="">
        <div class="text-right">
          <q-btn
            color="primary"
            label="Add Student"
            class="q-pa-sm q-ma-lg"
            @click="openAddStudentDialog"
          />
        </div>

        <q-dialog v-model="addStudentDialog" persistent>
          <q-card style="min-width: 350px">
            <q-card-section class="q-pa-md">

              <q-input v-model="name" label="Student Name" />
              <q-input v-model="mobile" label="Mobile" />
              <q-input v-model="nid" label="NID" />
              <q-select
                v-model="gender"
                :options="options"
                label="Gender"
                required
              />
                <q-input v-model="password" type="password" label="Password" />


              <q-space />

              <div class="text-right q-mt-md">
                <q-btn
                  color="primary"
                  label="Add"
                  class="q-mr-sm"
                  @click="addStudent"
                />
                <q-btn
                  color="secondary"
                  label="Cancel"
                  @click="closeAddStudentDialog"
                />

              </div>
            </q-card-section>
          </q-card>
        </q-dialog>

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
import {getStudents, registerStudent} from "src/services/student_services";
import {Notify} from "quasar";



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
    const addStudentDialog = ref(false);
    const name=ref('');
    const mobile=ref('');
    const nid = ref('');
    const gender = ref('');
    const password = ref('');


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
        limit: 50,
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
      addStudentDialog,
      name,
      mobile,
      nid,
      password,
      columns,
      loading,
      filter,
      pagination,
      categoryStore,
      students,
      fetchData,
      onSearch,
      options: ["Male", "Female"],
      gender,
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

    openAddStudentDialog() {

      this.name = '';
      this.mobile = '';
      this.gender = '';
      this.nid = '';
      this.password = '';


      this.addStudentDialog = true;
    },

    closeAddStudentDialog() {
      this.addStudentDialog = false;
    },

    async addStudent() {
      const { data, status, error } = await registerStudent({
        mobile: this.mobile,
        name: this.name,
        nid: this.nid,
        gender: this.gender.toLowerCase(),
        password: this.password,
      });

      if (status === 201) {

        Notify.create({
          message: "Student Add Successful!",
          icon: "warning",
          color: "primary",
        });
        window.location.reload();

      } else {
        Notify.create({
          message: "User Already Exist!",
          icon: "warning",
          color: "negative",
        });
      }
      this.closeAddStudentDialog();
    },
  },
};
</script>

<style>
.q-table .q-tr-expand {
  background-color: #dfe6e9; /* Use the desired light grey color here */
}
</style>
