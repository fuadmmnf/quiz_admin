<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="text-h6 text-indigo-8">Subjects</div>
        <div class="text-subtitle2">List of all Subjects</div>
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
                :tableData="allSubjects"
                @editItem="editItem"
                @deleteItem="deleteItem"
              ></simple-hierarchy>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-indigo-8">
                {{ isEditing ? "Edit" : "Add" }} Subject
              </div>

              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md q-mt-lg"
              >
                <q-input
                  outlined
                  v-model="name"
                  :label="`Category name *`"
                  :hint="`Category name must be unique`"
                  :rules="[(val) => !!val || 'Field is required']"
                />

                <q-select
                  outlined
                  option-label="name"
                  option-value="id"
                  v-model="selectedParentSubject"
                  :options="allSubjects"
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

import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";
import {addCategory, editCategory, loadSubjects} from "src/services/category_services";

export default defineComponent({
  name: "Category",
  setup() {
    const store = useStore();
    const { $q } = useQuasar();
    return {
      store,
      $q,
    };
  },
  data() {
    return {
      name: ref(""),
      pageName: "Subject",
      allSubjects: [],
      selectedParentSubject: ref(null),

      isEditing: ref(null),
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

    async getSubjects() {
      const {data, status, error} = await loadSubjects();

      if(status === 200){
        this.allSubjects = data.data.map((c) => {
          c.children = c.children.data !== undefined ? c.children.data : [];
          return c;
        });
      }else{
        console.error("Failed to fetch subjects. Status:", error);
      }
    },
    async onSubmit(evt) {
      evt.preventDefault();
      let categoryType = "subject";
      if (this.selectedParentSubject != null) {
        categoryType = "chapter";
      }

      if (this.isEditing) {

        const {status, error} = await editCategory(this.isEditing.id, {
          name: this.name,
          parent_id: this.selectedParentSubject,
          type: categoryType,
        });

        if (status === 200) {
          this.$q.notify({
            message: "Subject Updated Successfully",
            color: "positive",
            icon: "check",
          });
          this.name = "";
          this.selectedParentSubject = null;
          this.isEditing = null;
          await this.getSubjects();
        } else {
          console.error("Failed to update category. Status:", status, "Error:", error);
        }

      } else {

        const { status, error } = await addCategory({
          name: this.name,
          parent_id: this.selectedParentSubject,
          type: categoryType,
        });

        if (status === 201) {
          this.$q.notify({
            message: "Subject/Chapter Added Successfully",
            color: "positive",
            icon: "check",
          });
          this.name = "";
          this.selectedParentSubject = null;
          await this.getSubjects();
        } else {
          console.error("Failed to add category. Status:", status, "Error:", error);
        }

      }
    },
    onReset(evt) {
      this.name = "";
      this.selectedParentSubject = null;
      this.isEditing = null;
    },
    editItem(row) {
      this.name = row.name;
      this.selectedParentSubject = row.parent_id !== "" ? row.parent_id : null;
      this.isEditing = { status: true, id: row.id };
    },
    deleteItem(row) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete this subject?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api.delete(`/categories/${row.id}`).then((res) => {
            this.$q.notify({
              message: "Subject Deleted Successfully",
              color: "negative",
              icon: "check",
            });
            this.getSubjects();
          });
        });
    },
  },
  mounted() {
    this.getSubjects();
  },
});
</script>

<style></style>
