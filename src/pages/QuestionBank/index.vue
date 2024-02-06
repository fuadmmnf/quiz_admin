<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Question Banks
          <div class="text-subtitle2">
            List of all {{route.params.type}} question banks are shown here
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Add Questionbank" icon="add"
                 :to="{name: 'questionbank-create', params: route.query.course_id?.length? {course_id: route.query.course_id}: {}}"/>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>

    <QuestionBankHierarchyList :type="route.params.type"></QuestionBankHierarchyList>
  </q-page>
</template>
<script>
import QuestionBankHierarchyList from "components/question-bank/QuestionBankHierarchyList.vue";
import {useRoute} from "vue-router";

export default {
  components: {
    QuestionBankHierarchyList,
  },
  setup() {
    const route = useRoute();
    return {route};
  },
};

</script>
