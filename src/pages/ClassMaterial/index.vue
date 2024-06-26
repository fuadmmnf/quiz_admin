<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          {{route.query.course_name?"Course : "+decodeURIComponent(route.query.course_name):''}} Class Materials
          <div class="text-subtitle2">
            List of  {{route.query.course_name?"Course : "+decodeURIComponent(route.query.course_name):''}} resources are shown here
          </div>
        </div>
        <div class="row">
          <q-btn
            color="primary"
            label="Add Material"
            icon="add"
            :to="{name: 'classmaterial-create', query: route.query}"
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
                :rows="classMaterials"
                :loading="loading"
                rows-per-page-options="[10]"
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
                    </q-td>

                    <q-td key="action" :props="props">
                      <q-btn
                        color="primary"
                        size="sm"
                        icon="edit"
                        round
                        dense
                        flat
                        :to="{name: 'classmaterial-edit', params: {id: props.row.id}}"
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
                    <q-btn
                                color="teal"
                                size="md"
                                icon="share"
                                round
                                dense
                                flat
                                @click="openShareDialog('class-material',props.row.id,'class-materials/')"
                        >
                            <q-tooltip
                                    anchor="top middle"
                                    self="bottom middle"
                                    :offset="[10, 10]"
                            >
                                <strong class="">Share</strong>
                            </q-tooltip>
                        </q-btn>

                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card-section>
              <ShareLinkDialog v-if="dialog" :data="shareDialogData" @close="dialog=false"></ShareLinkDialog>
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
import {updateClassMaterialStatus} from "src/services/classmaterial_service";
import ShareLinkDialog from "components/ShareLinkDialog.vue";

export default defineComponent({
  name: "ClassMaterials",
    components: {ShareLinkDialog},
  setup() {
    const {$q} = useQuasar();
    const store = useStore();
    const route = useRoute();
    const dialog=ref(false)
    const shareDialogData=ref({
          type:'',
          id:'',
          path:''
      })
    const openShareDialog=(type,id,path)=>{
          dialog.value=true
          shareDialogData.value.type=type
          shareDialogData.value.path=path
          shareDialogData.value.id=id

      }
    const classMaterials = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({type: "", keywords: ""});

    const loading = ref(true);
    const fetchClassMaterials = async (page = 1) => {
      loading.value = true;

      // const {data, status, error} = await getLectureClasses({
      //   search: `course_id:${courseId.value}`,
      //   orderBy: "id",
      //   sortedBy: "desc",
      //   page,
      // });
      //
      // if(status === 200){
      //   console.log(data);
      //   LectureClasses.value = data.data;
      //   const meta = data.meta.pagination;
      //   pagination.value = {
      //     page: meta.current_page,
      //     rowsPerPage: meta.per_page,
      //     rowsNumber: meta.total,
      //   };
      //
      //   loading.value = false;
      // }else{
      //   console.error(error);
      // }

      api
        .get(
          `/class-materials?search=status:${route.params.status}${route.query.course_id?.length ? `;course_id:${route.query.course_id}` : ''}&include=course,category,faculty,subject&orderBy=id&sortedBy=desc&searchJoin=and&page=${page}`
        )
        .then((response) => {
          classMaterials.value = response.data.data;
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
      fetchClassMaterials(props.pagination.page);
    };
    return {
      store,
      route,
      pagination,
      loading,
      fetchClassMaterials,
      classMaterials,
      $q,
      searchData,
      onRequest,
      openShareDialog,
      dialog,
      shareDialogData
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
        },
        {
          name: "subject",
          label: "Subject",
          field: "subject",
          align: "left",
        },
        {
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

      const {status, error} = await updateClassMaterialStatus(selectedItem.id, {
        status: stat,
      });

      if (status === 200) {
        console.log("Class Material status updated successfully.");
        await this.fetchClassMaterials();
      } else {
        console.error("Error updating class material:", error);
      }
    },
    onDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete the class material?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api
            .delete(`/class-materials/${id}`)
            .then((res) => {
              this.$q.notify({
                message: "Class material deleted successfully",
                color: "positive",
                icon: "check",
              });
              this.fetchClassMaterials();
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
    this.fetchClassMaterials();
  },
});
</script>

<style></style>
