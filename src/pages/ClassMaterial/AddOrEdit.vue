<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add Class Material</div>
        <div class="row">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            form="classMaterialForm"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            form="classMaterialForm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>
    <q-form
      @submit.prevent="onSubmit"
      id="classMaterialForm"
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
                    <div class="text-h6">Material Details</div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-select
                          filled
                          v-model="classMaterialData.course_id"
                          :label="`Course`"
                          :options="courseOptions"
                          emit-value
                          map-options
                          :readonly="route.query.course_id?.length > 0"
                          @clear="
                            (val) => {
                              classMaterialData.course_id = null;
                            }
                          "
                        />
                      </div>
                      <div class="row q-col-gutter-md">
                        <div class="col-6">
                          <q-input
                            filled
                            v-model="classMaterialData.title"
                            :label="`Title`"
                            :rules="[(val) => !!val || 'Title is required']"
                          />
                        </div>
                        <div class="col-6">
                          <q-select
                            class="q-mt-md"
                            filled
                            v-model="classMaterialData.type"
                            :options="[
                            {label: 'Online Lecture (zoom)', value: 'url'},
                            {label: 'Video (drive)', value: 'video'},
                            {label: 'Pdf', value: 'pdf'},
                            {label: 'Image', value: 'image'},
                          ]"
                            :label="`Material Type`"
                            lazy-rules
                            emit-value
                            map-options
                          />
                        </div>
                      </div>
                      <div class="row q-col-gutter-md">

                        <q-input
                          filled
                          v-model="classMaterialData.description"
                          :label="`Lecture Description`"
                          @click="openmaterialDescriptionTinyMceModal"
                          readonly
                        >
                          <template v-slot: append>
                            <tiny-mce-modal
                              ref="materialDescriptionTinyMceModal"
                              v-model="classMaterialData.description"
                              @save="onDescriptionChange"
                            />
                          </template>
                        </q-input>
                      </div>
                      <div class="row q-col-gutter-md">
                        <div class="col-4">
                          <q-select
                            filled
                            v-model="classMaterialData.category_id"
                            :label="`Category`"
                            :options="categoryStore.getCategoryOptions"
                            emit-value
                            map-options
                          />
                        </div>
                        <div class="col-4">
                          <q-select
                            filled
                            v-model="classMaterialData.subject_id"
                            :label="`Subject`"
                            :options="categoryStore.getSubjectOptions"
                            emit-value
                            map-options
                          />
                        </div>
                        <div class="col-4">
                          <q-select
                            filled
                            v-model="classMaterialData.faculty_id"
                            :label="`Faculty`"
                            :options="categoryStore.getFacultyOptions"
                            emit-value
                            map-options
                          />
                        </div>

                      </div>
                      <div class="row q-col-gutter-md">
                        <div class="col-4">
                          <!-- duration in minutes -->
                          <q-input
                            filled
                            v-model="classMaterialData.date"
                            :label="`Time`"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer q-ma-md">
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    v-model="classMaterialData.date"
                                    mask="YYYY-MM-DD HH:mm"
                                  >
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                      />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                              <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-time
                                    v-model="classMaterialData.date"
                                    mask="YYYY-MM-DD HH:mm"
                                    format24h
                                  >
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                      />
                                    </div>
                                  </q-time>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>

                        <div class="col-8">
                          <q-input
                            filled
                            v-model="classMaterialData.link"
                            :label="`Link`"
                            hint="https://example.com"
                          />
                        </div>
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
import {
  createClassMaterial,
  editLectureClass,
} from "src/services/course_service";
import {useCategoryStore} from "stores/category";
import {useRoute} from "vue-router";

function initClassMaterialData() {
  return {
    title: "",
    type: "link",
    description: "",
    category_id: null,
    subject_id: null,
    faculty_id: null,
    course_id: null,
    date: "",
    link: "",
  };
}

export default defineComponent({
  name: "Add Class Material",
  components: {
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
  },


  setup() {
    const store = useStore();
    const categoryStore = useCategoryStore();
    const route = useRoute();
    const {$q} = useQuasar();
    const courseId = ref("");
    return {
      courseId,
      $q,
      route,
      categoryStore,
    };
  },
  data() {
    return {
      courseOptions: [],
      classMaterialData: initClassMaterialData(),
    };
  },
  methods: {
    onSubmit: _.debounce(async function () {
      if (this.$route.params.id) {
        api
          .patch(`/class-materials/${this.$route.params.id}`, this.classMaterialData)
          .then((response) => {
            console.log(response);
            this.$q.notify({
              message: "Class Lecture updated Successfully",
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
        const {data, status, error} = await createClassMaterial(this.classMaterialData);

        if (status === 201) {
          this.$q.notify({
            message: "Class Material Added Successfully",
            color: "positive",
            icon: "check",
          });
          this.onReset();
        } else {
          console.error(error);
        }
      }
    }, 2500),
    onReset() {
      this.classMaterialData = initClassMaterialData();
    },
    openmaterialDescriptionTinyMceModal() {
      this.$refs.materialDescriptionTinyMceModal.show = true;
    },
    onDescriptionChange(value, index, parentIndex) {
      this.classMaterialData.description = value;
    },
    getCourses() {
      return api
        .get("/courses?orderBy=id&sortedBy=desc&limit=100")
        .then((response) => {
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
    this.getCourses()

    if (this.$route.query.course_id?.length) {
      this.classMaterialData.course_id = this.$route.query.course_id;
    }
    if (this.$route.query.type?.length) {
      this.classMaterialData.type = this.$route.query.type;
    }

    if (this.$route.params.id) {
      api
        .get(`class-materials/${this.$route.params.id}`)
        .then((response) => {
          this.classMaterialData = response.data.data;
        });
    }
  },
});
</script>

<style></style>
