<template>
  <div class="">
    <q-card bordered class="no-shadow">
      <q-card-section>
        <div class="text-h6 text-grey-8">
          {{ data.title }}
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="q-pa-none">
        <q-table
            wrap-cells
            no-data-label="No data available"
            ref="tableRef"
            :columns="data.columns"
            :rows="data.rows"
            :wrap-cells="true"
            class="no-shadow"
            row-key="id"
            :hide-pagination="true"
            :rows-per-page-options="[data.rows.length]"
            flat
            bordered
        >
        </q-table>

      </q-card-section>
    </q-card>
  </div>
</template>
<script >
import {useStore} from "stores/store";
import {ref} from "vue";

export default {
  name:'StudentExamHistoryReport',
  props: ['data'],
  mounted() {
    console.log("Hello World")
    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit("domRendered");
      }, 3000);
    });
  },
  setup(){
    const store=useStore();
    const pdfTable = ref(null);


    return {
      store
    }
  },
};
</script>
<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  background-color: #f2f2f2;
}
</style>



