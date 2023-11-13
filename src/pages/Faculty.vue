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
              <simple-hierarchy
                :page="pageName"
                :tableData="tableData"
                @editItem="editItem"
                @deleteItem="deleteItem"
              ></simple-hierarchy>
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
                  outlined
                  v-model="name"
                  :label="`Faculty/Discipline name *`"
                  :hint="`Faculty/Discipline name must be unique`"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />

                <q-select
                  outlined
                  v-model="selectedParentCategory"
                  :options="parentCategoryOptions"
                  :label="`Parent Faculty`"
                  lazy-rules
                  map-options
                  emit-value
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
import { api } from "src/boot/axios";
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";

export default defineComponent({
  name: "Faculty",
  setup() {
    const store = useStore();
    const { $q } = useQuasar();
    return {
      $q,
      store,
    };
  },
  data() {
    return {
      pageName: "Faculty",
      name: "",
      model: "",
      tableData: [],
      selectedParentCategory: ref(null),
      parentCategoryOptions: [],
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
      evt.preventDefault();
      let categoryType = "faculty";
      if (this.selectedParentCategory != null) {
        categoryType = "discipline";
      }
      api
        .post("/categories", {
          name: this.name,
          parent_id: this.selectedParentCategory,
          type: categoryType,
        })
        .then((res) => {
          this.$q.notify({
            message: "Category Added Successfully",
            color: "positive",
            icon: "check",
          });
          this.name = "";
          this.tableData = [];
          this.setDataList();
        });
    },
    onReset(evt) {
      console.log("@reset - do something here", evt);
    },
    editItem(item) {
      this.name = item.name;
      this.selectedParentCategory = item.parent_id;
    },
    deleteItem(row) {},
    setDataList() {
      api.get("/categories/faculty?limit=0").then((res) => {
        res.data.data.map((item) => {
          this.tableData.push({
            name: item.name,
            id: item.id,
            children: [],
          });
        });
        api.get("/categories/discipline?limit=0").then((res) => {
          res.data.data.map((item) => {
            this.tableData.map((parent) => {
              if (parent.id == item.parent_id) {
                parent.children.push({
                  name: item.name,
                  id: item.id,
                });
              }
            });
          });
        });
      });
    },
  },
  mounted() {
    this.setDataList();
    this.store.faculties.map((item) => {
      this.parentCategoryOptions.push({
        label: item.name,
        value: item.id,
      });
    });
  },
});
</script>

<style></style>
