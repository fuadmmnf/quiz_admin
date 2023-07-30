<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit Questions in Exam</div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <!-- search card with filtering option filter icon -->
    <q-expansion-item
      expand-separator
      icon="search"
      label="Search"
      class="q-card"
      header-class=" text-h6"
    >
      <q-card class="no-shadow" bordered>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                filled
                v-model="searchText"
                :label="`Search Questions to add`"
              >
                <template v-slot:append>
                  <!-- filter icon -->

                  <q-btn
                    flat
                    round
                    @click="searchQuestions()"
                    dense
                    icon="search"
                    class="bg-grey-3"
                    style="width: 40px; height: 40px"
                  />
                </template>
              </q-input>

              <!-- filtering options div -->
              <q-expansion-item
                class="q-mt-sm text-grey-6"
                v-model="expanded"
                icon="filter_list"
                label="Filtering Options"
              >
                <div class="row q-col-gutter-md q-mt-sm">
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="type"
                      :options="type_options"
                      :label="`Question Type`"
                      lazy-rules
                      emit-value
                      map-options
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subcategory`"
                      lazy-rules
                      emit-value
                      map-options
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subject`"
                      lazy-rules
                      emit-value
                      map-options
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Chapter`"
                      lazy-rules
                      emit-value
                      map-options
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Faculty`"
                      lazy-rules
                      emit-value
                      map-options
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Discipline`"
                      lazy-rules
                      emit-value
                      map-options
                    />
                  </div>
                </div>
              </q-expansion-item>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <!-- for loop of div for search results of questions, and a button to add a question -->
          <div v-for="(item, index) in searchResults" :key="index">
            <div class="row items-center">
              <div class="col-10">
                <!-- content , type and score -->
                <div class="row items-center">
                  <div class="col-1">
                    <div class="text">{{ index + 1 }}.</div>
                  </div>
                  <div class="col-5">
                    <div class="">
                      {{ item.content.substring(0, 50) + "..." }}
                    </div>
                    <div class="text-grey-6">{{ item.type }}</div>
                  </div>
                  <!-- col for negative marks -->
                  <div class="col-3">
                    <div class="text">
                      Negative Marks : {{ item.unit_negative_mark }}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="text">Score : {{ item.score }}</div>
                  </div>
                </div>
              </div>
              <div class="col-2">
                <q-btn
                  size="sm"
                  color="primary"
                  outline
                  label="Add"
                  icon="add"
                  @click="addQuestion(item)"
                />
              </div>
            </div>
            <q-separator />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <!-- questions table with serial, type, name, cateogry, actions -->
    <q-table
      :rows="examQuestions"
      :columns="columns"
      row-key="real_id"
      class="q-mt-md"
      :filter="filter"
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="content" :props="props">
            {{ props.row.content.substring(0, 50) + "..." }}
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.type }}
          </q-td>
          <q-td key="score" :props="props">
            {{ props.row.score }}
          </q-td>
          <q-td key="unit_negative_mark" :props="props">
            {{ props.row.unit_negative_mark }}
          </q-td>
          <q-td key="actions" :props="props" class="">
            <q-btn
              dense
              flat
              size="sm"
              color="primary"
              label="edit"
              icon="edit"
              @click="edit"
            />
            <q-btn
              round
              dense
              flat
              size="sm"
              color="negative"
              label="Delete"
              icon="delete"
              @click="deleteRow"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- modal for adding negative marks -->
    <q-dialog
      v-model="show"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input filled v-model="name" :label="`Negative Marks`">
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" flat v-close-popup />
          <q-btn label="Save" color="primary" flat v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";

export default defineComponent({
  name: "AddEditQuestions",
  data() {
    return {
      selected: [],
      searchText: "",
      expanded: true,
      examQuestions: [],
      type: "",
      type_options: [
        { label: "Single Best Answer", value: "single-best-answer" },
        { label: "Multiple Answer", value: "multiple-answer" },
        { label: "Multiple True/False", value: "multiple-true-false" },
        { label: "Fill in the blanks", value: "written" },
        { label: "Essay", value: "written" },
      ],
      pagination: {
        sortBy: "name",
      },
      searchResults: [],
      filter: "",
      loading: false,
      show: false,
      columns: [
        {
          name: "content",
          required: true,
          label: "Content",
          align: "left",
          field: "content",
          sortable: true,
        },
        {
          name: "type",
          required: true,
          label: "Type",
          align: "left",
          field: "type",
          sortable: true,
        },
        {
          name: "score",
          required: true,
          label: "Score",
          align: "left",
          field: "score",
          sortable: true,
        },
        {
          name: "unit_negative_mark",
          required: true,
          label: "Negative Marks",
          align: "left",
          field: "unit_negative_mark",
          sortable: true,
        },
        {
          name: "actions",
          required: true,
          label: "Actions",
          align: "left",
          field: "actions",
          sortable: true,
        },
      ],
      rows: [
        {
          id: 1,
          name: "Question 1",
          type: "MCQ",
          category: "Physics",
          negative_marks: "0.25",
          actions: "",
        },
      ],
    };
  },
  methods: {
    edit() {
      this.$router.push("/Question/:id");
    },
    deleteRow() {
      this.$q.dialog({
        title: "Confirm",
        message: "Are you sure you want to Delete?",
        cancel: true,
        persistent: true,
      });
    },
    searchQuestions() {
      this.loading = true;
      api
        .get("/questions", {
          params: {
            searchJoin: "and",
            search: "type:" + this.type + " ;content: " + this.searchText,
          },
        })
        .then((res) => {
          this.searchResults = res.data.data;
          this.loading = false;
          console.log(res.data.data);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    addQuestion(item) {
      api
        .post("/exam-questions", {
          exam_id: this.$route.params.real_id,
          question_ids: [item.real_id],
        })
        .then((res) => {
          this.$q.notify({
            color: "positive",
            message: "Question Added Successfully",
            icon: "check",
          });
          this.searchResults.splice(this.searchResults.indexOf(item), 1);
          this.getExamQuestions();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExamQuestions() {
      api
        .get(
          "/exam-questions/" +
            this.$route.params.id +
            "?include=question,question.options&page=0"
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            res.data.data.map((item) => {
              this.examQuestions.push(item.question.data);
            });
          }

          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getExamQuestions();
  },
});
</script>

<style></style>
