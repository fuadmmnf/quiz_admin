<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "./stores/store";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    this.store.getCategories();
    this.store.getFaculty();
    this.store.getSubject();
    this.store.getSubcategories();
    this.store.getDisciplines();
    this.store.getChapters();
  },
});
</script>
