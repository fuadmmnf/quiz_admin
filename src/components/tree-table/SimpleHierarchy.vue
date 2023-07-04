<template>
  <span>
    <q-hierarchy :columns="columns" classes="no-shadow" :data="data">
      <template v-slot:body="props">
        <td data-th="Name">
          <div
            v-bind:style="props.setPadding(props.item)"
            :class="props.iconName(props.item) != 'done' ? 'q-pl-lg' : ''"
          >
            <q-btn
              @click="props.toggle(props.item)"
              v-if="props.iconName(props.item) != 'done'"
              :icon="props.iconName(props.item)"
              flat
              dense
            >
            </q-btn>
            <span class="q-ml-sm">{{ props.item.label }}</span>
          </div>
        </td>
        <td class="text-center">
          <q-btn
            @click="editItem(props.item)"
            icon="edit"
            size="sm"
            flat
            dense
            round
            color="primary"
          >
          </q-btn>
          <q-btn
            @click="deleteItem(props.item)"
            icon="delete"
            size="sm"
            flat
            dense
            round
            color="negative"
          >
          </q-btn></td
      ></template>
    </q-hierarchy>
  </span>
</template>

<script>
import { defineComponent } from "vue";

const columns = [
  {
    name: "Name",
    required: true,
    label: "Name",
    align: "left",
    field: "label",
    // (optional) tell QHierarchy you want this column sortable
    sortable: true,
    // If you want different sorting icon
    filterable: true,
  },
  {
    name: "Actions",
    label: "Actions",
    field: "actions",
    align: "center",
    filterable: false,
  },
];
const data = [
  {
    label: "Node 1",

    // id: 1,
    children: [
      {
        label: "Node 1.1",
        // id: 2
      },
      {
        label: "Node 1.2",
        // id: 3,
      },
    ],
  },
];
export default defineComponent({
  props: {
    page: String,
  },
  name: "SimpleHierarchy",
  setup() {
    const editItem = (row) => {
      // Implement edit logic here
      console.log("Edit item:", row);
    };

    const deleteItem = (row) => {
      // Implement delete logic here
      console.log("Delete item:", row);
    };

    return {
      columns,
      data,
      editItem,
      deleteItem,
    };
  },
});
</script>

<style scoped></style>
