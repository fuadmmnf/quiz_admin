<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="text-h6 text-indigo-8">Institutions</div>
        <div class="text-subtitle2">List of all institutions</div>
      </q-card-section>
    </q-card>
    <q-separator spaced />
    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-7">
          <q-card>
            <q-card-section>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="institution" label="Institution" @click="fetchInstitutions()"/>
                <q-tab name="custom" label="Custom" @click="fetchInstitutions()" />
              </q-tabs>
            </q-card-section>
            <q-card-section>
              <q-tab-panel name="institution">
                <q-table
                  :columns="columns"
                  :rows="institutions"
                  :loading="loading"
                  wrap-cells
                  no-data-label="No data available"
                  class="shadow-0"
                  @request="onRequest"
                >
                  <!-- table data -->
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
                      </q-td>
                      <q-td key="address" :props="props">
                        {{
                          props.row.additional_info !== null
                            ? props.row.additional_info.address
                            : null
                        }}
                      </q-td>
                      <q-td key="actions" :props="props">
                        <q-btn
                          @click="editInstitution(props.row)"
                          icon="edit"
                          size="sm"
                          flat
                          dense
                          round
                          color="primary"
                        ></q-btn>
                        <q-btn
                          color="red"
                          size="md"
                          icon="delete"
                          round
                          dense
                          flat
                          @click="deleteInstitute(props.row.id)"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-tab-panel>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-indigo-8 q-mb-md">
                {{ isEditing ? "Edit" : "Add" }} institutions
              </div>
              <q-form @submit="onSubmit" @reset="onReset">
                <q-input
                  outlined
                  v-model="name"
                  label="Name"
                  :rules="[(val) => !!val || 'Name is required']"
                />
                <q-input
                  outlined
                  v-model="address"
                  label="Address"
                  :rules="[(val) => !!val || 'Address is required']"
                />

                <!--submit -->
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
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "InstitutionList",

  setup() {
    const { $q } = useQuasar();
    const tab=ref('institution');
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const filter = ref("");
    const loading = ref(false);
    const institutions = ref([]);
    const customInstitutions = ref([]);
    const columns = ref([
      {
        name: "name",
        label: "Name",
        field: "name",
        align: "left",
        sortable: false,
      },
      {
        name: "address",
        label: "Address",
        field: (row) => row.additional_info.address,
        align: "left",
        sortable: true,
      },
      {
        name: "actions",
        label: "Actions",
        field: "actions",
        align: "right",
        sortable: false,
      },
    ]);
    const fetchInstitutions = (page = 1) => {
      loading.value = true;
      if(tab.value === 'custom'){
        api
          .get("/students/institutions/custom")
          .then((response) => {
            console.log(response)
            customInstitutions.value = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });

      }else{
        api
          .get("/categories/institution")
          .then((response) => {
            institutions.value = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }

      loading.value = false;
    };
    const onRequest = (props) => {
      const { pagination, filter } = props;
      fetchInstitutions(pagination.page);
    };

    return {
      pagination,
      filter,
      loading,
      institutions,
      columns,
      fetchInstitutions,
      onRequest,
      $q,
      tab
    };
  },
  data() {
    return {
      name: "",
      address: "",
      isEditing: ref(null),
    };
  },

  mounted() {
    this.fetchInstitutions();
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      if (this.isEditing) {
        api
          .patch(`/categories/${this.isEditing.id}`, {
            name: this.name,
            type: "institution",
            parent_id: null,
            additional_info: {
              address: this.address,
            },
          })
          .then((res) => {
            this.$q.notify({
              message: "Institution Updated Successfully",
              color: "positive",
              icon: "check",
            });
            this.name = "";
            this.address = "";
            this.isEditing = null;
            this.fetchInstitutions();
          });
      } else {
        api
          .post("/categories", {
            name: this.name,
            type: "institution",
            parent_id: null,
            additional_info: {
              address: this.address,
            },
          })
          .then((res) => {
            this.$q.notify({
              message: "Institution Added Successfully",
              color: "positive",
              icon: "check",
            });
            this.name = "";
            this.address = "";
            this.fetchInstitutions();
          });
      }
    },
    onReset(evt) {
      this.name = "";
      this.address = "";
      this.isEditing = null;
    },
    editInstitution(row) {
      this.name = row.name;
      this.address =
        row.additional_info !== null ? row.additional_info.address : null;
      this.isEditing = { status: true, id: row.id };
    },
    deleteInstitute(id) {
      // confirm
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to delete this institution?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          api.delete(`/categories/${id}`).then((res) => {
            this.$q.notify({
              message: "Institution Deleted Successfully",
              color: "negative",
              icon: "check",
            });
            this.fetchInstitutions();
          });
        });
    },
  },
};
</script>

<style></style>
