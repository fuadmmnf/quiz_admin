<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Notices
          <div class="text-subtitle2">
            List of all notices are shown here
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Notice" icon="add"
                 :to="{name: 'notice-create'}"/>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>

  </q-page>
</template>

<script>

import {useRoute} from "vue-router";
export default {
  name: "Notice",
  setup() {
    const route = useRoute();
    return {route};
  },
  mounted() {
  },
};
</script>

<style></style>
