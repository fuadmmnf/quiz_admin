<template>
  <q-linear-progress
    v-if="isLoading"
    dark
    rounded
    indeterminate
    color="secondary"
    class="q-mt-sm"
  />

  <div v-if="!isLoading">
    <div>
      <q-card
        :class="
          !$q.dark.isActive
            ? 'my-lg q-ma-sm bg-grey-2'
            : 'my-lg q-pa-md q-ma-sm bg-grey-8'
        "
      >

        <q-card-section>
          <q-hierarchy :columns="columns" :data="data" p>
            <template v-slot:body="props">
              <td data-th="Name">
                <div
                  v-bind:style="props.setPadding(props.item)"
                  :class="
                    props.iconName(props.item) !== 'done' ? 'q-pl-lg' : ''
                  "
                >
                  <q-btn
                    @click="props.toggle(props.item)"
                    v-if="props.iconName(props.item) !== 'done'"
                    :icon="props.iconName(props.item)"
                    flat
                    dense
                  >
                  </q-btn>
                  <q-icon class="q-mx-sm" size="xs" v-else name="list"></q-icon>
                  <span class="q-ml-sm">{{ props.item.label }}</span>
                </div>
              </td>
              <td class="text-center">{{ props.item.description }}</td>
              <td class="text-center">{{ props.item.code }}</td>
              <td class="text-center">{{ props.item.price }}</td>
              <td class="text-center">{{ props.item.category }}</td>
              <td class="text-center">{{ props.item.subject }}</td>
              <td class="text-center">{{ props.item.course }}</td>
              <td class="text-left">
                <q-btn
                  @click="handleAddButtonClick(props.item)"
                  flat
                  round
                  icon="add"
                  size="10px"
                >
                  <q-tooltip>Add</q-tooltip>
                </q-btn>
                <q-btn
                  @click="handleEditButtonClick(props.item)"
                  flat
                  round
                  icon="edit"
                  size="10px"
                  class="q-ml-sm"
                >
                  <q-tooltip>Edit</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  icon="delete"
                  size="10px"
                  color="primary"
                  class="q-ml-sm"
                  @click="handleDeleteButtonClick(props.item)"
                >
                  <q-tooltip>Delete</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="
                    props.item.children === undefined ||
                    props.item.children.length === 0
                  "
                  flat
                  round
                  icon="fa-solid fa-book-open"
                  size="9px"
                  color="primary"
                  @click="handleQuestionsButtonClick(props.item.id)"
                  class="q-ml-sm"
                >
                  <q-tooltip>Questions</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="
                    props.item.parentId === '' && status === 'draft'
                  "
                  @click="handlePublishButtonClick(props.item)"
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
                  v-if="
                    props.item.parentId === '' &&
                    status === 'published'
                  "
                  @click="handleMovetoDraftButtonClick(props.item)"
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
                  class="q-mx-md"
                  color="primary"
                  size="md"
                  icon="people"
                  round
                  dense
                  flat
                  :to="{name: 'questionbank-users', params: {question_bank_id: props.item.id}, query: { question_bank_name: props.item.label}}"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong class="">Enrolled users</strong>
                  </q-tooltip>
                </q-btn>
                <q-btn
                    color="teal"
                    size="md"
                    icon="share"
                    round
                    dense
                    flat
                    @click="openShareDialog('question-bank',props.item.id,'question-bank/')"
                >
                  <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                  >
                    <strong class="">Share</strong>
                  </q-tooltip>
                </q-btn>
              </td>
            </template>
          </q-hierarchy>
        </q-card-section>
      </q-card>

      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="totalPages" direction-links/>
      </div>
    </div>
    <q-dialog v-model="showAddEditDialog">
      <div v-if="status === 'draft'" class="col-3">
        <q-card class="q-mt-sm" style="width: 600px; max-width: 70vw">
          <q-bar>
            Add/Edit Question bank
            <q-space/>

            <q-btn
              dense
              flat
              icon=" close
        "
              v-close-popup
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
            <!--            <div class="text-h6 text-indigo-8">-->
            <!--            </div>-->

            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md q-mt-lg"
            >
              <q-input
                outlined
                v-model="name"
                :label="`Question Bank Title`"
                :rules="[(val) => !!val || 'Field is required']"
              />

              <q-select
                v-if="!isEditMode"
                outlined
                v-model="parentId"
                :label="`Parent Category`"
                :options="parentOptions"
                map-options
                emit-value
                :disable="!isSelect"
              />
              <div>
                <q-btn label="Submit" type="submit" color="primary"/>
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
    </q-dialog>

    <ShareLinkDialog v-if="dialog" :data="shareDialogData" @close="dialog=false"></ShareLinkDialog>
  </div>
