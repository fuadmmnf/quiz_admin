<template>
  <span>
    <q-hierarchy :columns="columns" classes="no-shadow" :data="tableData">
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
            <span class="q-ml-sm">{{ props.item.name }}</span>
          </div>
        </td>
        <td class="text-center">
          <!-- <q-btn
            @click="editItem(props.item)"
            icon="edit"
            size="sm"
            flat
            dense
            round
            color="primary"
          >
          </q-btn> -->
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
import {defineComponent} from "vue";

export default {
  props: {
    page: String,
    tableData: Array,
  },
  name: "SimpleHierarchy",
  data() {
    return {
      columns: [
        {
          name: "Name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
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
      ]
    }
  },
  methods: {
    editItem(row) {
      this.$emit("editItem", row);
    },
    deleteItem(row) {
      this.$emit("deleteItem", row);
    },
  },
  mounted() {
    console.log(this.tableData);
  },
};
</script>

<style scoped></style>
