<template>
  <div class="q-pa-none">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-dialog v-model="feedback">
          <q-card>
            <q-card-section>
              <div class="text-h6">User Feedback</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
              perferendis totam, ea at omnis vel numquam exercitationem aut,
              natus minima, porro labore.
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-card>
          <q-card-section>
            <!-- List of users -->
            <q-table
              :columns="
                route.params.type === 'completed' ? columnsCompleted : columns
              "
              :rows="users"
              row-key="real_id"
              rows-per-page-options="[10]"
              :loading="loading"
              wrap-cells
              no-data-label="No data available"
              class="shadow-0"
              v-model:pagination="pagination"
              @request="onRequest"
            >
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <!-- table data -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    key="rank"
                    :props="props"
                    v-if="route.params.type === 'completed'"
                  >
                    {{ props.row.rank }}
                  </q-td>
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                    {{
                      route.params.type === "completed"
                        ? `(` + props.row.mobile + `)`
                        : null
                    }}
                  </q-td>
                  <q-td key="mobile" :props="props">
                    {{ props.row.mobile }}
                  </q-td>
                  <q-td
                    key="correct_answers"
                    :props="props"
                    v-if="route.params.type === 'completed'"
                  >
                    {{ props.row.correct_answers }}
                  </q-td>
                  <q-td
                    key="marks"
                    :props="props"
                    v-if="route.params.type === 'completed'"
                  >
                    {{ props.row.marks }}
                  </q-td>
                  <q-td
                    key="rating"
                    :props="props"
                    v-if="route.params.type === 'completed'"
                  >
                    {{ 4 }}
                  </q-td>
                  <q-td key="actions" :props="props">
                    <q-btn color="black" dense flat round icon="logout">
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Export attempt</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="blue"
                      dense
                      flat
                      round
                      icon="feedback"
                      @click="feedback = true"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">See feedback</strong>
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="red"
                      dense
                      flat
                      round
                      icon="delete"
                      @click="deleteAttempt(props.row.attempt_id)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        <strong class="">Delete attempt</strong>
                      </q-tooltip>
                    </q-btn>
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
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

export default {
  name: "ExamList",
  props: {
    examType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const $q = useQuasar();
    const users = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const loading = ref(true);
    const filter = ref("");
    const route = useRoute();

    const fetchusers = (page = 1) => {
      loading.value = true;
      api
        .get(
          `/exam-attempts?search=exam_id:${route.params.id}&include=user&page=${page}`
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            users.value = [];
            res.data.data.forEach((item) => {
              users.value.push({
                name: item.user.data.name,
                mobile: item.user.data.mobile,
                real_id: item.user.data.id,
                attempt_id: item.id,
              });
            });
          }
          const meta = res.data.meta.pagination;
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

    const fetchCompletedUsers = (page = 1) => {
      loading.value = true;
      api
        .get(
          `/exams/${route.params.id}/ranking?include=examAttempt,examAttempt.user&page=${page}`
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            console.log(res.data.data);
            users.value = [];
            res.data.data.forEach((item) => {
              users.value.push({
                name: item.examAttempt.data.user.data.name,
                mobile: item.examAttempt.data.user.data.mobile,
                real_id: item.examAttempt.data.user.data.id,
                correct_answers: item.correct_answers,
                marks: item.marks,
                attempt_id: item.id,
              });
            });
          }
          const meta = res.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
          users.value.forEach((user, index) => {
            user.rank =
              (pagination.value.page - 1) * pagination.value.rowsPerPage +
              index +
              1;
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const deleteAttempt = (id) => {
      $q.dialog({
        title: "Confirm",
        message: "Are you sure you want to delete this attempt?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        api
          .delete(`/exam-attempts/${id}`)
          .then((res) => {
            $q.notify({
              message: "Attempt deleted successfully",
              color: "green",
              icon: "check",
            });
            if (route.params.type === "completed") {
              fetchCompletedUsers(pagination.value.page);
            } else {
              fetchusers(pagination.value.page);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    };

    const onRequest = (props) => {
      if (route.params.type === "completed")
        fetchCompletedUsers(props.pagination.page);
      else fetchusers(props.pagination.page);
    };
    return {
      store,
      pagination,
      loading,
      fetchusers,
      onRequest,
      users,
      filter,
      route,
      fetchCompletedUsers,
      deleteAttempt,
      feedback: ref(false),
    };
  },
  mounted() {
    if (this.route.params.type === "completed") this.fetchCompletedUsers();
    else this.fetchusers();
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "mobile",
          align: "left",
          label: "Mobile",
          field: (row) => row.mobile,
          sortable: true,
        },
        {
          name: "actions",
          align: "right",
          label: "Actions",
          field: (row) => row.actions,
          sortable: true,
        },
      ],
      columnsCompleted: [
        {
          name: "rank",
          required: true,
          label: "Rank",
          align: "left",
          field: (row) => row.rank,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "correct_answers",
          align: "left",
          label: "Correct Answers",
          field: (row) => row.correct_answers,
          sortable: true,
        },
        {
          name: "marks",
          align: "left",
          label: "Marks",
          field: (row) => row.marks,
          sortable: true,
        },
        {
          name: "rating",
          align: "left",
          label: "Rating",
          field: (row) => row.rating,
          sortable: true,
        },
        {
          name: "actions",
          align: "right",
          label: "Actions",
          field: (row) => row.code,
          sortable: true,
        },
      ],
    };
  },
};
</script>

<style></style>