<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
          {{"Course : "+decodeURIComponent(route.query.course_name)}} Class Materials
          <div class="text-subtitle2">
            List of {{"Course : "+decodeURIComponent(route.query.course_name)}} resources are shown here
========
          Blogs
          <div class="text-subtitle2">
            List of {{ route.params.status }} blogs are shown here
>>>>>>>> dev:src/pages/Blog/Index.vue
          </div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
            label="Add Material"
            icon="add"
            :to="{name: 'classmaterial-create', query: route.query}"
========
            label="Add Blog"
            icon="add"
            :to="{name: 'blog-create', query: {course_id:  this.$route.query.course_id?.length? this.$route.query.course_id: ''}}"
>>>>>>>> dev:src/pages/Blog/Index.vue
          />
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <q-table
                :columns="columns"
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
                :rows="classMaterials"
========
                :rows="blogs"
>>>>>>>> dev:src/pages/Blog/Index.vue
                :loading="loading"
                :rows-per-page-options="[10]"
                row-key="real_id"
                wrap-cells
                no-data-label="No data available"
                class="shadow-0"
                v-model:pagination="pagination"
                @request="onRequest"
              >
                <!-- table data -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <!-- serial -->

                    <q-td key="title" :props="props">
                      {{ props.row.title }}
                    </q-td>

<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
                    <q-td key="type" :props="props">
                      {{ props.row.type }}
                    </q-td>
                    <q-td key="category" :props="props">
                      {{ props.row.category?.data.name ?? "" }}
                    </q-td>
                    <q-td key="subject" :props="props">
                      {{ props.row.subject?.data.name ?? "" }}
                    </q-td>
                    <q-td key="faculty" :props="props">
                      {{ props.row.faculty?.data.name ?? "" }}
                    </q-td>
                    <q-td key="course" :props="props">
                      {{ props.row.course?.data.title ?? "" }}
                    </q-td>
                    <q-td key="time" :props="props">
                      {{ props.row.time }}
========
                    <q-td key="category" :props="props">
                      {{ props.row.category?.data.name }}
                    </q-td>
                    <q-td key="author_info" :props="props">
                      <div v-html="props.row.author_info" />
                    </q-td>
                    <q-td key="published_at" :props="props">
                      {{ props.row.published_at }}
                    </q-td>
                    <q-td key="read_count" :props="props">
                      {{ props.row.read_count }}
>>>>>>>> dev:src/pages/Blog/Index.vue
                    </q-td>

                    <q-td key="action" :props="props">
                      <q-btn
                        color="primary"
                        size="sm"
                        icon="edit"
                        round
                        dense
                        flat
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
                        :to="{name: 'classmaterial-edit', params: {id: props.row.id}}"
========
                        :to="{name: 'blog-edit', params: {id: props.row.id}}"
>>>>>>>> dev:src/pages/Blog/Index.vue
                      />
                      <q-btn
                        v-if="props.row.status === 'draft'
                  "
                        @click="handleStatusChangeClick(props.row, 'published')"
                        flat
                        round
                        icon="file_upload"
                        size="10px"
                        color="primary"
                        class="q-ml-sm"
                      >
                        <q-tooltip>Publish</q-tooltip>
                      </q-btn>
                      <q-btn
                        v-else
                        @click="handleStatusChangeClick(props.row, 'draft')"
                        flat
                        round
                        icon="move_to_inbox"
                        size="10px"
                        color="primary"
                        class="q-ml-sm"
                      >
                        <q-tooltip>Move to Draft</q-tooltip>
                      </q-btn>
                      <q-btn
                        color="negative"
                        size="sm"
                        icon="delete"
                        round
                        dense
                        flat
                        @click="onDelete(props.row.id)"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent, ref, computed} from "vue";
import {useStore} from "src/stores/store";
import {api} from "boot/axios";
import {useQuasar} from "quasar";
import {getLectureClasses} from "src/services/course_service";
import {useRoute} from "vue-router";
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
import {updateClassMaterialStatus} from "src/services/classmaterial_service";

