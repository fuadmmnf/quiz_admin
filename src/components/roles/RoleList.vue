<template>
  <div>
    <q-table
      :data="roles"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
    >
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default {
  name: "RoleList",
  props: {
    role: String,
  },
  setup(props) {
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
        sortable: true,
      },
      {
        name: "actions",
        label: "Actions",
        field: "actions",
        align: "left",
        sortable: false,
      },
    ]);
    const fetchRoles = (page = 1) => {
      loading.value = true;
      api
        .get("/roles")
        .then((response) => {
          roles.value = response.data;
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
    return {};
  },
};
</script>

<style></style>
