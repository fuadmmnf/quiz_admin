<template>
  <div class="q-pa-none">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-expansion-item
          icon="search"
          label="Search Courses"
          default-open
          class="bg-grey-1"
        >
          <div class="q-pa-md">
            <SearchCourses @search="onSearch" />
          </div>
        </q-expansion-item>

        <q-separator spaced="" />
        <q-card>
          <q-card-section>
            <q-table
              :columns="columns"
              :rows="courses"
              row-key="real_id"
              rows-per-page-options="[10]"
              :loading="loading"
              wrap-cells
              no-data-label="No data available"
              class="shadow-0"
              v-model:pagination="pagination"
              @request="onRequest"
            >
              <!-- table data -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <!-- serial -->

                  <q-td key="title" :props="props">
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="num_classes" :props="props">
                    {{ props.row.num_classes }}
                  </q-td>
                  <q-td key="num_exams" :props="props">
                    {{ props.row.num_exams }}
                  </q-td>

                  <q-td key="resources" :props="props">
                    <q-btn-dropdown class="q-mr-sm" color="primary" label="exams" dense size="sm"  dropdown-icon="">
                      <q-list>
                        <q-item clickable v-close-popup :to="{name: 'exam-list', params:{type: 'draft'}, query: {course_id: props.row.id}}">
                          <q-item-section>
                            <q-item-label>draft</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup :to="{name: 'exam-list', params:{type: 'upcoming'}, query: {course_id: props.row.id}}">
                          <q-item-section>
                            <q-item-label>upcoming</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup :to="{name: 'exam-list', params:{type: 'ongoing'}, query: {course_id: props.row.id}}">
                          <q-item-section>
                            <q-item-label>ongoing</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup :to="{name: 'exam-list', params:{type: 'completed'}, query: {course_id: props.row.id}}">
                          <q-item-section>
                            <q-item-label>completed</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                    <q-btn-dropdown class="q-mr-sm" color="primary" label="q-banks" dense size="sm"  dropdown-icon="">
                      <q-list>
                        <q-item clickable v-close-popup :to="{name: 'questionbank-list', params:{type: 'draft'}, query: {course_id: props.row.id}}">
                          <q-item-section>
                            <q-item-label>draft</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup :to="{name: 'questionbank-list', params:{type: 'published'}, query: {course_id: props.row.id}}">
                          <q-item-section>
                            <q-item-label>published</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                    <q-btn
                      color="primary"
                      :to="`/lecture-classes/${props.row.id}`"
                      round
                      dense
                      flat
                      size="sm"
                      icon="fa-solid fa-clipboard-list"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Lecture Classes</strong>
                      </q-tooltip>
                    </q-btn>

                    <q-btn
                      class="q-mx-md"
                      color="primary"
                      size="md"
                      icon="people"
                      round
                      dense
                      flat
                      :to="`/subscribe-user/${props.row.id}`"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Subscribe users</strong>
                      </q-tooltip>
                    </q-btn>

                  </q-td>
                  <q-td key="action" :props="props">

                    <q-btn
                      v-if="courseType === 'draft'"
                      color="green"
                      size="md"
                      icon="publish"
                      round
                      dense
                      flat
                      @click="publishCourse(props.row.id)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Publish Course</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="courseType !== 'draft'"
                      color="primary"
                      size="md"
                      icon="drafts"
                      round
                      dense
                      flat
                      @click="moveToDraft(props.row.id)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Move to draft</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="courseType === 'published'"
                      color="primary"
                      size="md"
                      icon="move_to_inbox"
                      round
                      dense
                      flat
                      @click="moveToCompleted(props.row.id)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Move to Completed</strong>
                      </q-tooltip>
                    </q-btn>



                    <!--                    <q-btn-->
<!--                      color="primary"-->
<!--                      :to="`/course-exams/${props.row.id}`"-->
<!--                      round-->
<!--                      dense-->
<!--                      flat-->
<!--                      size="sm"-->
<!--                      icon="fa-solid fa-book-open"-->
<!--                    >-->
<!--                      <q-tooltip-->
<!--                        anchor="top middle"-->
<!--                        self="bottom middle"-->
<!--                        :offset="[10, 10]"-->
<!--                      >-->
<!--                        <strong class="">Course Exams</strong>-->
<!--                      </q-tooltip>-->
<!--                    </q-btn>-->

