<template>
  <q-card class="no-shadow" bordered>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            filled
            v-model="searchData.keywords"
            :label="`Search Question`"
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
                  :options="categoryOptions"
                  :label="`Category`"
                  lazy-rules
                  map-options
                  emit-value
                />
              </div>
              <div class="col-4">
                <q-select
                  filled
                  v-model="searchData.subject"
                  :options="subjectOptions"
                  :label="`Subject`"
                  lazy-rules
                  map-options
                  emit-value
                />
              </div>
              <div class="col-4">
                <q-select
                  filled
                  v-model="searchData.faculty"
                  :options="facultyOptions"
                  :label="`Faculty`"
                  lazy-rules
                  map-options
                  emit-value
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

export default {
  name: "SearchExams",
  props: {},
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      name: "",
      expanded: true,
      categoryOptions: [],
      subjectOptions: [],
      facultyOptions: [],
      searchData: {
        keywords: "",
        type: "",
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
        type: "",
        category: "",
        subject: "",
        faculty: "",
      };
      this.$emit("search", this.searchData);
    },
  },
  mounted() {
    this.store.categories.map((category) => {
      this.categoryOptions.push({
        label: category.name,
        value: category.id,
      });
    });
    this.store.subject.map((subject) => {
      this.subjectOptions.push({
        label: subject.name,
        value: subject.id,
      });
    });
    this.store.faculty.map((faculty) => {
      this.facultyOptions.push({
        label: faculty.name,
        value: faculty.id,
      });
    });
  },
};
</script>

<style></style>
