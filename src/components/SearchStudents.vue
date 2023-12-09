<template>
  <q-card class="no-shadow" bordered>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input v-model="searchData.keywords" filled :label="`Search Students`">
            <template #append>
              <!-- filter icon -->

              <q-btn
                flat
                round
                dense
                icon="search"
                class="bg-grey-3"
                style="width: 40px; height: 40px"
                @click="onSearch"
              />

              <!-- reset icon -->
              <q-btn
                flat
                round
                dense
                icon="close"
                class="bg-grey-3"
                style="width: 40px; height: 40px"
                @click="onReset"
              />
            </template>
          </q-input>

          <!-- filtering options div -->
          <q-expansion-item
            v-model="expanded"
            class="q-mt-sm text-grey-6"
            icon="filter_list"
            label="Filtering Options"
          >
            <div class="row q-col-gutter-md q-mt-sm">

              <div class="col-4">
                <q-select
                  v-model="searchData.institution"
                  filled
                  :options="categoryStore.getInstitutionOptions"
                  :label="`Institution`"
                  lazy-rules
                  map-options
                  emit-value
                  clearable
                />
              </div>
              <div class="col-4">
                <q-select
                  v-model="searchData.faculty"
                  filled
                  :options="categoryStore.getFacultyOptions"
                  :label="`Faculty`"
                  lazy-rules
                  map-options
                  emit-value
                  clearable
                />
              </div>
            </div>
          </q-expansion-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useCategoryStore } from "stores/category";
import { ref } from "vue";

export default {
  name: "Search",

  setup() {
    const categoryStore = useCategoryStore();
    const expanded = ref(true);
    const searchData = ref({
      keywords: "",
      type: "",
      institution: "",
      faculty: "",
    });

    return {
      name,
      categoryStore,
      expanded,
      searchData,
    };
  },

  methods: {
    onSearch() {
      this.$emit("search", this.searchData);
    },

    onReset() {
      this.searchData = {
        keywords: "",
        type: "",
        institution: "",
        faculty: "",
      };
      this.$emit("search", this.searchData);
    },
  },
};
</script>
<style scoped></style>
