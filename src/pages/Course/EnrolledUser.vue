<template>
  <q-page class="q-pa-sm">
    <q-dialog v-model="showDialog" :position="'top'">
      <q-card flat bordered class="my-card" style="width: 60%">
        <q-card-section>
          <div class="text-h6">Select Student</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="q-gutter-sm">
            <q-select
              filled
              v-model="selectedStudents"
              input-debounce="0"
              multiple
              :options="options"
              use-chips
              stack-label
              use-input
              @filter="filterFn"
              label="Search Student"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn color="primary" label="Enroll" @click="enrollStudent" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Subscribe User
          <div class="text-subtitle2">List of all users are shown here</div>
        </div>

        <div class="row">
          <q-btn
            color="primary"
            label="Enroll new student"
            @click="showDialog = true"
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
                :rows="users"
                row-key="real_id"
                :loading="loading"
                rows-per-page-options="[10]"
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

                    <q-td key="name" :props="props">
                      {{ props.row.user.data.name }}
                    </q-td>
                    <q-td key="mobile" :props="props">
                      {{ props.row.user.data.mobile }}
                    </q-td>
                    <q-td key="institution" :props="props">
                      {{ props.row.institution }}
                    </q-td>

                    <q-td key="action" :props="props">
                      <q-btn
                        color="negative"
                        size="md"
                        icon="delete"
                        round
                        dense
                        flat
                        @click="onDelete(props.row.id)"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          <strong class="">Delete</strong>
                        </q-tooltip>
                      </q-btn>
                      <!-- <q-btn
                        color="green"
                        size="sm"
                        icon="fa-solid fa-user-plus"
                        round
                        dense
                        flat
                        @click="onSubscribe(props.row.id)"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          <strong class=""
                            >Subscribe {{ props.row.name }}</strong
                          >
                        </q-tooltip>
                      </q-btn> -->
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
  name: "SubscribeUser",

  setup() {
    const { $q } = useQuasar();
    const store = useStore();
    const showDialog = ref(false);
    const initialOptions = ref([]);
    const options = ref([]);

    const users = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({ type: "", keywords: "" });
    const courseId = ref("");
    const loading = ref(true);
    const fetchUsers = (page = 1) => {
      loading.value = true;
      api
        .get(
          `/course-users?search=course_id:${courseId.value}&include=user&orderBy=id&sortedBy=desc&page=${page}`
        )
        .then((response) => {
          users.value = response.data.data;
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
    const fetchStudents = () => {
      loading.value = true;
      api
        .get(`/users?search=roles.name:student&limit=0`)
        .then((response) => {
          initialOptions.value = response.data.data.map((user) => {
            return {
              label: user.name,
              value: user.id,
            };
          });
          options.value = initialOptions.value;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const onRequest = (props) => {
      fetchUsers(props.pagination.page);
    };
    return {
      store,
      pagination,
      loading,
      fetchUsers,
      fetchStudents,
      onRequest,
      users,
      $q,
      searchData,
      courseId,
      showDialog,
      selectedStudents: ref([]),
      options,
      initialOptions,
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options.value = initialOptions.value;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = initialOptions.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
  data() {
    return {
      name: "User",
      //table header
      //name , mobile , institution, action
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "mobile",
          label: "Mobile",
          field: "mobile",
          align: "left",
          sortable: true,
        },
        {
          name: "institution",
          label: "Institution",
          field: "institution",
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

  methods: {
    onDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api
            .delete(`/course-users/${id}`)
            .then((res) => {
              this.$q.notify({
                message: "User deleted successfully",
                color: "positive",
                icon: "check",
              });
              this.fetchUsers();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
    },
    enrollStudent() {
      const data = {
        course_id: this.courseId,
        user_ids: this.selectedStudents.map((user) => user.value),
      };
      console.log("data sent to server", data);
      api
        .post("/course-users/", data)
        .then((response) => {
          console.log(response);
          this.$q.notify({
            message: "Student Enrolled Successfully",
            color: "positive",
            icon: "check",
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.fetchUsers();
        });
    },
    onSubscribe(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to subscribe this user?",
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
    this.fetchUsers();
    this.fetchStudents();
  },
});
</script>

<style></style>
