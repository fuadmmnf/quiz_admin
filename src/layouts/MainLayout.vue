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
            style="color: red !important"
            type="a"
            href="https://github.com/sponsors/pratik227"
            target="_blank"
          >
            <i class="fa fa-heart fa-2x fa-beat"></i>
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
            to="/Roles/SubAdmin"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>SubAdmins</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/roles/moderator"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Moderators</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/roles/mentor"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Mentors</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item to="/category" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Category</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/faculty" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Faculty</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/subject" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="subject" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Subject</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/question" active-class="q-item-no-link-highlighting">
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
            to="/exam/draft"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Draft Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/exam/upcoming"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Upcoming Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/exam/ongoing"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Ongoing Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/exam/checking"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Checking Exams</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/exam/completed"
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
        <q-item to="/institutions" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Institutions</q-item-label>
          </q-item-section>
        </q-item>

<!--        <q-item to="/course" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="list" />-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Course</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item> -->

        <q-expansion-item icon="menu_open" label="Courses">
          <q-item
            to="/course/draft"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Draft Courses</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            to="/course/published"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Published Courses</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/course/completed"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Completed Courses</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-item
          to="/registered-students"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Registered students</q-item-label>

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

        <q-item
          to="/user-activity"
          active-class="q-item-no-link-highlighting"
          v-if="user && user.name === 'Super Admin'"
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Activity</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/student-list" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Student List</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/blog" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Blog</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="menu_open" label="Question Bank List">
          <q-item
            to="/question-bank-list"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Question bank 1</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item to="/question-bank" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Question Bank</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <q-item
          to="/lecture-classes"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Lecture Classes</q-item-label>
          </q-item-section>
        </q-item> -->
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

import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "src/stores/store";
import { loadFaculties, loadInstitution} from "src/services/category_service";
import {useCategoryStore} from "stores/category";

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
    const user = ref(null);
    const category = useCategoryStore();

    onMounted(async () => {
      // Call the action to fetch the user data
      await store.getAuthenticatedUser();


      const {
        data: facultyData,
        status: facultyStatus,
        error: facultyError,
      } = await loadFaculties({});
      if (facultyStatus === 200) {
        // console.log("Faculty", facultyData);
        category.setFaculties(facultyData.data);
      }

      const {
        data: institutionData,
        status: institutionStatus,
        error: institutionError,
      } = await loadInstitution({});
      if (institutionStatus === 200) {
        // console.log("Institution", institutionData);
        category.setInstitution(institutionData.data);
      }

      // Now, you can access the user object
      if (store.user) {
        user.value = store.user;
        // console.log(user.value.name);
      }
    });

    return {
      $q,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      store,
      user,
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
