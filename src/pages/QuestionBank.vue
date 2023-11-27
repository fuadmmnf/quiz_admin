<template>
  <div class="row q-col-gutter-md q-pa-md">
    <div class="col-7">
      <q-card>
        <q-card-section>
          <div class="q-pa-md">
            <q-table
              flat bordered
              title="Question Banks"
              :rows="rows"
              :columns="columns"
              row-key="name"
            >

              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width />
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td auto-width>
                    <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
                  </q-td>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <template v-if="col.name === 'action' && !props.row.children.length">
                      <div>
                        <q-btn size="sm" color="positive" icon="add" class="q-mr-sm"  @click="prompt = true"/>
                        <q-btn size="sm" color="warning" icon="edit"  />
                      </div>
                    </template>
                    <!-- Display other columns normally -->
                    <template v-else>
                      {{ col.value }}
                    </template>
                  </q-td>
                </q-tr>

                <q-tr v-show="props.expand" :props="props">
                  <q-td colspan="100%">

                    <q-table
                      flat bordered
                      :rows="props.row.children"
                      :columns="columns"
                      row-key="name"
                      hide-header
                      :hide-bottom="rows.length > 0"
                    >

                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td auto-width>
                            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
                          </q-td>
                          <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                          >
                            <template v-if="col.name === 'action'">
                              <div>
                                <q-btn size="sm" color="positive" icon="add"  @click="prompt = true" class="q-mr-sm" />
                                <q-btn size="sm" color="warning" icon="edit"  />
                              </div>
                            </template>
                            <!-- Display other columns normally -->
                            <template v-else>
                              {{ col.value }}
                            </template>
                          </q-td>
                        </q-tr>
                        <!-- Additional nested rows for expandable options -->
                        <q-tr v-show="props.expand" :props="props">
                          <q-td colspan="100%">

                            <!-- Display subjects under BCS1 -->
                            <q-table
                              flat bordered
                              :rows="props.row.children"
                              :columns="columns"
                              row-key="name"
                              hide-header
                              :hide-bottom="props.row.children.length > 0"
                            >
                              <template v-slot:body="subjectProps">
                                <q-tr :props="subjectProps">
                                  <q-td auto-width>
                                    <!-- Add your subject-specific content here if needed -->
                                  </q-td>
                                  <q-td
                                    v-for="subjectCol in subjectProps.cols"
                                    :key="subjectCol.name"
                                    :props="subjectProps"
                                  >
                                    {{ subjectCol.value }}
                                  </q-td>
                                </q-tr>
                              </template>
                            </q-table>

                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </q-td>
                </q-tr>
              </template>
            </q-table>


            <q-dialog v-model="prompt" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">Row Name</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input dense v-model="rowName" autofocus @keyup.enter="prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Add Row" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-5">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-indigo-8">Add/Edit</div>

          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md q-mt-lg"
          >
            <q-input
              outlined
              v-model="name"
              :label="`Exam name *`"
              :hint="`Exam name must be unique`"
              :rules="[(val) => !!val || 'Field is required']"
            />

            <q-select
              outlined
              option-label="name"
              option-value="id"
              v-model="selectedParentCategory"
              :options="allCategories"
              :label="`Parent Category`"
              map-options
              emit-value
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>

</template>

<script>


import {ref} from "vue";

export default {
  setup() {

    const columns = [
      {
        name: 'name',
        required: true,
        label: 'Title',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true }
    ];

    const rows = [
      {
        name: 'BCS',

        children: [
          {
            name: 'BCS1',

            children: [{
              name: 'Bangla',
            },
              {
                name: 'English',
              },
              {
                name: 'GK',
              },]
          },
          {
            name: 'BCS2',

            children: []
          }
        ]
      },
      {
        name: 'MBBS',

        children: [
          {name: 'MBBS1',
            children: [
              {
                name: 'Bangla',
              },
              {
                name: 'English',
              },
              {
                name: 'GK',
              },
            ]
          },

        ]
      }
    ];

    return {
      prompt: ref(false),
      rowName: ref(''),
      columns,
      rows
    };
  },

}
</script>
