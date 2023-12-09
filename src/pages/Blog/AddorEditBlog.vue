<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>

      <q-card-section class="row items-center justify-between">
        <q-btn
          color="primary"
          icon="arrow_back"
          flat
          dense
          round
          outline
          @click="$router.push('/blog')"
        />
        <div class="text-h6">Add/Edit Blog</div>
        <div class="row">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            form="blogForm"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            form="blogForm"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <q-form
      @submit.prevent="onSubmit"
      id="blogForm"
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
                    <div class="text-h6">Blog Details</div>
                    <div class="col-6">
                      <!-- subject dropdown -->
                      <q-select
                        filled
                        v-model="blogData.status_id"
                        :label="`Category`"
                        :options="statusOptions"
                        emit-value
                        map-options
                      />
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">


                      <div class="col-6">
                        <q-input
                          filled
                          v-model="blogData.title"
                          :label="`Title`"
                          :rules="[(val) => !!val || 'Title is required']"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="blogData.description"
                          :label="`Blog Contents`"
                          @click="openBlogDescriptionTinyMceModal"
                          readonly
                        >
                          <template v-slot: append>
                            <tiny-mce-modal
                              ref="blogDescriptionTinyMceModal"
                              v-model="blogData.description"
                              @save="onDescriptionChange"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="blogData.author_name"
                          :label="`Author Name`"
                          :rules="[
                            (val) => !!val || 'Author Name is required',
                          ]"
                        />
                      </div>
                      <div class="col-6">
                        <q-input
                          filled
                          v-model="blogData.author_contact_details"
                          :label="`Author's Contact Details`"
                          :rules="[
                            (val) => !!val || 'Contact detail is required',
                          ]"
                        />
                      </div>
                    </div>

                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-file
                          filled
                          bottom-slots
                          v-model="blogData.blog_image"
                          label="Blog Image"
                          counter
                        >
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" @click.stop.prevent />
                          </template>
                          <template v-if="blogData.blog_image" v-slot:append>
                            <q-icon
                              name="close"
                              @click.stop.prevent="
                                blogData.blog_image = null
                              "
                              class="cursor-pointer"
                            />
                          </template>

                          <template v-slot:hint> png/jpg </template>
                        </q-file>
                      </div>
                      <div class="col-6">
                        <q-file
                          filled
                          bottom-slots
                          v-model="blogData.blog_video"
                          label="Short video"
                          counter
                        >
                          <template v-slot:prepend>
                            <q-icon name="cloud_upload" @click.stop.prevent />
                          </template>
                          <template
                            v-if="blogData.blog_video"
                            v-slot:append
                          >
                            <q-icon
                              name="close"
                              @click.stop.prevent="
                                blogData.blog_video = null
                              "
                              class="cursor-pointer"
                            />
                          </template>

                          <template v-slot:hint> mp4/mkv </template>
                        </q-file>
                      </div>
                    </div>
                    <div class="row q-col-gutter-md q-mt-auto">
                      <div class="col-6">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model="blogData.date"
                          :label="`Date`"
                          :rules="[(val) => !!val || 'Date is required']"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer q-ma-md">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="blogData.date"
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

                      <div class="col-6">
                        <!-- subject dropdown -->
                        <q-select
                          filled
                          v-model="blogData.status_id"
                          :label="`Status`"
                          :options="statusOptions"
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
import { defineComponent, defineAsyncComponent } from "vue";
import { ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import _ from "lodash";

export default defineComponent({
  name: "AddOrEdit Course",
  components: {
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
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
      pageName: "Add/Edit Blog",
      dense: true,
      name: "",
      model: "",
      expanded: false,
      blogData: {
        title: "",
        description: "",
        status_id: "",
        date: "",
        author_name: "",
        author_contact_details: "",
        blog_image: ref(null),
        blog_video: ref(null),
      },
      statusOptions: [],
    };
  },
  methods: {
    onSubmit() {
      console.log(this.blogData);
      if (this.$route.params.id) {
        api
          .patch(`/courses/${this.$route.params.id}`, {
            status_id: this.blogData.status_id,
            title: this.blogData.title,
            description: this.blogData.description,
            author_name: this.blogData.author_name,
            author_contact_details: this.blogData.author_contact_details,
            intro_video: "https://www.youtube.com/watch?v=9JSYB59QmZw",
          })
          .then((response) => {
            console.log(response);
            this.$q.notify({
              message: "Blog updated Successfully",
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
          .post("/courses", {
            status_id: this.blogData.status_id,
            title: this.blogData.title,
            description: this.blogData.description,
            author_name: this.blogData.author_name,
            author_contact_details: this.blogData.author_contact_details,
            intro_video: "https://www.youtube.com/watch?v=9JSYB59QmZw",
          })
          .then((response) => {
            console.log(response);
            this.$q.notify({
              message: "Blog Added Successfully",
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
      console.log("Reset");
      this.blogData = {
        id: "",
        title: "",
        description: "",
        status_id: "",
        date: "",
        author_name: "",
        author_contact_details: "",
        blog_image: ref(null),
        blog_video: ref(null),
      };
    },
    openBlogDescriptionTinyMceModal() {
      this.$refs.blogDescriptionTinyMceModal.show = true;
    },
    onDescriptionChange(value, index, parentIndex) {
      this.blogData.description = value;
    },
    getSubjects() {
      api.get("/categories/subject").then((response) => {
        response.data.data.map((category) => {
          this.statusOptions.push({
            label: category.name,
            value: category.id,
          });
        });
      });
    },
  },
  mounted() {
    this.getSubjects();
    if (this.$route.params.id) {
      api.get("/courses/" + this.$route.params.id).then((response) => {
        const result = response.data.data;
        this.blogData.title = result.title;
        this.blogData.status_id = result.status_id;
        this.blogData.description = result.description;
        this.blogData.author_name = result.author_name;
        this.blogData.author_contact_details = result.author_contact_details;
        this.blogData.blog_video = result.intro_video;
      });
    }
  },
});
</script>

<style></style>
