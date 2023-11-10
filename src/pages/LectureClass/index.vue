<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Lecture classes
          <div class="text-subtitle2">
            List of all Lecture classes are shown here
          </div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Lecture classes"
            icon="add"
            to="/lecture-class/add"
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
                :rows="LectureClasses"
                :loading="loading"
                rows-per-page-options="[10]"
                row-key="real_id"
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
                    <q-td key="subject" :props="props">
                      {{ props.row.subject }}
                    </q-td>
                    <q-td key="description" :props="props">
                      {{ props.row.description }}
                    </q-td>
                    <q-td key="start_time" :props="props">
                      {{ props.row.start_time }}
                    </q-td>

                    <q-td key="action" :props="props">
                      <q-btn
                        color="primary"
                        size="sm"
                        icon="edit"
                        round
                        dense
                        flat
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
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "LectureClasses",
  setup() {
    const { $q } = useQuasar();
    const store = useStore();
    const LectureClasses = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({ type: "", keywords: "" });
    const courseId = ref("");

    const loading = ref(true);
    const fetchLectureClasses = (page = 1) => {
      loading.value = true;

      api
        .get(
          `/class-lectures?search=course_id:${courseId.value}&orderBy=id&sortedBy=desc&page=${page}`
        )
        .then((response) => {
          console.log(response.data.data);
          LectureClasses.value = response.data.data;
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
      fetchLectureClasses(props.pagination.page);
    };
    return {
      store,
      pagination,
      loading,
      fetchLectureClasses,
      LectureClasses,
      $q,
      searchData,
      courseId,
      onRequest,
    };
  },
  data() {
    return {
      name: "Lecture Class",
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
          name: "subject",
          label: "Subject",
          field: "subject",
          align: "left",
          sortable: true,
        },
        {
          name: "description",
          label: "Description",
          field: "description",
          align: "left",
          sortable: true,
        },
        {
          name: "start_time",
          label: "Start Date",
          field: "start_time",
          align: "left",
          sortable: true,
        },

        {
          name: "action",
          label: "Action",
          field: "action",
          align: "left",
        },
      ],
      //table data
    };
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
    this.courseId = this.$route.params.courseId;
    this.fetchLectureClasses();
  },
});
</script>

<style></style>
