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

  },
});
</script>
