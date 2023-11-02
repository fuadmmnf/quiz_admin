<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="User Activity"
      :rows="filteredRows"
      :columns="filteredColumns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <div class="q-mr-md q-mt-md" style="max-width: 150px">
          <q-input
            filled
            v-model="startDate"
            mask="date"
            :rules="['date']"
            placeholder="Start Date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
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

        <div class="q-mr-md q-mt-md" style="max-width: 150px">
          <q-input
            filled
            v-model="endDate"
            mask="date"
            :rules="['date']"
            placeholder="End Date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
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
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
const columns = [
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: "date",
    sortable: true,
  },
  {
    name: "user",
    label: "User",
    field: "user",
    sortable: true,
  },
  {
    name: "resourceType",
    label: "Resource Type",
    field: "resourceType",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    sortable: true,
  },
];

const rows = [
  {
    date: "2023-10-01 (12:00 AM)",
    user: "User 1",
    action: "Logged in",
    resourceType: "Resource (Courses)",
  },
  {
    date: "2023-10-02 (12:00 PM)",
    user: "User 2",
    action: "Performed an action",
    resourceType: "Resource (Exams)",
  },
  {
    date: "2023-10-03 (2:00 AM)",
    user: "User 1",
    action: "Logged out",
    resourceType: "Resource (Courses)",
  },
];

export default {
  setup() {
    return {};
  },
  data() {
    return {
      filter: "",
      columns: columns,
      rows: rows,
      startDate: null, // Define startDate property
      endDate: null, // Define endDate property
    };
  },
  computed: {
    filteredColumns() {
      return this.columns;
    },
    filteredRows() {
      const filterText = this.filter.toLowerCase();
      const startDate = this.startDate ? new Date(this.startDate) : null;
      const endDate = this.endDate ? new Date(this.endDate) : null;

      return this.rows.filter((row) => {
        const rowDate = new Date(row.date);

        return (
          (startDate === null || rowDate >= startDate) &&
          (endDate === null || rowDate <= endDate) &&
          (row.user.toLowerCase().includes(filterText) ||
            row.action.toLowerCase().includes(filterText))
        );
      });
    },
  },
};
</script>

<style></style>
