<template>
  <q-card :class="!$q.dark.isActive?'my-lg q-pa-md q-ma-sm bg-grey-2':'my-lg q-pa-md q-ma-sm bg-grey-8'">
    <q-toolbar>
      <q-ribbon
        position="left"
        color="rgba(0,0,0,.58)"
        background-color="#c0c0c0"
        leaf-color="#a0a0a0"
        leaf-position="bottom"
        decoration="rounded-out"
      >
        <q-toolbar-title class="example-title" style="padding: 5px 20px;">
          <span class="ellipsis">Basic</span>
        </q-toolbar-title>
      </q-ribbon>
    </q-toolbar>
    <q-card-section class="q-pb-sm">

    </q-card-section>
    <q-card-section>
      <q-table
        flat
        bordered
        :rows="hierarchicalData"
        :columns="columns"
        row-key="label"

      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="accent"
                round
                dense
                @click="props.row.__qmeta.expand = !props.row.__qmeta.expand"
                :icon="props.row.__qmeta.expand ? 'remove' : 'add'"
              />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
              <q-btn size="sm" color="primary" round dense>
                <q-icon name="edit" />
              </q-btn>
              <q-btn size="sm" color="positive" round dense>
                <q-icon name="add" />
              </q-btn>
            </q-td>

          </q-tr>
          <q-tr v-show="props.row.__qmeta.expand" :props="props">
            <q-td colspan="100%">
              <q-hierarchy
                :columns="columns"
                :data="props.row.children"
              ></q-hierarchy>
            </q-td>

          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const columns = [
      { name: 'name', label: 'Title', align: 'left', field: 'label', sortable: true },
      { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true }
    ];

    const data = [
      {
        label: 'BCS',

        children: [
          {
            label: 'BCS1',
            action: 'data',
            children: [
              { label: 'Bangla' },
              { label: 'English' },
              { label: 'GK' }
            ]
          },
          {
            label: 'BCS2',
            children: []
          }
        ]
      },
      {
        label: 'MBBS',
        children: [
          {
            label: 'MBBS1',
            children: [
              { label: 'Bangla' },
              { label: 'English' },
              { label: 'GK' }
            ]
          }
        ]
      }
    ];

    const hierarchicalData = ref(data.map(item => ({ ...item, __qmeta: { expand: false } })));

    return {
      columns,
      hierarchicalData,

    };
  },
};
</script>

<!--<template>-->
<!--  <q-card :class="!$q.dark.isActive?'my-lg q-pa-md q-ma-sm bg-grey-2':'my-lg q-pa-md q-ma-sm bg-grey-8'">-->
<!--    <q-toolbar>-->

<!--        <q-toolbar-title-->
<!--          class="example-title"-->
<!--          style="padding: 5px 20px;"-->
<!--        ><span class="ellipsis">Basic</span></q-toolbar-title>-->

<!--    </q-toolbar>-->

<!--    <q-card-section>-->
<!--      <q-hierarchy :columns="columns" :data="data">-->
<!--        <template v-slot:action="props">-->
<!--          <q-btn-->
<!--            icon="mdi-pencil"-->

<!--            class="q-ml-xs"-->
<!--            size="sm"-->
<!--          />-->
<!--          <q-btn-->
<!--            icon="mdi-plus"-->

<!--            class="q-ml-xs"-->
<!--            size="sm"-->
<!--          />-->
<!--        </template>-->
<!--      </q-hierarchy>-->

<!--    </q-card-section>-->
<!--  </q-card>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  setup() {-->
<!--    const columns = [-->
<!--      {name: 'name', label: 'Title', align: 'left', field: 'label', sortable: true},-->
<!--      {name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true}-->
<!--    ];-->

<!--    const data = [-->
<!--      {-->
<!--        label: 'BCS',-->
<!--        children: [-->
<!--          {-->
<!--            label: 'BCS1',-->
<!--            children: [-->
<!--              {label: 'Bangla'},-->
<!--              {label: 'English'},-->
<!--              {label: 'GK'}-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            label: 'BCS2',-->
<!--            children: []-->
<!--          }-->
<!--        ]-->
<!--      },-->
<!--      {-->
<!--        label: 'MBBS',-->
<!--        children: [-->
<!--          {-->
<!--            label: 'MBBS1',-->
<!--            children: [-->
<!--              {label: 'Bangla'},-->
<!--              {label: 'English'},-->
<!--              {label: 'GK'}-->
<!--            ]-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    ];-->



<!--    return {-->
<!--      columns,-->
<!--      data,-->

<!--    };-->
<!--  }-->
<!--}-->
<!--</script>-->
