<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title> Quizmaster Admin </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          >
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="white"
            icon="fab fa-github"
            type="a"
            href="https://github.com/pratik227/quasar-admin"
            target="_blank"
          >
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="white"
            icon="fab fa-twitter"
            type="a"
            href="https://twitter.com/pratik227"
            target="_blank"
          >
          </q-btn>

          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <!-- logout button -->
          <q-btn
            round
            dense
            flat
            color="white"
            icon="power_settings_new"
            @click="logout"
          >
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>CRM Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="people" label="Roles">
          <q-item
            to="/Roles/Admin"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Admins</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/Roles/Moderator"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Moderators</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/Roles/Mentor"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Mentors</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item to="/Category" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Category</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Faculty" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Faculty</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Subject" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="subject" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Subject</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Question" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="question_answer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Question</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Exam -->

        <q-expansion-item icon="menu_open" label="Exams">
          <q-item
            to="/Exam/Draft"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Draft Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/Exam/Upcoming"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Upcoming Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/Exam/Ongoing"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Ongoing Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/Exam/Checking"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Checking Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/Exam/Completed"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Completed Exams</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>TreeTable</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Institutions" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Institutions</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Course" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Course</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          to="/RegisteredStudents"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Registered studens</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/send-message" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Send Message</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import Messages from "./Messages.vue";

import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    Messages,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const store = useStore();

    return {
      $q,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      store,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.store.resetState();

      this.$router.push("/login");
    },
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

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
