<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="text-h6 text-indigo-8">Subjects</div>
        <div class="text-subtitle2">List of all subjects</div>
      </q-card-section>
    </q-card>
    <q-separator spaced />

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-7">
          <q-card>
            <q-card-section>
              <simple-hierarchy :page="pageName"></simple-hierarchy>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-indigo-8">Add/Edit Subject</div>

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md q-mt-lg"
              >
                <q-input
                  filled
                  v-model="name"
                  stack-label
                  :label="`Subject name `"
                  :hint="`$Subject name must be unique`"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />

                <q-select
                  filled
                  stack-label
                  v-model="model"
                  :options="options"
                  :label="`Chapter`"
                  lazy-rules
                />
                <div>
                  <q-btn label="Submit" type="submit" color="primary" />
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
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default {
  name: "Subject",
  data() {
    return {
      pageName: "Subject",
      name: "",
      model: "",
      options: [
        { label: "Chapter", value: "" },
        { label: "Chapter 1", value: "1" },
        { label: "Chapter 2", value: "2" },
        { label: "Chapter 3", value: "3" },
        { label: "Chapter 4", value: "4" },
        { label: "Chapter 5", value: "5" },
      ],
    };
  },
  components: {
    SimpleHierarchy: defineAsyncComponent(() =>
      import("components/tree-table/SimpleHierarchy.vue")
    ),
    CustomHierarchy: defineAsyncComponent(() =>
      import("components/tree-table/CustomHierarchy.vue")
    ),
    TableActions: defineAsyncComponent(() =>
      import("components/tables/TableActions.vue")
    ),
  },
  methods: {
    onSubmit(evt) {
      console.log("@submit - do something here", evt);
      evt.target.submit();
    },
    onReset(evt) {
      console.log("@reset - do something here", evt);
    },
  },
};
</script>

<style></style>
