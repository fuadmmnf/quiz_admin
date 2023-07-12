<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit Questions in Exam</div>
        <div class="row">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <!-- search card with filtering option filter icon -->
    <q-expansion-item
      expand-separator
      icon="search"
      label="Search"
      class="q-card"
      header-class=" text-h6"
    >
      <q-card class="no-shadow" bordered>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input filled v-model="name" :label="`Search Questions to add`">
                <template v-slot:append>
                  <!-- filter icon -->

                  <q-btn
                    flat
                    round
                    dense
                    icon="search"
                    class="bg-grey-3"
                    style="width: 40px; height: 40px"
                  />
                </template>
              </q-input>

              <!-- filtering options div -->
              <q-expansion-item
                class="q-mt-sm text-grey-6"
                v-model="expanded"
                icon="filter_list"
                label="Filtering Options"
              >
                <div class="row q-col-gutter-md q-mt-sm">
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Category`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subcategory`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subject`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Chapter`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Faculty`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Discipline`"
                      lazy-rules
                    />
                  </div>
                </div>
              </q-expansion-item>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- question card with question name it wont be input, and input field named negative marks same row and a plus button below to add question -->
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">Question 1</div>
          <div class="row">
            <q-input
              outlined
              dense
              type="number"
              label="Negative Marks"
              class="q-mr-sm"
            />
            <q-btn
              color="primary"
              size="md"
              icon="add"
              round
              dense
              flat
              class="q-mr-sm"
            />
            <q-btn color="negative" size="md" icon="delete" round dense flat />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {};
</script>

<style></style>