</template>

<script>
import {onMounted, ref, toRefs, watch} from "vue";

import {
  addQuestionBank,
  editQuestionBank,
  getQuestionBanks,
  updateQuestionBankStatus,
  deleteQuestionBank,
} from "src/services/questionbank_service";
import {useRouter, useRoute} from "vue-router";
import {useQuasar} from "quasar";
import ShareLinkDialog from "components/ShareLinkDialog.vue";

export default {
  components: {ShareLinkDialog},
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {},
  setup(props) {
    const $q = useQuasar();
    const columns = [
      {
        name: "label",
        label: "Title",
        align: "left",
        field: "label",
        // (optional) tell QHierarchy you want this column sortable
        // sortable: true
      },
      {
        name: "Description",
        label: "Status",
        // sortable: true,
        field: "description",
        align: "center",
      },
      {
        name: "Code",
        label: "Code",
        // sortable: true,
        field: "code",
        align: "center",
      },
      {
        name: "Price",
        label: "Price",
        sortable: true,
        field: "price",
        align: "center",
      },
      {
        name: "Category",
        label: "Category",
        // sortable: true,
        field: "category",
        align: "center",
      },

      {
        name: "Subject",
        label: "Subject",
        // sortable: true,
        field: "subject",
        align: "center",
      },
      {
        name: "Course",
        label: "Course",
        // sortable: true,
        field: "course",
        align: "center",
      },
      {
        name: "action",
        label: "Action",
        // sortable: true,
        field: "action",
        align: "left",
      },
    ];

    const data = ref([]);
    const name = ref("");
    const parentId = ref("");
    const isLoading = ref(false);
    const isEditMode = ref(false);
    const isSelect = ref(false);
    const editingItemId = ref(null);
    const current = ref(1);
    const totalPages = ref(0);
    const showAddEditDialog = ref(false);
    const parentOptions = ref([]);
    const router = useRouter();
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


    const handleAddButtonClick = (selectedItem) => {
      showAddEditDialog.value = true;
      parentOptions.value = [
        {
          label: selectedItem.label,
          value: selectedItem.id,
        },
      ];
      // console.log(parentOptions.value);

      parentId.value = selectedItem.id;
      // console.log("Clicked");
      isEditMode.value = false;
      isSelect.value = true;
    };

    const handleEditButtonClick = (selectedItem) => {
      showAddEditDialog.value = true;
      name.value = selectedItem.label;
      parentId.value = selectedItem.parent_id;

      editingItemId.value = selectedItem.id;
      console.log(editingItemId.value);
      isEditMode.value = true;
      isSelect.value = false;
    };

    const handleDeleteButtonClick = async (selectedItem) => {
      const questionBankId = selectedItem.id;

      $q.dialog({
        title: "Confirm",
        message: "Would you like to delete the Question bank?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          const {status, error} = await deleteQuestionBank(questionBankId);

          if (status === 204) {
            $q.notify({
              message: "Question bank deleted successfully",
              color: "positive",
              icon: "check",
            });
            await getQuestionBankList(current.value);
          } else {
            console.error("Error deleting question bank:", error);
          }
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
    };
    const handlePublishButtonClick = async (selectedItem) => {
      const questionBankId = selectedItem.id;

      const {status, error} = await updateQuestionBankStatus(questionBankId, {
        status: "published",
      });

      if (status === 200) {
        console.log("Question bank published successfully.");
        await getQuestionBankList(current.value);
      } else {
        console.error("Error publishing question bank:", error);
      }
    };

    const handleMovetoDraftButtonClick = async (selectedItem) => {
      const questionBankId = selectedItem.id;

      const {status, error} = await updateQuestionBankStatus(questionBankId, {
        status: "draft",
      });

      if (status === 200) {
        console.log("Question bank moved to draft successfully.");
        await getQuestionBankList(current.value);
      } else {
        console.error("Error moving to draft question bank:", error);
      }
    };

    const handleQuestionsButtonClick = (questionBankId) => {
      // Programmatically navigate to the edit-questions page
      router.push({
        name: "questionbank-questions",
        params: {id: questionBankId},
      });
    };

    const transformData = (data) => {
      return data.map((item) => ({
        id: item.id,
        label: item.title,
        description: item.status,
        code: item.code ? item.code : "null",
        price: item.price ? item.price : "null",
        category: item.category ? item.category.data.name : "null",
        subject: item.subject ? item.subject.data.name : "null",
        course: item.course ? item.course.data.title : "null",
        children: item.children ? transformData(item.children.data) : [],
        parentId: item.parent_id,
      }));
    };

    const onReset = () => {
      name.value = "";
      parentId.value = "";
    };

    const onSubmit = async () => {
      if (isEditMode.value) {
        const {data, status, error} = await editQuestionBank({
          id: editingItemId.value,
          title: name.value,

          parent_id: parentId.value,
        });

        if (status === 200) {
          showAddEditDialog.value = false;
          onReset()
          getQuestionBankList(current.value);

        } else {
          console.error(error);
        }
      } else {
        const {data, status, error} = await addQuestionBank({
          title: name.value,
          code: "",
          parent_id: parentId.value,
        });

        if (status === 201) {
          showAddEditDialog.value = false;
          onReset()
          current.value = 1;
          getQuestionBankList(current.value);
        } else {
          console.error(error);
        }
      }
    };

    onMounted(() => {
      getQuestionBankList(current.value);
    });

    const getQuestionBankList = async (newPage) => {
      isLoading.value = true;

      const params = {
        orderBy: "id",
        sortedBy: "desc",
        search: `status:${props.status}${route.query.course_id?.length ? (";course_id:" + route.query.course_id) : ""}`,
        searchJoin: "and",
        include: "subject,category,children",
        limit: 20,
        page: newPage,
      };
      //
      if (props.status === "all") {
        params.search = route.query.course_id?.length ? ("course_id:" + route.query.course_id) : "";
      }

      const {
        data: responseData,
        status,
        error,
      } = await getQuestionBanks(params);

      if (status === 200) {
        console.log(responseData);
        data.value = transformData(responseData.data);

        const {total_pages} = responseData.meta.pagination;

        current.value = newPage;
        totalPages.value = total_pages;
      }
      isLoading.value = false;
    };

    watch(current, (newPage, oldPage) => {
      if (newPage !== oldPage) {
        getQuestionBankList(newPage);
      }
    });

    return {
      columns,
      data,
      name,
      parentId,
      showAddEditDialog,
      handleAddButtonClick,
      handleEditButtonClick,
      handleDeleteButtonClick,
      handlePublishButtonClick,
      handleMovetoDraftButtonClick,
      handleQuestionsButtonClick,
      onReset,
      onSubmit,
      isLoading,
      isEditMode,
      current,
      totalPages,
      parentOptions,
      isSelect,
      shareDialogData,
      dialog,
      openShareDialog
    };
  },
};
</script>

<style></style>
