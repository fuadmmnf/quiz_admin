<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="text-h6 text-indigo-8">Faculties</div>
        <div class="text-subtitle2">List of all faculties</div>
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
              <div class="text-h6 text-indigo-8">Add/Edit Faculty</div>

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md q-mt-lg"
              >
                <q-input
                  filled
                  v-model="name"
                  stack-label
                  :label="`Faculty name *`"
                  :hint="`Faculty name must be unique`"
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
                  :label="`Discipline`"
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
import TableActions from "components/tables/TableActions.vue";
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "Faculty",
  data() {
    return {
      pageName: "Faculty",
      name: "",
      model: "",
      options: [
        { label: "None", value: "" },
        { label: "Faculty of Engineering", value: "Faculty of Engineering" },
        { label: "Faculty of Science", value: "Faculty of Science" },
        { label: "Faculty of Arts", value: "Faculty of Arts" },
        { label: "Faculty of Medicine", value: "Faculty of Medicine" },
        { label: "Faculty of Law", value: "Faculty of Law" },
        { label: "Faculty of Education", value: "Faculty of Education" },
        { label: "Faculty of Business", value: "Faculty of Business" },
        { label: "Faculty of Agriculture", value: "Faculty of Agriculture" },
        {
          label: "Faculty of Social Sciences",
          value: "Faculty of Social Sciences",
        },
        {
          label: "Faculty of Environmental Sciences",
          value: "Faculty of Environmental Sciences",
        },
        { label: "Faculty of Pharmacy", value: "Faculty of Pharmacy" },
        {
          label: "Faculty of Veterinary Medicine",
          value: "Faculty of Veterinary Medicine",
        },
        { label: "Faculty of Dentistry", value: "Faculty of Dentistry" },
        {
          label: "Faculty of Management Sciences",
          value: "Faculty of Management Sciences",
        },
        {
          label: "Faculty of Health Sciences",
          value: "Faculty of Health Sciences",
        },
        {
          label: "Faculty of Basic Medical Sciences",
          value: "Faculty of Basic Medical Sciences",
        },
        {
          label: "Faculty of Clinical Sciences",
          value: "Faculty of Clinical Sciences",
        },
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
});
</script>

<style></style>