<!--                    <q-btn-->
<!--                      color="primary"-->
<!--                      size="md"-->
<!--                      icon="fa-solid fa-question"-->
<!--                      round-->
<!--                      dense-->
<!--                      flat-->
<!--                      @click="-->
<!--                        this.$router.push({-->
<!--                          path: '/questionbanks',-->
<!--                          query: { courseId: props.row.id },-->
<!--                        })-->
<!--                      "-->
<!--                    >-->
<!--                      <q-tooltip-->
<!--                        anchor="top middle"-->
<!--                        self="bottom middle"-->
<!--                        :offset="[10, 10]"-->
<!--                      >-->
<!--                        <strong class="">Course Questionbanks</strong>-->
<!--                      </q-tooltip>-->
<!--                    </q-btn>-->
                    <q-btn
                      color="primary"
                      size="sm"
                      icon="edit"
                      round
                      dense
                      flat
                      :to="`/course/${props.row.id}`"
                    />

                    <q-btn
                      color="negative"
                      size="sm"
                      icon="delete"
                      round
                      dense
                      flat
                      @click="onDelete(props.row.id)"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "CourseList",
  props: {
    courseType: {
      type: String,
      required: true,
    },
  },
  components: {
    SearchCourses: defineAsyncComponent(() =>
      import("src/components/course/SearchCourses.vue")
    ),
  },
  setup(props) {
    const { $q } = useQuasar();
    const store = useStore();
    const courses = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const loading = ref(true);
    const searchData = ref({ keywords: "" });

    const fetchCourses = (page = 1) => {
      console.log(searchData.value);
      loading.value = true;
      api
        .get(
          `/courses?search=status:${props.courseType}${
            searchData.value.keywords.length
              ? ";title:" + searchData.value.keywords
              : ""
          }&searchJoin=and&orderBy=id&sortedBy=desc&page=${page}`
        )
        .then((response) => {
          console.log(`${props.courseType} courses`, response.data);
          courses.value = response.data.data;
          const meta = response.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const onRequest = (props) => {
      fetchCourses(props.pagination.page);
    };
    return {
      store,
      pagination,
      loading,
      fetchCourses,
      onRequest,
      courses,
      $q,
      searchData,
    };
  },
  data() {
    return {
      name: "Course",
      //table header
      //name , mobile , institution, action
      columns: [
        {
          name: "title",
          label: "Title",
          field: "title",
          align: "left",
        },
        {
          name: "num_classes",
          label: "Number of Classes",
          field: "num_classes",
          align: "left",
        },
        {
          name: "num_exams",
          label: "Number of Exams",
          field: "num_exams",
          align: "left",
        },
        {
          name: "resources",
          label: "Resources",
          field: "resources",
          align: "left",
        },
        {
          name: "action",
          label: "Action",
          field: "action",
          align: "left",
        },
      ],
      //table data
    };
  },

  methods: {
    moveToCompleted(id) {
      api
        .patch(`/courses/${id}/status`, {
          status: "completed",
        })
        .then((res) => {
          this.$q.notify({
            message: "Course marked as completed successfully",
            color: "positive",
            icon: "check",
          });
          this.fetchCourses();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moveToDraft(id) {
      api
        .patch(`/courses/${id}/status`, {
          status: "draft",
        })
        .then((res) => {
          this.$q.notify({
            message: "Course moved to draft successfully",
            color: "positive",
            icon: "check",
          });
          this.fetchCourses();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    publishCourse(id) {
      api
        .patch(`/courses/${id}/status`, {
          status: "published",
        })
        .then((res) => {
          this.$q.notify({
            message: "Course published successfully",
            color: "positive",
            icon: "check",
          });
          this.fetchCourses();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete this course?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api
            .delete(`/courses/${id}`)
            .then((res) => {
              this.$q.notify({
                message: "Course deleted successfully",
                color: "positive",
                icon: "check",
              });
              this.fetchCourses();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
    },
    onSearch(search) {
      this.searchData.keywords = search.keywords;
      this.fetchCourses();
    },
  },

  mounted() {
    this.fetchCourses();
  },
});
</script>

<style></style>
