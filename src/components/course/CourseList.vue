<template>
  <div class="q-pa-none">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <q-table
              :columns="columns"
              :rows="courses"
              row-key="real_id"
              rows-per-page-options="[10]"
              :loading="loading"
              wrap-cells
              no-data-label="No data available"
              class="shadow-0"
              v-model:pagination="pagination"
              @request="onRequest"
            >
              <!-- table data -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <!-- serial -->

                  <q-td key="title" :props="props">
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="num_classes" :props="props">
                    {{ props.row.num_classes }}
                  </q-td>
                  <q-td key="num_exams" :props="props">
                    {{ props.row.num_exams }}
                  </q-td>
                  <q-td key="start_date" :props="props">
                    {{ props.row.start_date }}
                  </q-td>
                  <q-td key="end_date" :props="props">
                    {{ props.row.end_date }}
                  </q-td>

                  <q-td key="action" :props="props">
                    <q-btn
                      v-if="courseType === 'draft'"
                      color="green"
                      size="md"
                      icon="publish"
                      round
                      dense
                      flat
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Publish Course</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="courseType != 'draft'"
                      color="primary"
                      size="md"
                      icon="drafts"
                      round
                      dense
                      flat
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Move to draft</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="courseType === 'published'"
                      color="primary"
                      size="md"
                      icon="move_to_inbox"
                      round
                      dense
                      flat
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Move to Completed</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="primary"
                      to="/lecture-classes"
                      round
                      dense
                      flat
                      size="sm"
                      icon="fa-solid fa-clipboard-list"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Lecture Classes</strong>
                      </q-tooltip></q-btn
                    >
                    <q-btn
                      color="primary"
                      size="md"
                      icon="people"
                      round
                      dense
                      flat
                      :to="`/subscribe-user`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Subscribe users</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="primary"
                      size="sm"
                      icon="edit"
                      round
                      dense
                      flat
                      :to="`/course/${props.row.id}`"
                    />

                    <q-btn
                      color="negative"
                      size="sm"
                      icon="delete"
                      round
                      dense
                      flat
                      @click="onDelete(props.row.id)"
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
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "CourseList",
  props: {
    courseType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { $q } = useQuasar();
    const store = useStore();
    const courses = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const loading = ref(true);
    const searchData = ref({ type: "", keywords: "" });

    const fetchCourses = (page = 1) => {
      loading.value = true;
      api
        .get(
          `/courses?search=status:${props.courseType}&orderBy=id&sortedBy=desc&page=${page}`
        )
        .then((response) => {
          console.log(`${props.courseType} courses`, response.data);
          courses.value = response.data.data;
          const meta = response.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const onRequest = (props) => {
      fetchCourses(props.pagination.page);
    };
    return {
      store,
      pagination,
      loading,
      fetchCourses,
      onRequest,
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
          name: "num_classes",
          label: "Number of Classes",
          field: "num_classes",
          align: "left",
          sortable: true,
        },
        {
          name: "num_exams",
          label: "Number of Exams",
          field: "num_exams",
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
  methods: {
    onDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to turn on the wifi?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log(">>>> OK", id);
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
    },
  },

  mounted() {
    this.fetchCourses();
  },
});
</script>

<style></style>
