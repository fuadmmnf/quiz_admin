<template>
  <q-layout>
    <q-page-container>
      <q-page class="">

        <div class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 1600px">
            <q-separator spaced="" />
            <q-card>
              <q-card-section>
                <div class="text-h6 text-grey-8">
                  Transaction List
                </div>
              </q-card-section>
              <q-separator></q-separator>
              <q-table
                ref="tableRef"
                class="custom-table"
                v-model:pagination="pagination"
                :filter="filter"
                :columns="columns"
                :loading="loading"
                :rows="transactions"
                binary-state-sort
                bordered
                flat
                :grid="$q.screen.lt.md"
                row-key="id"
                @request="fetchData"
              >
                <template #body-cell-Type="props">
                  <q-td :props="props">
                    {{extractSubjectType(props.row.resourceable_type)}}
                  </q-td>
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
import { Notify } from "quasar";
import {getTransactions} from "src/services/transaction";

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
    name: "Date",
    label: "Date",
    align: "left",
    sortable: true,
    field:'created_at'
  },

  {
    name: "TransactionCode",
    label: "TransactionCode",
    align: "left",
    sortable: true,
    field: 'transaction_code'
  },

  {
    name: "Status",
    label: "Status",
    align: "left",
    sortable: true,
    field: 'status'
  },

  {
    name: "Type",
    label: "Type",
    align: "left",
    sortable: true,
    field: 'resourceable_type'
  },



];


export default {
  setup() {
    const route = useRoute();
    const tableRef = ref();
    const transactions = ref([]);
    onMounted(() => {
      tableRef.value.requestServerInteraction();
    });

    pagination.value = {
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 15,
      rowsNumber: 1,
    };
    function extractSubjectType(inputString) {
      const parts = inputString?.split("\\");
      if (parts?.length > 0) {
        return parts[parts.length - 1];
      } else {
        return "NA";
      }
    }

    async function fetchData(props) {
      loading.value = true;
      const { page } = props.pagination;
      const queryParams = {
        include: "user",
        orderBy: "id",
        sortedBy: "desc",
        searchJoin: "and",
        limit: 50,
        page,
      };

      const { data, status, error } = await getTransactions(queryParams);

      if (status === 200) {
        transactions.value = data.data;

        pagination.value = {
          ...props.pagination,
          rowsNumber: data.meta.pagination.total,
          rowsPerPage: data.meta.pagination.per_page,
        };
        loading.value = false;
      } else {
        console.error(error.message);
      }
    }

    return {
      tableRef,
      loading,
      filter,
      pagination,
      transactions,
      fetchData,
      extractSubjectType,
      columns

    };
  },
};
</script>

<style>
.q-table .q-tr-expand {
  background-color: #dfe6e9; /* Use the desired light grey color here */
}
</style>
