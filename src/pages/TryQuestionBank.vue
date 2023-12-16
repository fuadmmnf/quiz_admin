<template>

  <q-linear-progress v-if="isLoading" dark rounded indeterminate color="secondary" class="q-mt-sm" />

  <div v-if="!isLoading" class="row">

    <div class="col-9">
      <q-card :class="!$q.dark.isActive?'my-lg q-ma-sm bg-grey-2':'my-lg q-pa-md q-ma-sm bg-grey-8'">
        <q-toolbar>
          <q-ribbon
            position="left"
            color="rgba(0,0,0,.58)"
            background-color="#c0c0c0"
            leaf-color="#a0a0a0"
            leaf-position="bottom"
            decoration="rounded-out"
          >
            <q-toolbar-title
              class="example-title"
              style="padding: 5px 20px;"
            ><span class="ellipsis">Question Banks</span></q-toolbar-title>
          </q-ribbon>
        </q-toolbar>
        <q-card-section class="q-pb-sm">
          <code-tabs :tagParts="tagParts"></code-tabs>
        </q-card-section>
        <q-card-section>
          <q-hierarchy :columns="columns" :data="data" p>
            <template v-slot:body="props">
              <td data-th="Name">
                <div v-bind:style="props.setPadding(props.item)"
                     :class="props.iconName(props.item)!=='done'?'q-pl-lg':''">
                  <q-btn @click="props.toggle(props.item)" v-if="props.iconName(props.item)!=='done'"
                         :icon="props.iconName(props.item)" flat
                         dense>
                  </q-btn>
                  <q-icon class="q-mx-sm" size="xs" v-else name="list"></q-icon>
                  <span class="q-ml-sm">{{ props.item.label }}</span>
                </div>
              </td>
              <td class="text-center">{{ props.item.description }}</td>
              <td class="text-center">{{ props.item.code }}</td>
              <td class="text-center">{{ props.item.subject }}</td>
              <td class="text-left">

                <q-btn @click="handleAddButtonClick(props.item)" flat round icon="add" size="10px"><q-tooltip>Add</q-tooltip></q-btn>
                <q-btn @click="handleEditButtonClick(props.item)" flat round icon="edit" size="10px" class="q-ml-sm"><q-tooltip>Edit</q-tooltip></q-btn>
                <q-btn flat round icon="delete" size="10px" color="primary" class="q-ml-sm"><q-tooltip>Delete</q-tooltip></q-btn>
                <q-btn v-if="props.item.children === undefined || props.item.children.length === 0" flat round icon="fa-solid fa-book-open" size="9px" color="primary" @click="handleQuestionsButtonClick(props.item.id)" class="q-ml-sm"><q-tooltip>Questions</q-tooltip></q-btn>
                <q-btn v-if="props.item.parentId === '' && statusApi==='status:draft'" @click="handlePublishButtonClick(props.item)" flat round icon="file_upload" size="10px" color="primary" class="q-ml-sm"><q-tooltip>Publish</q-tooltip></q-btn>
                <q-btn v-if="props.item.parentId === '' && statusApi==='status:published'" @click="handleMovetoDraftButtonClick(props.item)" flat round icon="move_to_inbox" size="10px" color="primary" class="q-ml-sm"><q-tooltip>Move to Draft</q-tooltip></q-btn>
              </td>
            </template>
          </q-hierarchy>
        </q-card-section>
      </q-card>

      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="totalPages" direction-links />
      </div>
    </div>

    <div v-if="statusApi==='status:draft'" class="col-3">
      <q-card class="q-mt-sm">
        <q-card-section>
          <div class="text-h6 text-indigo-8">
             Add/Edit
          </div>

          <q-form

            class="q-gutter-md q-mt-lg"
          >
            <q-input
              outlined
              v-model="name"
              :label="`Question Bank Title`"

              :rules="[(val) => !!val || 'Field is required']"
            />


            <q-select
              outlined
              v-model="parentId"
              :label="`Parent Category`"
              :options="parentOptions"
              map-options
              emit-value
              :disable="!isSelect"

            />
            <div>
              <q-btn label="Submit" @click="onSubmit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                @click="onReset"
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

