<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <!-- add edit header with submit and reset buttons on right -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Add/Edit Notice</div>
        <div class="row">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            form="courseForm"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            form="courseForm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced/>
    <q-form
      id="noticeForm"
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
                    <div class="text-h6">Notice Details</div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="noticeData.title"
                          :label="`Title`"
                          :rules="[(val) => !!val || 'Title is required']"
                          lazy-rules
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="noticeData.description"
                          :label="`Course Description`"
                          @click="openCourseDescriptionTinyMceModal"
                          readonly
                        >
                          <template v-slot:append>
                            <tiny-mce-modal
                              ref="noticeDescriptionTinyMceModal"
                              :content="noticeData.description"
                              @save="onDescriptionChange"
                            />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-6">
                        <q-toggle
                          v-model="noticeData.isNormal"
                          label="Normal Notice"
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
import { defineComponent, defineAsyncComponent } from "vue";
import { useStore } from "src/stores/store";
import { useQuasar } from "quasar";
import NestedSelectBox from "components/NestedSelectBox.vue";

function initNoticeData() {
  return {
    title: "",
    description: "",
    isNormal: false // Default value for the toggle button
  };
}

export default defineComponent({
  name: "AddOrEditNotice",
  components: {
    NestedSelectBox,
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
  },

  setup() {
    const store = useStore();
    const { $q } = useQuasar();
    return {
      $q
    };
  },
  data() {
    return {
      noticeData: initNoticeData(),
    };
  },
  methods: {
    openCourseDescriptionTinyMceModal() {
      this.$refs.noticeDescriptionTinyMceModal.show = true;
    },
    onDescriptionChange(value) {
      this.noticeData.description = value;
    },
  },
  mounted() {

  },
});
</script>

<style></style>
