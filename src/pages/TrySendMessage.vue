<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Send Message
          <div class="text-subtitle2">Mail to all or specific user</div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Send" icon="send" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-card class="no-shadow" bordered>
            <q-card-section class="row items-center justify-between">
              <div class="text-h6">Receiver Configuration</div>
            </q-card-section>
            <q-card-section>
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="radioButton" val="all" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>All Users</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio
                      v-model="radioButton"
                      val="customUsers"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Custom Users</q-item-label>
                  </q-item-section>
                </q-item>



                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="radioButton" val="examWise"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Exam Wise</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="radioButton" val="courseWise" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Course Wise</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-item v-if="radioButton === 'customUsers'">
                <q-item-section>
                  <q-select
                    v-model="selectedUser"
                    :options="userOptions"
                    label="Select Users"
                    filled
                    dense
                    use-input
                    multiple
                    use-chips
                  />
                </q-item-section>
              </q-item>

              <q-item v-if="radioButton === 'examWise'">
                <q-item-section>
                  <q-select
                    v-model="selectedUser"
                    :options="examOptions"
                    label="Select Users"
                    filled
                    dense
                    use-input
                    multiple
                    use-chips
                  />
                </q-item-section>
              </q-item>

              <q-item v-if="radioButton === 'courseWise'">
                <q-item-section>
                  <q-select
                    v-model="selectedUser"
                    :options="courseOptions"
                    label="Select Users"
                    filled
                    dense
                    use-input
                    multiple
                    use-chips
                  />
                </q-item-section>
              </q-item>

            </q-card-section>
          </q-card>
        </div>
        <div class="col-6">

          <q-card class="no-shadow" bordered>
            <q-card-section class="">
              <div class="text-h6">Message Content</div>
              <q-list class="row q-mt-md">
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio  val="push" v-model="radioButton" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Push Notification</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio
                      val="customMessage"
                      v-model="radioButton"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Custom Message</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-section>
              <q-input
                filled

                type="textarea"
                label="Write your message here"
                rows="4"

              />
            </q-card-section>
          </q-card>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {getStudents, getExams, getCourses} from "src/services/category_service";


export default {
  setup() {

    const radioButton = ref('');
    const selectedUser = ref([]);
    const userOptions = ref([]);
    const examOptions = ref([]);
    const courseOptions = ref([]);


    const fetchStudents = async ()=>{
      const queryParams = {
        include: "user,institution,faculty",
        orderBy: "id",
        sortedBy: "desc",
        searchJoin: "and",
        limit: 50,
        filter: "id;name;mobile"

      };


      const {data, status, error} = await getStudents(queryParams);

      if (status === 200) {
        console.log(data);
        userOptions.value = data.data.map(student => ({
          label: `${student.user.data.name} (${student.user.data.mobile})`,
          value: student.user.data.id,
        }));

      } else {
        console.error(error.message);
      }
    }

    const fetchExams = async () => {

      const queryParams = {
        search: 'status:ongoing;upcoming;completed',
        orderBy: 'id',
        sortedBy: 'desc',
        limit: 50,
        filter: 'id;code;title',
      };

      const { data, status, error } = await getExams(queryParams);

      if (status === 200) {
        console.log(data);
        examOptions.value = data.data.map((exam) => ({
          label: `${exam.title} (${exam.code})`,
          value: exam.id,
        }));
      } else {
        console.error(error.message);
      }
    };


    const fetchCourses = async () => {

      const queryParams = {
        search: 'status:published',
        orderBy: 'id',
        sortedBy: 'desc',
        limit: 50,
        filter: 'id;title',
      };

      const { data, status, error } = await getCourses(queryParams);

      if (status === 200) {
        console.log(data);
        courseOptions.value = data.data.map((course) => ({
          label: course.title,
          value: course.id,
        }));
      } else {
        console.error(error.message);
      }
    };


    watch(radioButton, async (newVal) => {
      if (newVal === "examWise") {
        await fetchExams();
      }if(newVal === "courseWise"){
        await fetchCourses();
      }if(newVal=== "customUsers"){
        await fetchStudents();
      }
    });




    return {
      radioButton,
      selectedUser,
      userOptions,
      examOptions,
      courseOptions
    };
  },

};
</script>
