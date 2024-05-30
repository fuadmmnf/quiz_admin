<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="row">
          <div class="col-12 text-h6">Add/Edit Question bank</div> <br/>
          <div class="text-subtitle1">{{route.query.course_name?"Course : "+decodeURIComponent(route.query.course_name):''}}</div>
        </div>

        <div class="row">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            form="questionBankForm"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            form="questionBankForm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>
    <q-form
      @submit.prevent="onSubmit"
      id="questionBankForm"
      @reset="onReset"
      class="q-gutter-md q-mt-lg"
    >
      <div class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <!-- card with two columns-->
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-card class="no-shadow" bordered>
                  <!-- heading -->
                  <q-card-section class="row items-center justify-between">
                    <div class="text-h6">Question Bank Details</div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-5">
                        <q-input
                          filled
                          v-model="questionBankData.title"
                          :label="`Title`"
                          :rules="[(val) => !!val || 'Title is required']"
                        />
                      </div>
                      <div class="col-3">
                        <q-input
                          filled
                          v-model="questionBankData.code"
                          :label="`Code`"
                        />
                      </div>
                      <div class="col-4">
                        <q-file
                          v-model="questionBankData.image"
                          clearable
                          filled
                          bottom-slots
                          label="Upload Image"
                          counter
                          accept="image/*"
                        >
                          <template v-slot:prepend>
                            <q-icon name="attach_file" />
                          </template>
                        </q-file>
                      </div>
                    </div>

                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-4">
                        <!-- subject dropdown -->
                        <NestedSelectBox :initial-value="questionBankData.subject_id" label="Subject" :options="categoryStore.getRawSubjectOptions" @change="(option)=>{
                             questionBankData.subject_id=option?.id
                              }">
                        </NestedSelectBox>
                      </div>
                      <div class="col-4">
                        <!-- subject dropdown -->
                        <NestedSelectBox :initial-value="questionBankData.category_id" label="Category" :options="categoryStore.getRawCategoryOptions" @change="(option)=>{
                             questionBankData.category_id=option?.id
                              }">
                        </NestedSelectBox>
                      </div>
                      <div class="col-4">
                        <!-- subject dropdown -->
                        <q-select
                          filled
                          v-model="questionBankData.course_id"
                          :label="`Course`"
                          :options="courseOptions"
                          :clearable="!(route.query.course_id?.length > 0)"
                          :readonly="route.query.course_id?.length > 0"
                          emit-value
                          map-options
                        />
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-lg">
                      <div class="col-4 q-mx-auto">
                        <q-checkbox v-model="isFreeQuestionBank" label="Free QuestionBank" />
                        <q-input
                          filled
                          v-model="questionBankData.price"
                          :label="`Price`"
                          :rules="[() => !isFreeQuestionBank || (questionBankData.price > 0) || 'Price must be greater than 0', () => isFreeQuestionBank || !!questionBankData.price || 'Price is required']"
                          :disable="isFreeQuestionBank"
                        />

                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from "vue";
import {ref} from "vue";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import _ from "lodash";
import {useCategoryStore} from "stores/category";
import {useRoute} from "vue-router";
import NestedSelectBox from "components/NestedSelectBox.vue";

function initQbData() {
  return {
    title: "",
    subject_id: "",
    category_id: "",
    course_id: "",
    code: "",
    image:null,
    price:null
  };
}

export default defineComponent({
  name: "AddOrEdit Question Bank",
  components: {NestedSelectBox},

  setup() {
    const store = useStore();
    const route = useRoute();
    const categoryStore = useCategoryStore();
    const {$q} = useQuasar();
    return {
      $q,
      route,
      categoryStore,
    };
  },
  data() {
    return {
      questionBankData: initQbData(),
      isFreeQuestionBank:false,
      courseOptions: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.$route.params.id) {
        api
          .patch(`/questionbanks/${this.$route.params.id}`, this.questionBankData)
          .then((response) => {
            console.log(response);
            this.$q.notify({
              message: "Question Bank updated Successfully",
              color: "positive",
              icon: "check",
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.onReset();
          });
      } else {
        api
          .post("/questionbanks", this.questionBankData)
          .then((response) => {
            console.log(response);
            this.$q.notify({
              message: "Question Bank Added Successfully",
              color: "positive",
              icon: "check",
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.onReset();
          });
      }
    },
    onReset() {
      this.questionBankData = initQbData();
      if (this.route.query.course_id?.length > 0) {
        this.questionBankData.course_id = this.route.query.course_id;
      }
    },

    getCourses() {
      api.get("/courses?orderBy=id&sortedBy=desc&limit=0").then((response) => {
        response.data.data.map((course) => {
          this.courseOptions.push({
            label: course.title,
            value: course.id,
          });
        });
      });
    },
  },
  mounted() {
    if (this.route.query.course_id?.length > 0) {
      this.questionBankData.course_id = this.route.query.course_id;
    }
    this.getCourses();

    if (this.$route.params.id) {
      api.get("/questionbanks/" + this.$route.params.id).then((response) => {
        this.questionBankData = response.data.data;
      });
    }
  },
});
</script>

<style></style>
