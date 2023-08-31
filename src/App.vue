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
  async mounted() {
    await this.store.getCategories();
    await this.store.getFaculty();
    await this.store.getSubject();
    await this.store.getSubcategories();
    await this.store.getDisciplines();
    await this.store.getChapters();
  },
});
</script>
