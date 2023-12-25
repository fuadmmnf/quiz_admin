<template>
  <div>
    <q-table
      :columns="columns"
      :rows="roles"
      row-key="real_id"
      rows-per-page-options="[10]"
      :loading="loading"
      wrap-cells
      no-data-label="No data available"
      class="shadow-0"
      v-model:pagination="pagination"
      @request="onRequest"
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
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="mobile" :props="props">
            {{ props.row.mobile }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="red"
              size="md"
              icon="delete"
              round
              dense
              flat
              @click="deleteUser(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import {deleteUser, getUsers} from "src/services/auth_services";

export default {
  name: "RoleList",
  props: {
    role: String,
  },
  setup(props) {
    const { $q } = useQuasar();
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const filter = ref("");
    const loading = ref(false);
    const roles = ref([]);
    const columns = ref([
      {
        name: "name",
        label: "Name",
        field: "name",
        align: "left",
        sortable: false,
      },
      {
        name: "mobile",
        label: "Mobile",
        field: "mobile",
        align: "left",
        sortable: true,
      },
      {
        name: "actions",
        label: "Actions",
        field: "actions",
        align: "right",
        sortable: false,
      },
    ]);
    const fetchRoles = async (page = 1) => {
      loading.value = true;

      // const {data, status, error} = await getUsers({
      //   search: `roles.name:${props.role}`,
      //   include: "roles",
      //   page: page,
      // });
      //
      // if (status === 200) {
      //   console.log("success", data);
      //   roles.value = data.data;
      //   const meta = data.meta.pagination;
      //   pagination.value = {
      //     page: meta.current_page,
      //     rowsPerPage: meta.per_page,
      //     rowsNumber: meta.total,
      //   };
      //   loading.value = false;
      // } else {
      //   console.error("Failed to fetch roles:", error);
      // }

      api
        .get(
          `/users?search=roles.name:${props.role}&include=roles&page=${page}`
        )
        .then((response) => {
          roles.value = response.data.data;
          const meta = response.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .catch((error) => {
          console.log(error);
          loading.value = false;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const onRequest = (props) => {
      const { pagination, filter } = props;
      fetchRoles(pagination.page);
    };

    return {
      pagination,
      filter,
      loading,
      roles,
      columns,
      fetchRoles,
      onRequest,
      $q,
    };
  },
  mounted() {
    this.fetchRoles();
  },
  methods: {
    deleteUser(id) {
      // confirm
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete this user?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {

          // const {status, error} = await deleteUser(id);
          // if (status === 200) {
          //   this.$q.notify({
          //     color: "positive",
          //     message: "User deleted successfully",
          //   });
          //   fetchRoles(); // Refresh the role list after deletion
          // },

          api
            .delete(`/users/${id}`)
            .then((res) => {
              this.$q.notify({
                color: "positive",
                message: "User deleted successfully",
              });
              fetchRoles();
            })
            .catch((error) => {
              console.log(error);
            });
        });
    },
  },
};
</script>

<style></style>
