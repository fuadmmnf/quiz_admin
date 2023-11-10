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
                    <q-td key="subject" :props="props">
                      {{ props.row.subject }}
                    </q-td>
                    <q-td key="lecture_description" :props="props">
                      {{ props.row.lecture_description }}
                    </q-td>
                    <q-td key="start_date" :props="props">
                      {{ props.row.start_date }}
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
    const fetchLectureClasses = (page = 1) => {
      loading.value = true;

      LectureClasses.value = [
        {
          id: 1,
          title: "Hello World",
          subject: "10",
          lecture_description: "bla bla",
          start_date: "02-12-2022",
          action: "action",
        },
        {
          id: 2,
          title: "Hello World",
          subject: "10",
          lecture_description: "bla bla",
          start_date: "02-12-2022",
          action: "action",
        },
        {
          id: 3,
          title: "Hello World",
          subject: "10",
          lecture_description: "bla bla",
          start_date: "02-12-2022",
          action: "action",
        },
      ];
    };

    const loading = ref(true);

    return {
      store,
      pagination,
      loading,
      fetchLectureClasses,
      LectureClasses,
      $q,
      searchData,
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
          name: "lecture_description",
          label: "Lecture Description",
          field: "lecture_description",
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
          name: "action",
          label: "Action",
          field: "action",
          align: "left",
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
    this.fetchLectureClasses();
  },
});
</script>

<style></style>
