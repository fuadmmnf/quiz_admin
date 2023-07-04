<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="text-h6 text-indigo-8">Add/Edit Question</div>
        <div class="text-subtitle2">Add or edit questions here</div>
      </q-card-section>
    </q-card>

    <q-separator spaced />

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md q-mt-lg"
              >
                <q-input
                  filled
                  v-model="name"
                  :dense="dense"
                  :label="`Question Name*`"
                  :hint="`Question must be unique`"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <!-- category and subcategory in the same row -->
                <div class="row">
                  <div class="col-6">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Category`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-6">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subcategory`"
                      lazy-rules
                    />
                  </div>
                </div>
                <!-- input subject and chapter two select same row-->
                <div class="row">
                  <div class="col-6">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Subject`"
                      lazy-rules
                    />
                  </div>
                  <div class="col-6">
                    <q-select
                      filled
                      v-model="model"
                      :options="options"
                      :label="`Chapter`"
                      lazy-rules
                    />
                  </div>
                </div>
                <!-- question type -->
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  :label="`Question Type`"
                  lazy-rules
                />
                <div>
                  <q-btn label="Submit" type="submit" color="primary" />
                  <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";

export default defineComponent({
  name: "AddOrEditQuestion",
  components: {},
  data() {
    return {
      pageName: "Add/Edit Question",
      dense: true,
      name: "",
      model: "",
      options: [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" },
        { label: "Option 4", value: "opt4" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitted");
    },
    onReset() {
      console.log("Reset");
    },
  },
});
</script>

<style></style>
