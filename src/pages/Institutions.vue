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
                <institution-list></institution-list>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-5">
            <add-new-institution></add-new-institution>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { api } from "src/boot/axios";
  import { defineComponent, defineAsyncComponent, ref } from "vue";
  
  export default defineComponent({
    name: "Admin",
    components: {
      AddNewInstitution: defineAsyncComponent(() =>
        import("src/components/institution/AddNewInstitution.vue")
      ),
      InstitutionList: defineAsyncComponent(() =>
        import("src/components/institution/InstitutionList.vue")
      ),
    },
  
    //   setup() {
    //     const { $q } = useQuasar();
    //     return {};
    //   },
    data() {
      return { pageName: "Admin Roles" };
    },
  });
  </script>
  
  <style></style>
  