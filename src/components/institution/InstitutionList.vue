<template>
    <div>
      <q-table
        :columns="columns"
        :rows="institutions"
        :loading="loading"
        wrap-cells
        no-data-label="No data available"
        class="shadow-0"
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
            <q-td key="address" :props="props">
              {{ props.row.address }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                color="red"
                size="md"
                icon="delete"
                round
                dense
                flat
                @click="deleteInstitute(props.row.id)"
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
  
  export default {
    name: "InstitutionList",
  
    setup(props) {
      const { $q } = useQuasar();
      const pagination = ref({
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      });
      const filter = ref("");
      const loading = ref(false);
      const institutions = ref([]);
      const columns = ref([
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
          sortable: false,
        },
        {
          name: "address",
          label: "Address",
          field: "address",
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
      const fetchInstitutions = (page = 1) => {
        loading.value = true;
  
        // Retrieve the institutions data from local storage
        const institutionsData = localStorage.getItem("institutions");
        if (institutionsData) {
          institutions.value = JSON.parse(institutionsData);
          console.log(institutions.value);
        }
  
        loading.value = false;
      };
      const onRequest = (props) => {
        const { pagination, filter } = props;
        fetchInstitutions(pagination.page);
      };
  
      return {
        pagination,
        filter,
        loading,
        institutions,
        columns,
        fetchInstitutions,
        onRequest,
        $q,
      };
    },
  
    mounted() {
      this.fetchInstitutions();
    },
    methods: {
      deleteInstitute(id) {
        // confirm
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure you want to delete this institution?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            // Find the index of the institution with the given id
  
            const index = this.institutions.findIndex((inst) => inst.id === id);
  
            if (index !== -1) {
              // Remove the institution from the array
              this.institutions.splice(index, 1);
  
              // Update the local storage with the modified institutions array
              localStorage.setItem(
                "institutions",
                JSON.stringify(this.institutions)
              );
            }
  
            this.$q.notify({
              color: "positive",
              message: "institution deleted successfully",
            });
  
            this.fetchInstitutions();
          });
      },
    },
  };
  </script>
  
  <style></style>
  