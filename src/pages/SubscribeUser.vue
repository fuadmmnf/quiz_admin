<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Subscribe User
          <div class="text-subtitle2">List of all users are shown here</div>
        </div>
        <div class="row"></div>
      </q-card-section>
    </q-card>

    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card>
            <q-card-section>
              <q-table
                :columns="columns"
                :rows="users"
                row-key="id"
                wrap-cells
                no-data-label="No data available"
                class="shadow-0"
              >
                <!-- table data -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <!-- serial -->

                    <q-td key="name" :props="props">
                      {{ props.row.name }}
                    </q-td>
                    <q-td key="mobile" :props="props">
                      {{ props.row.mobile }}
                    </q-td>
                    <q-td key="institution" :props="props">
                      {{ props.row.institution }}
                    </q-td>

                    <q-td key="action" :props="props">
                      <q-btn
                        color="green"
                        size="sm"
                        icon="fa-solid fa-user-plus"
                        round
                        dense
                        flat
                        @click="onSubscribe(props.row.id)"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          <strong class=""
                            >Subscribe {{ props.row.name }}</strong
                          >
                        </q-tooltip></q-btn
                      >
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
import { defineComponent, defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "SubscribeUser",
  setup() {
    const { $q } = useQuasar();
    const store = useStore();
    const users = ref([]);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });
    const searchData = ref({ type: "", keywords: "" });
    const fetchUsers = (page = 1) => {
      loading.value = true;

      users.value = [
        {
          id: 1,
          name: "Newton",
          mobile: "017xxxxxxxx",
          institution: "Dhaka College",
          action: "action",
        },
        {
          id: 2,
          name: "Einstein",
          mobile: "017xxxxxxxx",
          institution: "City college",
          action: "action",
        },
        {
          id: 3,
          name: "Hawking",
          mobile: "017xxxxxxxx",
          institution: "Bangladesh University",
          action: "action",
        },
        {
          id: 4,
          name: "Feynman",
          mobile: "017xxxxxxxx",
          institution: "NSTU",
          action: "action",
        },
      ];
    };

    const loading = ref(true);

    return {
      store,
      pagination,
      loading,
      fetchUsers,
      users,
      $q,
      searchData,
    };
  },
  data() {
    return {
      name: "User",
      //table header
      //name , mobile , institution, action
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "mobile",
          label: "Mobile",
          field: "mobile",
          align: "left",
          sortable: true,
        },
        {
          name: "institution",
          label: "Institution",
          field: "institution",
          align: "left",
          sortable: true,
        },

        {
          name: "action",
          label: "Action",
          field: "action",
          align: "left",
          sortable: true,
        },
      ],
      //table data
    };
  },
  components: {
    TableActions: defineAsyncComponent(() =>
      import("components/tables/TableActions.vue")
    ),
  },
  methods: {
    onSubscribe(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to subscribe this user?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log(">>>> OK", id);
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
    },
  },

  mounted() {
    this.fetchUsers();
  },
});
</script>

<style></style>