export default defineComponent({
  name: "ClassMaterials",
========
import {updateBlog} from "src/services/blog_service";

export default defineComponent({
  name: "Blogs",
>>>>>>>> dev:src/pages/Blog/Index.vue
  setup() {
    const {$q} = useQuasar();
    const store = useStore();
    const route = useRoute();
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
    const classMaterials = ref([]);
========
    const blogs = ref([]);
>>>>>>>> dev:src/pages/Blog/Index.vue
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({type: "", keywords: ""});

    const loading = ref(true);
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
    const fetchClassMaterials = async (page = 1) => {
========
    const fetchBlogs = async (page = 1) => {
>>>>>>>> dev:src/pages/Blog/Index.vue
      loading.value = true;

      api
        .get(
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
          `/class-materials?search=status:${route.params.status}${route.query.course_id?.length ? `;course_id:${route.query.course_id}` : ''}&include=course,category,faculty,subject&orderBy=id&sortedBy=desc&searchJoin=and&page=${page}`
        )
        .then((response) => {
          classMaterials.value = response.data.data;
========
          `/blogs?search=status:${route.params.status}&include=category&orderBy=id&sortedBy=desc&searchJoin=and&page=${page}`
        )
        .then((response) => {
          blogs.value = response.data.data;
>>>>>>>> dev:src/pages/Blog/Index.vue
          const meta = response.data.meta.pagination;
          pagination.value = {
            page: meta.current_page,
            rowsPerPage: meta.per_page,
            rowsNumber: meta.total,
          };
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const onRequest = (props) => {
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
      fetchClassMaterials(props.pagination.page);
========
      fetchBlogs(props.pagination.page);
>>>>>>>> dev:src/pages/Blog/Index.vue
    };
    return {
      store,
      route,
      pagination,
      loading,
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
      fetchClassMaterials,
      classMaterials,
========
      fetchBlogs,
      blogs,
>>>>>>>> dev:src/pages/Blog/Index.vue
      $q,
      searchData,
      onRequest,
    };
  },
  data() {
    return {
      name: "Class Materials",
      //table header
      //name , mobile , institution, action
      columns: [
        {
          name: "title",
          label: "Title",
          field: "title",
          align: "left",
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
        },
        {
          name: "type",
          label: "TYpe",
          field: "type",
          align: "left",
        },
        {
          name: "category",
          label: "Category",
          field: "category",
          align: "left",
========
>>>>>>>> dev:src/pages/Blog/Index.vue
        },
        {
          name: "category",
          label: "Category",
          field: "category",
          align: "left",
        },
        {
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
          name: "faculty",
          label: "Faculty",
          field: "faculty",
          align: "left",
        },
        {
          name: "course",
          label: "Course",
          field: "course",
          align: "left",
        },
        {
          name: "time",
          label: "Time",
          field: "time",
========
          name: "author_info",
          label: "Author Info",
          field: "course",
          align: "left",
        },
        {
          name: "published_at",
          label: "Published At",
          field: "published_at",
          align: "left",
        },
        {
          name: "read_count",
          label: "Read Count",
          field: "read_count",
>>>>>>>> dev:src/pages/Blog/Index.vue
          align: "left",
        },
        {
          name: "action",
          label: "Action",
          field: "action",
          align: "left",
        },
      ],
      //table data
    };
  },

  methods: {
    async handleStatusChangeClick(selectedItem, stat) {

<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
      const {status, error} = await updateClassMaterialStatus(selectedItem.id, {
========
      const {status, error} = await updateBlog(selectedItem.id, {
>>>>>>>> dev:src/pages/Blog/Index.vue
        status: stat,
      });

      if (status === 200) {
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
        console.log("Class Material status updated successfully.");
        await this.fetchClassMaterials();
      } else {
        console.error("Error updating class material:", error);
========
        console.log("Blog status updated successfully.");
        await this.fetchBlogs();
      } else {
        console.error("Error updating blog:", error);
>>>>>>>> dev:src/pages/Blog/Index.vue
      }
    },
    onDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
          message: "Would you like to delete the class material?",
========
          message: "Would you like to delete the blog?",
>>>>>>>> dev:src/pages/Blog/Index.vue
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
            .delete(`/class-materials/${id}`)
            .then((res) => {
              this.$q.notify({
                message: "Class material deleted successfully",
                color: "positive",
                icon: "check",
              });
              this.fetchClassMaterials();
========
            .delete(`/blogs/${id}`)
            .then((res) => {
              this.$q.notify({
                message: "Blog deleted successfully",
                color: "positive",
                icon: "check",
              });
              this.fetchBlogs();
>>>>>>>> dev:src/pages/Blog/Index.vue
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .onCancel(() => {
          // console.log(">>>> Cancel");
        });
    },
  },

  mounted() {
<<<<<<<< HEAD:src/pages/ClassMaterial/index.vue
    this.fetchClassMaterials();
========
    this.fetchBlogs();
>>>>>>>> dev:src/pages/Blog/Index.vue
  },
});
</script>

<style></style>
