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
                :tableData="allCategories"
                @editItem="editItem"
                @deleteItem="deleteItem"
              ></simple-hierarchy>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5">
          <div class="row ">
            <div class="col-12">
              <q-card>
                <q-card-section>
                  <div class="text-h6 text-indigo-8">
                    {{ isEditing ? "Edit" : "Add" }} Category
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
                      v-model="selectedParentCategory"
                      :options="allCategories"
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
            <div class="col-12 q-mt-lg">
              <q-card>
                <q-card-section>
                  <div class="text-h6 text-grey-8">
                    Top Tags
                    <q-btn
                      class="float-right text-capitalize text-indigo-8 shadow-3"
                      icon="bookmark"
                      @click="updateTags"
                      label="Update Tags"
                    />
                  </div>
                </q-card-section>
                <q-card-section>
                    <q-select
                      v-model="tagIds"
                      :options="allCategories"
                      label="Select Tag"
                      option-label="name"
                      option-value="id"
                      outlined
                      use-input
                      multiple
                      use-chips
                      emit-value
                      map-options
                      clearable
                      @clear="
                            (val) => {
                              tagIds = [];
                            }
                          "
                    />
                </q-card-section>
              </q-card>
            </div>
          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";
import {useCategoryStore} from "stores/category";

export default defineComponent({
  name: "Category",
  setup() {
    const store = useStore();
    const categoryStore=useCategoryStore()
    const { $q } = useQuasar();
    return {
      store,
      $q,
      categoryStore
    };
  },
  data() {
    return {
      name: ref(""),
      pageName: "Category",
      tagIds:ref([]),
      allCategories: [],
      selectedParentCategory: ref(null),

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

  },
  methods: {
    getCategories() {
      api
        .get("/categories/category?limit=0")
        .then((response) => {
          console.log(response.data.data)
          this.allCategories = response.data.data.map((c) => {
            c.children = c.children.data !== undefined ? c.children.data : [];
            return c;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateTags(){
      try {
        console.log(this.tagIds)
        const response=await api.put(`/categories/tag`,{
          category_ids:this.tagIds,
          tag:'top'
        });
        this.$q.notify({
          message: "Top Categories Updated",
          color: "positive",
          icon: "check",
        });
      }catch (error){

      }
    },
    async getTopTags(){
      try {
        const response=await api.get(`/categories?search=tag:top&limit=0`);
       if( response.data.data.length>0){
         response.data.data.map(item=>{
           this.tagIds.push(item.id)
         })
       }

      }catch (error){

      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      let categoryType = "category";
      if (this.selectedParentCategory != null) {
        categoryType = "sub-category";
      }

      if (this.isEditing) {
        api
          .patch(`/categories/${this.isEditing.id}`, {
            name: this.name,
            parent_id: this.selectedParentCategory,
            type: categoryType,
          })
          .then((res) => {
            this.$q.notify({
              message: "Category Updated Successfully",
              color: "positive",
              icon: "check",
            });
            this.name = "";
            this.selectedParentCategory = null;
            this.isEditing = null;
            this.categoryStore.loadCategories();
            this.getCategories();
          });
      } else {
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
            this.selectedParentCategory = null;
            this.getCategories();
            this.categoryStore.loadCategories();
          });
      }
    },
    onReset(evt) {
      this.name = "";
      this.selectedParentCategory = null;
      this.isEditing = null;
    },
    editItem(row) {
      console.log("fffrow", row);
      this.name = row.name;
      this.selectedParentCategory = row.parent_id !== "" ? row.parent_id : null;
      this.isEditing = { status: true, id: row.id };
    },
    deleteItem(row) {
      // confirm
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete this category?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api.delete(`/categories/${row.id}`).then((res) => {
            this.$q.notify({
              message: "Category Deleted Successfully",
              color: "negative",
              icon: "check",
            });

            this.getCategories();
          });
        });
    },
  },
  mounted() {
    this.getCategories();
    this.getTopTags()
  },
});
</script>

<style></style>
