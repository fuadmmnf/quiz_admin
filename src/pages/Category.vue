<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="text-h6 text-indigo-8">Categories</div>
        <div class="text-subtitle2">List of all categories</div>
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
              ></simple-hierarchy>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-indigo-8">Add/Edit Category</div>

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md q-mt-lg"
              >
                <q-input
                  filled
                  v-model="name"
                  stack-label
                  :label="`Category name *`"
                  :hint="`Category name must be unique`"
                  :rules="[(val) => !!val || 'Field is required']"
                />

                <q-select
                  filled
                  v-model="selectedParentCategory"
                  :options="parentCategoryOptions"
                  :label="`Parent Category`"
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

export default defineComponent({
  name: "Category",
  setup() {
    const { $q } = useQuasar();
    return {};
  },
  data() {
    return {
      name: ref(""),
      pageName: "Category",
      tableData: [],
      selectedParentCategory: ref(0),
      parentCategoryOptions: [
        {
          label: "Category 1",
          value: "Category 1",
        },
        {
          label: "Category 2",
          value: "Category 2",
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
      evt.preventDefault();
      api
        .post("/categories", {
          name: this.name,
          parent_id: this.selectedParentCategory,
          type: "category",
        })
        .then((res) => {
          this.$q.notify({
            message: "Category Added Successfully",
            color: "positive",
            icon: "check",
          });
          this.name = "";
          this.tableData = [];
          this.getCategories();
        });
      console.log(this.tableData);
    },
    onReset(evt) {
      this.name = "";
      this.selectedParentCategory = null;
    },
    editItem(row) {
      this.name = row.name;
    },
    getCategories() {
      api.get("/categories/category").then((res) => {
        res.data.data.map((item) => {
          this.tableData.push({
            name: item.name,
            real_id: item.real_id,
            id: item.id,
            children: [],
          });
        });
      });
    },
  },

  mounted() {
    this.getCategories();
  },
});
</script>

<style></style>
