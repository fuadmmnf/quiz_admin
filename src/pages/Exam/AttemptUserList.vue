<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Attempted Users List
          <div class="text-subtitle2">Exam : {{ examTitle }}</div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Recalculate Marks"
            @click="recalculateMarks"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <user-list ref="userListRef" @totalAttempts="totalAttempts"></user-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import UserList from "src/components/exam/UserList.vue";
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "CompletedExams",
  components: {
    UserList,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const attempts = ref(0);
    const userListRef = ref(null);

    const recalculateMarks = async () => {
      const process = $q.dialog({
        message: "Recalculating marks...",
        progress: true,
        persistent: true,
        ok: false,
      });
      api
        .put(`/exam-markings`, {
          exam_id: route.params.id,
          exam_attempt_ids: "*",
        })
        .then(() => {
          // confirm
          $q.notify({
            message: "Marks recalculated successfully",
            color: "green",
            icon: "check",
          });
        })
        .finally(() => {
          if (userListRef.value) {
            userListRef.value.fetchCompletedUsers();
            process.hide();
          }
        });
    };
    const totalAttempts = async (total) => {
      attempts.value = await total;
    };

    return {
      recalculateMarks,
      totalAttempts,
      attempts,
      userListRef,
    };
  },
  data() {
    return {
      examTitle: "",
    };
  },
  methods: {
    getExamTitle() {
      api
        .get(`/exams/${this.$route.params.id}?filter=title`)
        .then((res) => {
          this.examTitle += res.data.data.title;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getExamTitle();
  },
};
</script>

<style></style>
