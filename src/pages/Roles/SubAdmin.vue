<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="text-h6 text-indigo-8">SubAdmin Roles</div>
        <div class="text-subtitle2">List of all subadmin roles</div>
      </q-card-section>
    </q-card>
    <q-separator spaced />

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-7">
          <q-card>
            <q-card-section>
              <role-list :role="'subadmin'"></role-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5">
          <add-new-role :role="'subadmin'"></add-new-role>
        </div>
        a
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
    AddNewRole: defineAsyncComponent(() =>
      import("src/components/roles/AddNewRole.vue")
    ),
    RoleList: defineAsyncComponent(() =>
      import("src/components/roles/RoleList.vue")
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

AddNew
