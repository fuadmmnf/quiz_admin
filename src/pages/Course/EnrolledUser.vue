<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Subscribe User
          <div class="text-subtitle2">List of all users are shown here</div>
        </div>
        <div class="row"></div>
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
                      N/A
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

    const onRequest = (props) => {
      fetchUsers(props.pagination.page);
    };
    return {
      store,
      pagination,
      loading,
      fetchUsers,
      onRequest,
      users,
      $q,
      searchData,
      courseId,
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
  },
});
</script>

<style></style>
