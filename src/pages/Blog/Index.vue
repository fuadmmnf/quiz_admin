<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Blogs
          <div class="text-subtitle2">
            List of {{ route.params.status }} blogs are shown here
          </div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Blog"
            icon="add"
            :to="{name: 'blog-create', query: {course_id:  this.$route.query.course_id?.length? this.$route.query.course_id: ''}}"
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
                :rows="blogs"
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
                    </q-td>

                    <q-td key="action" :props="props">
                      <q-btn
                        color="primary"
                        size="sm"
                        icon="edit"
                        round
                        dense
                        flat
                        :to="{name: 'blog-edit', params: {id: props.row.id}}"
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
import {updateBlog} from "src/services/blog_service";

export default defineComponent({
  name: "Blogs",
  setup() {
    const {$q} = useQuasar();
    const store = useStore();
    const route = useRoute();
    const blogs = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({type: "", keywords: ""});

    const loading = ref(true);
    const fetchBlogs = async (page = 1) => {
      loading.value = true;

      api
        .get(
          `/blogs?search=status:${route.params.status}&include=category&orderBy=id&sortedBy=desc&searchJoin=and&page=${page}`
        )
        .then((response) => {
          blogs.value = response.data.data;
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
      fetchBlogs(props.pagination.page);
    };
    return {
      store,
      route,
      pagination,
      loading,
      fetchBlogs,
      blogs,
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
        },
        {
          name: "category",
          label: "Category",
          field: "category",
          align: "left",
        },
        {
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

      const {status, error} = await updateBlog(selectedItem.id, {
        status: stat,
      });

      if (status === 200) {
        console.log("Blog status updated successfully.");
        await this.fetchBlogs();
      } else {
        console.error("Error updating blog:", error);
      }
    },
    onDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete the blog?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api
            .delete(`/blogs/${id}`)
            .then((res) => {
              this.$q.notify({
                message: "Blog deleted successfully",
                color: "positive",
                icon: "check",
              });
              this.fetchBlogs();
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
    this.fetchBlogs();
  },
});
</script>

<style></style>
