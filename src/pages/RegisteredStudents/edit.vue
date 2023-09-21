<template>
    <q-page class="q-pa-sm">
      <q-card class="no-shadow" bordered>
        <!-- add edit header with submit and reset buttons on right -->
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">Edit Student Profile</div>
          <div class="row">
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              form="studentForm"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              form="studentForm"
            />
          </div>
        </q-card-section>
      </q-card>
  
      <q-separator spaced />
      <q-form
        @submit.prevent="onSubmit"
        id="studentForm"
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
                      <div class="text-h6">Student Details</div>
                    </q-card-section>
  
                    <q-card-section>
                      <div class="row q-col-gutter-md">
                        <div class="col-6">
                          <q-input
                            filled
                            v-model="studentData.name"
                            :label="`Name`"
                            :rules="[(val) => !!val || 'Name is required']"
                          />
                        </div>
                        <div class="col-6">
                          <!-- duration in minutes -->
                          <q-input
                            filled
                            v-model="studentData.phone_number"
                            :label="`Phone Number`"
                            readonly
                          />
                        </div>
                      </div>
                      <div class="row q-col-gutter-md q-mt-auto">
                        <div class="col-6">
                          <q-input
                            filled
                            v-model="studentData.nid"
                            :label="`NID`"
                            :rules="[(val) => !!val || 'NID is required']"
                          />
                        </div>
                        <div class="col-6">
                          <!-- duration in minutes -->
                          <q-input
                            filled
                            v-model="studentData.date_of_birth"
                            :label="`Date of Birth`"
                            :rules="[
                              (val) => !!val || 'Date of Birth is required',
                            ]"
                          >
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer q-ma-md">
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    v-model="studentData.date_of_birth"
                                    mask="YYYY-MM-DD"
                                  >
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="primary"
                                        flat
                                        size="sm"
                                      />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                      </div>
                      <div class="row q-col-gutter-md q-mt-auto">
                        <!-- 3 coloumn -->
                        <div class="col-6">
                          <q-select
                            filled
                            v-model="studentData.faculty_id"
                            :label="`Faculty`"
                            :options="facultyOptions"
                            emit-value
                            map-options
                          />
                        </div>
                        <div class="col-6">
                          <q-select
                            filled
                            v-model="studentData.institution_id"
                            :label="`Institution`"
                            :options="institutionOptions"
                            emit-value
                            map-options
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
  import OptionCard from "src/components/question/OptionCard.vue";
  import { defineComponent, defineAsyncComponent } from "vue";
  import { ref } from "@vue/reactivity";
  import { useStore } from "src/stores/store";
  import { api } from "boot/axios";
  import { useQuasar } from "quasar";
  
  export default defineComponent({
    name: "Edit Student Profile",
    components: {
      OptionCard: OptionCard,
    },
    setup() {
      const store = useStore();
      const { $q } = useQuasar();
      return {
        $q,
      };
    },
    data() {
      return {
        pageName: "Edit Student Profile",
        dense: true,
        name: "",
        model: "",
        expanded: false,
        studentData: {
          name: "",
          nid: "",
          faculty_id: "",
          phone_number: "",
          date_of_birth: "",
          institution_id: "",
        },
        facultyOptions: [],
        institutionOptions: [],
      };
    },
    methods: {
      onSubmit() {
        console.log("Submitted");
        console.log(this.studentData);
      },
      onReset() {
        console.log("Reset");
        this.studentData = {
          id: "",
          name: "",
          nid: "",
          faculty_id: "",
          phone_number: "",
          date_of_birth: "",
          institution_id: "",
        };
      },
      getFaculties() {
        api.get("/categories/faculty").then((response) => {
          response.data.data.map((category) => {
            this.facultyOptions.push({
              label: category.name,
              value: category.id,
            });
          });
        });
      },
      getInstitutions() {
        const institutionOptions = [
          { label: "Institution 1", value: "1" },
          { label: "Institution 2", value: "2" },
          { label: "Institution 3", value: "3" },
        ];
  
        institutionOptions.map((institution) => {
          this.institutionOptions.push({
            label: institution.label,
            value: institution.value,
          });
        });
      },
    },
    mounted() {
      this.getFaculties();
      this.getInstitutions();
      if (this.$route.params.id) {
        //   api
        //     .get("")
        //     .then((response) => {
        //       this.studentData = response.data.data;
        //     });
      }
    },
  });
  </script>
  
  <style></style>
  