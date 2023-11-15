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
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useStore } from "src/stores/store";

export default {
  name: "SearchCourses",
  props: {},
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      name: "",
      expanded: true,
      searchData: {
        keywords: "",
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
      };
      this.$emit("search", this.searchData);
    },
  },
  mounted() {},
};
</script>

<style></style>
