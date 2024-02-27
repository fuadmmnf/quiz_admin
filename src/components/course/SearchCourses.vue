<template>
  <q-card class="no-shadow" bordered>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            filled
            v-model="searchData.keywords"
            :label="`Search Courses `"
          >
            <template v-slot:append>
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
            class="q-mt-sm text-grey-6"
            v-model="expanded"
            icon="filter_list"
            label="Filtering Options"
          >
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-4">
                <q-select
                  filled
                  v-model="searchData.category"
                  :options="categoryStore.getCategoryOptions"
                  :label="`Category`"
                  lazy-rules
                  map-options
                  emit-value
                  clearable
                  @clear="searchData.category = ''"
                />
              </div>
              <div class="col-4">
                <q-select
                  filled
                  v-model="searchData.subject"
                  :options="categoryStore.getSubjectOptions"
                  :label="`Subject`"
                  lazy-rules
                  map-options
                  emit-value
                  clearable
                  @clear="searchData.subject = ''"
                />
              </div>
              <div class="col-4">
                <q-select
                  filled
                  v-model="searchData.faculty"
                  :options="categoryStore.getFacultyOptions"
                  :label="`Faculty`"
                  lazy-rules
                  map-options
                  emit-value
                  clearable
                  @clear="searchData.faculty = ''"
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
import { useStore } from "src/stores/store";
import {useCategoryStore} from "stores/category";

export default {
  name: "SearchCourses",
  props: {},
  setup() {
    const store = useStore();
    const categoryStore = useCategoryStore();
    return { store ,categoryStore};
  },
  data() {
    return {
      name: "",
      expanded: true,
      searchData: {
        keywords: "",
        category: "",
        subject: "",
        faculty: "",
      },
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchData);
    },
    onReset() {
      this.searchData = {
        keywords: "",
        category: "",
        subject: "",
        faculty: "",
      };
      this.$emit("search", this.searchData);
    },
  },
  mounted() {},
};
</script>

<style></style>
