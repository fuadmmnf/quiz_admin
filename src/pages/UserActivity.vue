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
    name: "action",
    label: "Action",
    field: "action",
    sortable: true,
  },
];

const rows = [
  {
    date: "2023-10-01",
    user: "User 1",
    action: "Logged in",
  },
  {
    date: "2023-10-02",
    user: "User 2",
    action: "Performed an action",
  },
  {
    date: "2023-10-03",
    user: "User 1",
    action: "Logged out",
  },
];

export default {
  data() {
    return {
      filter: "",
      columns: columns,
      rows: rows,
    };
  },
  computed: {
    filteredColumns() {
      return this.columns;
    },
    filteredRows() {
      const filterText = this.filter.toLowerCase();
      return this.rows.filter((row) => {
        return (
          row.user.toLowerCase().includes(filterText) ||
          row.action.toLowerCase().includes(filterText)
        );
      });
    },
  },
};
</script>

<style></style>
