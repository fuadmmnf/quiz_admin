<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit Exam</div>
        <div class="row">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
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
              <q-input filled v-model="name" :label="`Search Exam`">
                <template v-slot:append>
                  <!-- filter icon -->

                  <q-btn
                    flat
                    round
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
                      v-model="model"
                      :options="options"
                      :label="`Category`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subcategory`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subject`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Chapter`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Faculty`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-2">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Discipline`"
                      lazy-rules
                    />
                  </div>
                </div>
              </q-expansion-item>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-separator spaced />
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-lg">
      <div class="q-pa-none">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <!-- card with two columns-->
            <q-card class="no-shadow" bordered>
              <!-- heading -->
              <q-card-section class="row items-center justify-between">
                <div class="text-h6">Exam Details</div>
              </q-card-section>

              <q-card-section>
                <div class="row q-col-gutter-md">
                  <!-- title, code, faculty, subject category, duration, start time, end time, start message , end message two columns -->
                  <div class="col-6">
                    <q-input filled v-model="name" :label="`Title`" />

                    <q-input filled v-model="name" :label="`Code`" />

                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Faculty`"
                      lazy-rules
                    />
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Category`"
                      lazy-rules
                    />

                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subject`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-6">
                    <!-- duration in minutes -->
                    <q-input filled v-model="name" :label="`Duration`" />

                    <q-input filled v-model="date" :label="`Start Time`">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer q-ma-md">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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
                              v-model="date"
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

                    <q-input filled v-model="date" :label="`End Time`">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer q-ma-md">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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
                              v-model="date"
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
                    <q-input filled v-model="name" :label="`Start Message`" />

                    <q-input filled v-model="name" :label="`End Message`" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
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

export default defineComponent({
  name: "AddOrEditEzam",
  components: {
    OptionCard: defineAsyncComponent(() =>
      import("components/Question/OptionCard.vue")
    ),
  },
  data() {
    return {
      pageName: "Add/Edit Question",
      dense: true,
      name: "",
      model: "",
      expanded: false,
      date: ref("2021-01-01 12:00"),
      options: [
        {
          label: "Option 1",
          value: "option1",
          options: [
            { label: "Suboption 1", value: "suboption1" },
            { label: "Suboption 2", value: "suboption2" },
          ],
        },
        {
          label: "Option 2",
          value: "option2",
          options: [
            { label: "Suboption 3", value: "suboption3" },
            {
              label: "Suboption 4",
              value: "suboption4",
              options: [
                { label: "Nested Suboption 1", value: "nested1" },
                { label: "Nested Suboption 2", value: "nested2" },
              ],
            },
          ],
        },
      ],
      question_types: [
        { label: "Single Choice", value: "single_choice" },
        { label: "Multiple Choice", value: "multiple_choice" },
        { label: "True/False", value: "true_false" },
      ],
      question_type: "",
      questionData: {
        options: [
          {
            description: "This is an options data",
            is_correct: false,
            visible: true,
            hint: " This is demo hint",
            explanation: "This is demo explanation",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitted");
    },
    onReset() {
      console.log("Reset");
    },
    addOption() {
      this.questionData.options.push({
        option: "",
        is_correct: false,
        visible: true,
        hint: "",
        explanation: "",
      });
    },
  },
});
</script>

<style></style>
