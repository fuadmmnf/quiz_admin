<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Send Message
          <div class="text-subtitle2">Mail to all or specific user</div>
        </div>
        <div class="row">
          <q-btn
            :disable="!noticeData.noticeable_type.length || !noticeData.noticeable_ids.length || !noticeData.title.length || !noticeData.message.length"
            color="primary"
            label="Send" icon="send" @click="onSubmit"/>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>
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
                    <q-radio
                      v-model="noticeData.noticeable_type"
                      val="user"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Users</q-item-label>
                  </q-item-section>
                </q-item>


                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="noticeData.noticeable_type" val="exam"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Exam Wise</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="noticeData.noticeable_type" val="course"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Course Wise</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="noticeData.noticeable_type" val="institution"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Institution Wise</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-item v-if="noticeData.noticeable_type === 'user'">
                <q-item-section>
                  <q-select
                    v-model="noticeData.noticeable_ids"
                    :options="userOptions"
                    label="Select Users"
                    filled
                    dense
                    use-input
                    input-debounce="0"
                    multiple
                    use-chips
                    emit-value
                    map-options
                    clearable
                    @filter="userFilterFn"
                    @clear="
                            (val) => {
                              noticeData.noticeable_ids = [];
                            }
                          "
                  />
                </q-item-section>
              </q-item>

              <q-item v-if="noticeData.noticeable_type === 'exam'">
                <q-item-section>
                  <q-select
                    v-model="noticeData.noticeable_ids"
                    :options="examOptions"
                    label="Select Exams"
                    filled
                    use-input
                    input-debounce="0"
                    dense
                    multiple
                    use-chips
                    emit-value
                    map-options
                    clearable
                    @filter="examFilterFn"
                    @clear="
                            (val) => {
                              noticeData.noticeable_ids = [];
                            }
                          "
                  />
                </q-item-section>
              </q-item>

              <q-item v-if="noticeData.noticeable_type === 'course'">
                <q-item-section>
                  <q-select
                    v-model="noticeData.noticeable_ids"
                    :options="courseOptions"
                    label="Select Courses"
                    filled
                    dense
                    use-input
                    input-debounce="0"
                    multiple
                    use-chips
                    emit-value
                    map-options
                    clearable
                    @filter="courseFilterFn"
                    @clear="
                            (val) => {
                              noticeData.noticeable_ids = [];
                            }
                          "
                  />
                </q-item-section>
              </q-item>
              <q-item v-if="noticeData.noticeable_type === 'institution'">
                <q-item-section>
                  <q-select
                    v-model="noticeData.noticeable_ids"
                    :options="instituteOptions"
                    label="Select Institution"
                    filled
                    dense
                    use-input
                    input-debounce="0"
                    multiple
                    use-chips
                    emit-value
                    map-options
                    clearable
                    @filter="instituteFilterFn"
                    @clear="
                            (val) => {
                              noticeData.noticeable_ids = [];
                            }
                          "
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
                    <q-toggle
                      v-model="noticeData.send_push_notification"
                      :label="`Push Notification`"
                    />
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-toggle
                      v-model="noticeData.send_sms"
                      :label="`Send SMS`"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-section>
              <q-input
                filled
                v-model="noticeData.title"
                type="textarea"
                label="Write your title here"
                rows="1"

              />
            </q-card-section>
            <q-card-section>
              <q-input
                filled
                v-model="noticeData.message"
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
import {getStudents} from "src/services/student_service";
import {getCourses, getInstution} from "src/services/course_service";
import {getExams} from "src/services/exam_service";
import _ from "lodash";
import {api} from "boot/axios";

function initNoticeData() {
  return {
    title: "",
    message: "",
    send_sms: false,
    send_push_notification: false,
    noticeable_type: "",
    noticeable_ids: [],

  };
}

export default {
  setup() {
    const noticeData = ref(initNoticeData())
    const userOptions = ref([]);
    const examOptions = ref([]);
    const courseOptions = ref([]);
    const instituteOptions = ref([]);

    let userData = [];
    let examData = [];
    let courseData = [];
    let instituteData = [];

    const onSubmit = _.debounce(function () {

      api.post("/notices", noticeData.value).then((response) => {
        if (response.status === 201) {
          this.$q.notify({
            message: "Notice Sent Successfully",
            color: "positive",
            icon: "check",
          });
          onReset();
        } else {
          this.$q.notify({
            message: "Something wrong, please try again",
            color: "negative",
            icon: "close",
          });
        }
      });

    }, 5000)
    const onReset = () => {
      noticeData.value = initNoticeData();
    }

    watch(
      () => noticeData.value.noticeable_type,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          noticeData.value.noticeable_ids = []
        }
      },
      {deep: true}
    )


    const fetchStudents = async () => {
      const queryParams = {
        include: "user,institution,faculty",
        orderBy: "id",
        sortedBy: "desc",
        searchJoin: "and",
        limit: 0,
        filter: "id;name;mobile"

      };


      const {data, status, error} = await getStudents(queryParams);

      if (status === 200) {
        userOptions.value = [{
          label: 'all',
          value: '*',
        }, ...data.data.map(student => ({
          label: `${student.user.data.name} (${student.user.data.mobile})`,
          value: student.user.data.id,
        }))];

        userData = userOptions.value;

      } else {
        console.error(error.message);
      }
    }

    const fetchExams = async () => {
      const queryParams = {
        search: 'status:ongoing,upcoming,completed',
        orderBy: 'id',
        sortedBy: 'desc',
        limit: 50,
        filter: 'id;code;title',
      };

      const {data, status, error} = await getExams(queryParams);

      if (status === 200) {
        examOptions.value = data.data.map((exam) => ({
          label: `${exam.title} (${exam.code})`,
          value: exam.id,
        }));
        examData = examOptions.value;
      } else {
        console.error(error.message);
      }
    }


    const fetchCourses = async () => {

      const queryParams = {
        search: 'status:published',
        orderBy: 'id',
        sortedBy: 'desc',
        limit: 50,
        filter: 'id;title',
      };

      const {data, status, error} = await getCourses(queryParams);

      if (status === 200) {
        courseOptions.value = data.data.map((course) => ({
          label: course.title,
          value: course.id,
        }));
        courseData = courseOptions.value
      } else {
        console.error(error.message);
      }
    }
    const fetchInstitution = async () => {

      const queryParams = {
        orderBy: 'id',
        sortedBy: 'desc',
        limit: 0,
      };

      const {data, status, error} = await getInstution(queryParams);

      if (status === 200) {
        instituteOptions.value = data.data.map((institute) => ({
          label: institute.name,
          value: institute.id,
        }));
        instituteData = instituteOptions.value;
      } else {
        console.error(error.message);
      }
    }


    onMounted(() => {
      fetchStudents();
      fetchExams();
      fetchCourses();
      fetchInstitution();

    });

    function userFilterFn (val, update, abort) {
      if(val.length > 0 && val.length < 4) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        userOptions.value = userData.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    function examFilterFn (val, update, abort) {
      if (val.length > 0 && val.length < 3) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        examOptions.value = examData.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    function courseFilterFn (val, update, abort) {
      if (val.length > 0 && val.length < 3) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        courseOptions.value = courseData.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    function instituteFilterFn (val, update, abort) {
      if (val.length > 0 && val.length < 3) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        instituteOptions.value = instituteData.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      onSubmit,
      noticeData,
      userOptions,
      examOptions,
      courseOptions,
      instituteOptions,
      userFilterFn,
      examFilterFn,
      courseFilterFn,
      instituteFilterFn,
    };
  },

};
</script>