</template>

<script>
import {onMounted, ref, toRefs, watch} from "vue";
import {
  addQuestionBank,
  editQuestionBank,
  getQuestionBanks,
  updateQuestionBankStatus
} from "src/services/questionBank_services";
import {useRouter} from "vue-router";

export default {
  props: {
    statusApi: {
      type: String,
      required: true
    }
  },
  computed: {

  },
  setup(props) {
    const columns = [
      {
        name: 'label',
        label: 'Title',
        align: 'left',
        field: 'label',
        // (optional) tell QHierarchy you want this column sortable
        sortable: true
      },
      {
        name: 'Description',
        label: 'Status',
        sortable: true,
        field: 'description',
        align: 'center'
      },
      {
        name: 'Code',
        label: 'Code',
        sortable: true,
        field: 'code',
        align: 'center'
      },
      {
        name: 'Subject',
        label: 'Subject',
        sortable: true,
        field: 'subject',
        align: 'center'
      },
      {
        name: 'action',
        label: 'Action',
        sortable: true,
        field: 'action',
        align: 'left'
      }
    ]

    const data = ref([]);
    const name = ref("");
    const parentId = ref("");
    const isLoading = ref(false);
    const isEditMode = ref(false);
    const isSelect = ref(false);
    const editingItemId = ref(null);
    const current = ref(1);
    const totalPages = ref(0);
    const parentOptions = ref([]);
    const router = useRouter();

    const { statusApi } = toRefs(props);

    const handleAddButtonClick = (selectedItem) => {

      parentOptions.value = [{
        label: selectedItem.label,
        value: selectedItem.id,
      }];
      // console.log(parentOptions.value);

      parentId.value = selectedItem.id;
      // console.log("Clicked");
      isEditMode.value = false;
      isSelect.value=true;

    };


    const handleEditButtonClick = (selectedItem) => {
      name.value = selectedItem.label;
      parentId.value = selectedItem.parent_id;
      editingItemId.value = selectedItem.id;
      console.log(editingItemId.value);
      isEditMode.value = true;
      isSelect.value=false;
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
      router.push({ name: 'questionbank-questions', params: { id: questionBankId } });
    };

    const transformData = (data) => {
      return data.map(item => ({
        id: item.id,
        label: item.title,
        description: item.status,
        code: item.code ? item.code : 'null',
        subject: item.subject ? item.subject.data.name : 'null',
        children: transformData(item.children.data),
        parentId: item.parent_id,
      }));
    };


    const onReset = () => {
      name.value = "";
      parentId.value = "";
    };

    const onSubmit = async ()=>{
      if(isEditMode.value){
        const { data, status, error } = await editQuestionBank({
          id: editingItemId.value,
          title: name.value,

          parent_id: parentId.value,
        });

        if (status === 200) {
          console.log('Question bank edited successfully:', data);
        } else {
          console.error(error);
        }
      }else{

        const {data, status, error} = await addQuestionBank({
          title: name.value,
          code: 1234,
          parent_id: parentId.value,
        });


        if (status === 201) {
          console.log('Question bank added successfully:', data);
        }else{
          console.error(error);
        }
      }
    }

    onMounted(async () => {
    await getQuestionBankList(current.value);
    });

    const getQuestionBankList = async (newPage) =>{
      isLoading.value = true;

      const params = {
        orderBy: 'id',
        sortedBy: 'desc',
        search: statusApi.value,
        searchJoin: 'and',
        include: 'subject,faculty',
        limit: 50,
        page: newPage,

      }

      const { data: responseData, status, error } = await getQuestionBanks(params);

      if(status === 200){
        console.log(responseData);
        data.value = transformData(responseData.data);

        const {total_pages } = responseData.meta.pagination;

        current.value = newPage;
        totalPages.value = total_pages;

      }
      isLoading.value = false;
    }

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
      handleAddButtonClick,
      handleEditButtonClick,
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
      isSelect
    };
  },
};
</script>

<style>

</style>
