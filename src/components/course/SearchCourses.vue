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
                <NestedSelectBox :initial-value="searchData.category" label="Category" :options="categoryStore.getRawCategoryOptions" @change="(option)=>{
                            searchData.category=option?.id
                              }">
                </NestedSelectBox>
              </div>
              <div class="col-4">
                <NestedSelectBox :initial-value="searchData.subject" label="Subject" :options="categoryStore.getRawSubjectOptions" @change="(option)=>{
                            searchData.subject=option?.id
                              }">
                </NestedSelectBox>
              </div>
              <div class="col-4">
                <NestedSelectBox :initial-value="searchData.faculty" label="Faculty" :options="categoryStore.getRawFacultyOptions" @change="(option)=>{
                            searchData.faculty=option?.id
                              }">
                </NestedSelectBox>
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
import NestedSelectBox from "components/NestedSelectBox.vue";

export default {
  name: "SearchCourses",
  components: {NestedSelectBox},
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
