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
          @click="$router.back()"
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

    <q-separator spaced/>
    <q-form
      @submit.prevent="onSubmit"
      id="blogForm"
      @reset="onReset"
      class="q-gutter-md q-mt-lg"
      ref="blogFormRef"
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
                        v-model="blogData.category_id"
                        :label="`Category`"
                        :options="catStore.getCategoryOptions"
                        emit-value
                        map-options
                        :error="!!errors && !!errors.category_id"
                        :error-message="
                        errors && errors.category_id
                          ? errors.category_id[0]
                          : ''"
                      />
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <div class="row q-col-gutter-md">


                      <div class="col-8">
                        <q-input
                          filled
                          v-model.trim="blogData.title"
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
                      <div class="col-4">
                        <!-- duration in minutes -->
                        <q-input
                          filled
                          v-model.trim="blogData.published_at"
                          :label="`Publish Display Date`"
                          :rules="[(val) => !!val || 'Date is required']"
                          lazy-rules
                          :error="!!errors && !!errors.published_at"
                          :error-message="
                        errors && errors.published_at
                          ? errors.published_at[0]
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
                                  v-model="blogData.published_at"
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
                    <div class="row q-col-gutter-md">
                      <div class="col-6">
                        <q-input
                          filled
                          v-model.trim="blogData.description"
                          :label="`Blog Contents`"
                          @click="openBlogDescriptionTinyMceModal"
                          readonly
                          :error="!!errors && !!errors.description"
                          :error-message="
                        errors && errors.description
                          ? errors.description[0]
                          : ''"
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

                      <q-input
                        filled
                        v-model="blogData.author_info"
                        :label="`Author Details`"
                        @click="openBlogAuthorInfoTinyMceModal"
                        readonly
                        :error="!!errors && !!errors.author_info"
                        :error-message="
                        errors && errors.author_info
                          ? errors.author_info[0]
                          : ''"
                      >
                        <template v-slot: append>
                          <tiny-mce-modal
                            ref="blogAuthorInfoTinyMceModal"
                            v-model="blogData.author_info"
                            @save="onAuthorInfoChange"
                          />
                        </template>
                      </q-input>

                    </div>

                    <!--                    <div class="row q-col-gutter-md">-->
                    <!--                      <div class="col-6">-->
                    <!--                        <q-file-->
                    <!--                          filled-->
                    <!--                          bottom-slots-->
                    <!--                          v-model="blogData.photo"-->
                    <!--                          label="Blog Photo"-->
                    <!--                          counter-->
                    <!--                        >-->
                    <!--                          <template v-slot:prepend>-->
                    <!--                            <q-icon name="cloud_upload" @click.stop.prevent/>-->
                    <!--                          </template>-->
                    <!--                          <template v-if="blogData.blog_image" v-slot:append>-->
                    <!--                            <q-icon-->
                    <!--                              name="close"-->
                    <!--                              @click.stop.prevent="-->
                    <!--                                blogData.blog_image = null-->
                    <!--                              "-->
                    <!--                              class="cursor-pointer"-->
                    <!--                            />-->
                    <!--                          </template>-->

                    <!--                          <template v-slot:hint> png/jpg</template>-->
                    <!--                        </q-file>-->
                    <!--                      </div>-->
                    <!--                      <div class="col-6">-->
                    <!--                        <q-file-->
                    <!--                          filled-->
                    <!--                          bottom-slots-->
                    <!--                          v-model="blogData.blog_video"-->
                    <!--                          label="Short video"-->
                    <!--                          counter-->
                    <!--                        >-->
                    <!--                          <template v-slot:prepend>-->
                    <!--                            <q-icon name="cloud_upload" @click.stop.prevent/>-->
                    <!--                          </template>-->
                    <!--                          <template-->
                    <!--                            v-if="blogData.blog_video"-->
                    <!--                            v-slot:append-->
                    <!--                          >-->
                    <!--                            <q-icon-->
                    <!--                              name="close"-->
                    <!--                              @click.stop.prevent="-->
                    <!--                                blogData.blog_video = null-->
                    <!--                              "-->
                    <!--                              class="cursor-pointer"-->
                    <!--                            />-->
                    <!--                          </template>-->

                    <!--                          <template v-slot:hint> mp4/mkv</template>-->
                    <!--                        </q-file>-->
                    <!--                      </div>-->
                    <!--                    </div>-->

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
import {defineComponent, defineAsyncComponent, ref} from "vue";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import _ from "lodash";
import {useCategoryStore} from "stores/category";

function initBlogData() {
  return {
    title: "",
    category_id: null,
    content: "",
    published_at: "",
    author_info: "",
  };
}

export default defineComponent({
  name: "AddOrEdit Blog",
  components: {
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
  },

  setup() {
    const catStore = useCategoryStore();
    const {$q} = useQuasar();
    const blogFormRef = ref(null);
    const errors = ref(null);
    return {
      $q,
      catStore,
      blogFormRef,
      errors,
    };
  },
  data() {
    return {
      blogData: initBlogData(),
    };
  },
  methods: {
    onSubmit: _.debounce(async function () {
      console.log(this.blogData);
      if (this.$route.params.id) {
        if(this.blogFormRef.validate()){
          try{
            const res = await api.patch(`/blogs/${this.$route.params.id}`, this.blogData)

            this.$q.notify({
              message: "Blog updated Successfully",
              color: "positive",
              icon: "check",
            });

            this.onReset();
          }catch (err){
            if (err.response && err.response.status === 422) {
              this.errors = err.response.data.errors;
              console.log(err.response)
            }
          }
        }
      } else {
       if(this.blogFormRef.validate()){
         try{
           const res = await api.post("/blogs", this.blogData)

           this.$q.notify({
             message: "Blog Added Successfully",
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

      }
    }),
    onReset() {
      this.blogData = initBlogData();
    },
    openBlogDescriptionTinyMceModal() {
      this.$refs.blogDescriptionTinyMceModal.show = true;
    },
    onDescriptionChange(value, index, parentIndex) {
      this.blogData.description = value;
    },
    openBlogAuthorInfoTinyMceModal() {
      this.$refs.blogAuthorInfoTinyMceModal.show = true;
    },
    onAuthorInfoChange(value, index, parentIndex) {
      this.blogData.author_info = value;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      api.get("/blogs/" + this.$route.params.id).then((response) => {
        this.blogData = response.data.data;
      });
    }
  },
});
</script>

<style></style>
