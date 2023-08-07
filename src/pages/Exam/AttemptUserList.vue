<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Attempted Users List
          <div class="text-subtitle2">
            List of all attempted users are shown here
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <user-list></user-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import UserList from "src/components/exam/UserList.vue";

export default {
  name: "CompletedExams",
  components: {
    UserList,
  },
  setup() {},
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style></style>
