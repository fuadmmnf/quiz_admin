<template>
  <div class="q-pa-md">

    <div class="row justify-end">


      <div class="q-pa-md col" style="max-width: 300px">
        <q-input filled v-model="startDate" placeholder="Start Date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="startDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="q-pa-md col" style="max-width: 300px">
        <q-input filled v-model="endDate" placeholder="End Date" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="endDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="q-pa-md col" style="max-width: 300px">
        <q-select v-model="model" :options="subjectOptions" emit-value
                  map-options
                 />
      </div>

     <div class="q-mt-md q-mb-lg q-pa-md"> <q-btn color="primary" label="Filter" @click="fetchActivityLogs"/></div>
    </div>

    <q-table
      flat
      bordered
      title="User Activity"
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      @request="onRequest"

    >


    </q-table>
  </div>


</template>

<script>
import { api } from "src/boot/axios";
import { onMounted, ref, watch, computed } from "vue";
import { date } from 'quasar';




export default {
  setup() {
    const columns = [
      {
        name: "date",
        required: true,
        label: "Date",
        align: "left",
        field: (row) => row.created_at,
        sortable: true,
      },
      {
        name: "user",
        label: "User",
        field: "causer",
        sortable: true,
        format: (val) => (val !== null ? val : "null"),
      },
      {
        name: "resourceType",
        label: "Resource Type",
        field: "message",
        sortable: true,
        style: "white-space: normal;",
      },
      {
        name: "action",
        label: "Action",
        field: "object",
        sortable: true,
      },
    ];


    const rows = ref([]);
    const startDate = ref(null);
    const endDate = ref(null);
    const newEndDate = ref(null);
    const model = ref("All Users");

    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const subjectOptions = ref([
      // Include "All Users" as an option
      {
        label: "All Users",
        value: "All Users",
      },
    ]);


    const fetchUsers = async () => {
      try {
        const response = await api.get("/users?search=roles.name:subadmin,moderator&limit=0");
        if (response && response.data.data) {
          console.log("Test", response);

          const userData = response.data.data;
          const transformedData = userData.map(user => ({
            label: user.name,
            value: user.id,
          }));

          subjectOptions.value = subjectOptions.value.concat(transformedData);
          console.log(transformedData);

        }
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };


    const fetchActivityLogs = async (page = 1) => {


      try {
        console.log("Start", startDate.value);
        if (date.isValid(endDate.value)) {
          const nextDay = date.addToDate(endDate.value, { days: 1 });
          if (date.isValid(nextDay)) {
            const increasedDate = date.formatDate(nextDay, 'YYYY-MM-DD');
            console.log("End Date increased by one day:", increasedDate);

            newEndDate.value = increasedDate;
          } else {
            console.error("Invalid End Date after adding one day");
          }
        }

        let dateRangeFilter = "";

        if (date.isValid(startDate.value) && date.isValid(newEndDate.value)) {
          dateRangeFilter = `created_at:${startDate.value},${newEndDate.value}`;
        }


        let causerId = "";
        if (model.value !== "All Users" && model.value !== null) {
          causerId = `search=causer_id:${model.value};`;
          console.log("User Found!", causerId);
        }

        const apiEndpoint = dateRangeFilter
          ? `/activity_logs?orderBy=id&sortedBy=desc&searchJoin=and&${causerId}${dateRangeFilter}&page=${page}`
          : `/activity_logs?orderBy=id&sortedBy=desc&page=${page}`;



        const response = await api.get(apiEndpoint);
        if (response) {
          console.log("Response:", response);
          rows.value = response.data.data;
          const meta = response.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };

        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    onMounted(async () => {
      await fetchUsers();
      await fetchActivityLogs();

    });



    const onRequest = (props) => {
      fetchActivityLogs(props.pagination.page);
    };

    watch(model, (selectedValue) => {
      // Log the selected label and value
      console.log("Selected Label:", subjectOptions.value.find(option => option.value === selectedValue).label);
      console.log("Selected Value (ID):", selectedValue);
    });




    return {
      columns,
      rows,
      startDate,
      endDate,
      model,

      fetchActivityLogs,
      pagination,
      onRequest,
      subjectOptions,



    };
  },
};
</script>

<style></style>
