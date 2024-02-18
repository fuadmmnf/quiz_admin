<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Generate Student Report</div>
        <div class="row">
          <q-btn
            class="float-right text-capitalize text-indigo-8 shadow-3"
            icon="picture_as_pdf"
            @click="reportDialog=true"
            label="Generate Report"
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
                  <q-card-section>
                    <div class="text-h6 ">
                      <span class="text-h6">Update Student Details</span>
                      <q-btn
                        class="float-right text-capitalize shadow-3"
                        color="primary"
                        label="Update"
                      />
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="studentData.name"
                          :label="`Name`"
                          lazy-rules
                          :rules="[(val) => !!val || 'Name is required']"
                        />
                      </div>
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="studentData.phone_number"
                          :label="`Phone Number`"
                          lazy-rules
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
                          lazy-rules
                          :rules="[(val) => !!val || 'NID is required']"
                        />
                      </div>
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="studentData.date_of_birth"
                          :label="`Date of Birth`"
                          lazy-rules
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
                      <div class="col-4">
                        <q-select
                          filled
                          v-model="studentData.gender"
                          :options="genderOptions"
                          label="Gender"
                          required
                        />
                      </div>
                      <div class="col-4">
                        <q-select
                          filled
                          v-model="studentData.faculty_id"
                          :label="`Faculty`"
                          :options="facultyOptions"
                          emit-value
                          map-options
                        />
                      </div>

                      <div class="col-4">
                        <q-select
                          filled
                          v-model="studentData.institution_id"
                          :label="`Institution`"
                          :options="categoryStore.getInstitutionOptions"
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
    <StudentExamHistorySelectDialog v-if="reportDialog" :user_id="studentData.id" @closeDialog="reportDialog=false">

    </StudentExamHistorySelectDialog>
  </q-page>
</template>

<script>
import OptionCard from "src/components/question/OptionCard.vue";
import { defineComponent, defineAsyncComponent } from "vue";
import { ref } from "@vue/reactivity";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useCategoryStore } from "stores/category";
import StudentExamHistorySelectDialog from "components/StudentExamHistorySelectDialog.vue";

export default defineComponent({
  name: "Edit Student Profile",
  components: {
    StudentExamHistorySelectDialog,
    OptionCard: OptionCard,
  },
  setup() {
    const categoryStore = useCategoryStore();

    const store = useStore();
    const { $q } = useQuasar();
    return {
      $q,
      categoryStore,
    };
  },
  data() {
    return {
      pageName: "Edit Student Profile",
      dense: true,
      reportDialog:false,
      name: "",
      model: "",
      expanded: false,
      studentData: {
        id:"",
        name: "",
        nid: "",
        faculty_id: "",
        phone_number: "",
        date_of_birth: "",
        institution_id: "",
        gender: "",
      },
      facultyOptions: [],
      institutionOptions: [],
      genderOptions: ["Male", "Female"],
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
  },
  mounted() {
    this.getFaculties();
    if (this.$route.params.id) {
      api
        .get(
          "/students/" +
            this.$route.params.id +
            "?include=user,institution,faculty"
        )
        .then((response) => {
          this.studentData.id = response.data.data.user.data.id;
          this.studentData.name = response.data.data.user.data.name;
          this.studentData.phone_number = response.data.data.user.data.mobile;
          this.studentData.nid = response.data.data.nid;
          this.studentData.faculty_id = response.data.data.faculty;
          this.studentData.institution_id = response.data.data.institution;
          this.studentData.date_of_birth = response.data.data.birth;
          this.studentData.gender = response.data.data.gender;
        });
    }
  },
});
</script>

<style></style>
