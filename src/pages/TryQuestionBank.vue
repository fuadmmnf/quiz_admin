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
        <q-toolbar-title
          class="example-title"
          style="padding: 5px 20px;"
        ><span class="ellipsis">Question Banks</span></q-toolbar-title>
      </q-ribbon>
    </q-toolbar>
    <q-card-section class="q-pb-sm">
      <code-tabs :tagParts="tagParts"></code-tabs>
    </q-card-section>
    <q-card-section>
      <q-hierarchy :columns="columns" :data="data" p>
        <template v-slot:body="props">
          <td data-th="Name">
            <div v-bind:style="props.setPadding(props.item)"
                 :class="props.iconName(props.item)!=='done'?'q-pl-lg':''">
              <q-btn @click="props.toggle(props.item)" v-if="props.iconName(props.item)!=='done'"
                     :icon="props.iconName(props.item)" flat
                     dense>
              </q-btn>
              <q-icon class="q-mx-sm" size="xs" v-else name="list"></q-icon>
              <span class="q-ml-sm">{{ props.item.label }}</span>
            </div>
          </td>
          <td class="text-center">{{ props.item.description }}</td>
          <td class="text-left">
            <q-chip color="lime-9" square size="sm" class="text-white">
              Add
            </q-chip>
            <q-chip color="lime-9" square size="sm" class="text-white">
              Edit
            </q-chip>

            <q-chip color="lime-9" square size="sm" class="text-white">
              Delete
            </q-chip>

            <q-chip color="lime-9" v-if="props.item.children === undefined || props.item.children.length === 0" square
                    size="sm" class="text-white">
              Questions
            </q-chip>
          </td>
        </template>
      </q-hierarchy>
    </q-card-section>
  </q-card>
</template>

<script>
import {ref} from "vue";

export default {
  setup() {
    const columns = [
      {
        name: 'label',
        label: 'Label',
        align: 'left',
        field: 'label',
        // (optional) tell QHierarchy you want this column sortable
        sortable: true
      },
      {
        name: 'Description',
        label: 'Description',
        sortable: true,
        field: 'description',
        align: 'center'
      },
      {
        name: 'note',
        label: 'Note',
        sortable: true,
        field: 'note',
        align: 'left'
      }
    ]
    const data = [
      {
        label: "Node 1",
        description: "Node 1 description",
        note: "Node 1 note",
        // id: 1,
        children: [
          {
            label: "Node 1.1",
            description: "Node 1.1 description",
            note: "Node 1.1 note",
            // id: 2
          },
          {
            label: "Node 1.2",
            description: "Node 1.2 description",
            note: "Node 1.2 note",
            // id: 3,
            children: [
              {
                label: "Node 1.2.1",
                description: "Node 1.2.1 description",
                note: "Node 1.2.1 note",
                // id: 4
              },
              {
                label: "Node 1.2.2",
                description: "Node 1.2.2 description",
                note: "Node 1.2.2 note",
                // id: 5
              }
            ],
          }
        ],
      },
      {
        label: "Node 2",
        description: "Node 2 description",
        note: "Node 2 note",
        // id: 6,
        children: [
          {
            label: "Node 2.1",
            description: "Node 2.1 description",
            note: "Node 2.1 note",
            // id: 7,
            children: [
              {
                label: "Node 2.1.1",
                description: "Node 2.1.1 description",
                note: "Node 2.1.1 note",
                // id: 8
              },
              {
                label: "Node 2.1.2",
                description: "Node 2.1.2 description",
                note: "Node 2.1.2 note",
                // id: 9
              }
            ],
          },
          {
            label: "Node 2.2",
            description: "Node 2.2 description",
            note: "Node 2.2 note",
            // id: 10
          }
        ],
      }
    ]


    return {
      columns,
      data,

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
