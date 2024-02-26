<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div>
          <div class="col-12 text-h6">Add Class Material</div>
          <div class="text-subtitle1">{{route.query.course_id?.length? "Course ": ""}} {{route.query.course_name?.length? `(${route.query.course_name.replace("%20", " ")})`: ""}}</div>
        </div>

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
      ref="classMaterialFormRef"
    >
      <div class="q-pa-none">
        <!-- card with two columns-->
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
                  :error="!!errors && !!errors.course_id"
                  :error-message="
                        errors && errors.course_id
                          ? errors.course_id[0]
                          : ''"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-6">
                <q-input
                  filled
                  v-model.trim="classMaterialData.title"
                  :label="`Title`"
                  :rules="[(val) => !!val || 'Title is required']"
                  lazy-rules
                  :error="!!errors && !!errors.title"
                  :error-message="
                        errors && errors.title
                          ? errors.title[0]
                          : ''"
                />
              </div>
              <div class="col-6">
                <q-select
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
                  :error="!!errors && !!errors.type"
                  :error-message="
                        errors && errors.type
                          ? errors.type[0]
                          : ''"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md">

              <q-input
                class="col-12"
                filled
                v-model.trim="classMaterialData.description"
                :label="`Lecture Description`"
                @click="openmaterialDescriptionTinyMceModal"
                readonly
                :error="!!errors && !!errors.description"
                :error-message="
                        errors && errors.description
                          ? errors.description[0]
                          : ''"
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
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-4">
                <q-select
                  filled
                  v-model="classMaterialData.category_id"
                  :label="`Category`"
                  :options="categoryStore.getCategoryOptions"
                  emit-value
                  map-options
                  :error="!!errors && !!errors.category_id"
                  :error-message="
                        errors && errors.category_id
                          ? errors.category_id[0]
                          : ''"
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
                  :error="!!errors && !!errors.subject_id"
                  :error-message="
                        errors && errors.subject_id
                          ? errors.subject_id[0]
                          : ''"
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
                  :error="!!errors && !!errors.faculty_id"
                  :error-message="
                        errors && errors.faculty_id
                          ? errors.faculty_id[0]
                          : ''"
                />
              </div>

            </div>
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-4">
                <!-- duration in minutes -->
                <q-input
                  filled
                  v-model.trim="classMaterialData.time"
                  :rules="[val => !!val || 'Time is required']"
                  lazy-rules
                  :label="`Time`"
                  :error="!!errors && !!errors.time"
                  :error-message="
                        errors && errors.time
                          ? errors.time[0]
                          : ''"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer q-ma-md">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="classMaterialData.time"
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
                          v-model="classMaterialData.time"
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
                  v-model.trim="classMaterialData.link"
                  :label="`Link`"
                  hint="https://example.com"
                  :error="!!errors && !!errors.link"
                  :error-message="
                        errors && errors.link
                          ? errors.link[0]
                          : ''"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import _ from "lodash";
import {defineComponent, defineAsyncComponent} from "vue";
import {ref} from "vue";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import {
  createClassMaterial,
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
    time: "",
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
    const classMaterialFormRef = ref(null);
    const errors = ref(null);
    return {
      courseId,
      $q,
      route,
      categoryStore,
      classMaterialFormRef,
      errors,
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
       if(this.classMaterialFormRef.validate()){
         try{
           const res = await api.patch(`/class-materials/${this.$route.params.id}`, this.classMaterialData)

           this.$q.notify({
             message: "Class Lecture updated Successfully",
             color: "positive",
             icon: "check",
           });

           this.onReset();
         }catch(err){
           if (err.response && err.response.status === 422) {
             this.errors = err.response.data.errors;
             console.log(err.response)
           }
         }
       }

      } else {
        if(this.classMaterialFormRef.validate()){
          try{
            const {data, status, error} = await createClassMaterial(this.classMaterialData);

            if (status === 201) {
              this.$q.notify({
                message: "Class Material Added Successfully",
                color: "positive",
                icon: "check",
              });
              this.onReset();
            } else {
              // console.error(error);
            }
          }catch(err){
            if (err.response && err.response.status === 422) {
              this.errors = err.response.data.errors;
              console.log(err.response)
            }
          }
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
