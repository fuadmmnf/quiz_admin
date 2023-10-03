<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-indigo-8 q-mb-md">Add/Edit {{ role }}</div>
      <q-form>
        <q-input
          outlined
          v-model="name"
          label="Name"
          :rules="[(val) => !!val || 'Name is required']"
        />
        <q-input
          outlined
          v-model="phone"
          label="Phone Number"
          :rules="[(val) => !!val || 'Phone number is required']"
        />
        <!-- password with atleast one uppercase, lowercase, symbol and number -->
        <q-input
          outlined
          v-model="password"
          label="Password (min 8 characters)"
          type="password"
          :rules="[(val) => (!!val && val.length > 7) || 'Password (minimum 8 characters) is required']"
        />
        <q-input
          outlined
          v-model="password_confirmation"
          label="Confirm Password"
          type="password"
          :rules="[(val) => (!!val && val === password) || 'Does not match above password']"
        />
        <q-select
          outlined
          v-model="selectedRole"
          :options="roles"
          label="Role"
          :rules="[(val) => !!val || 'Role is required']"
          readonly
          map-options
          emit-value
        />
        <!--submit -->
        <q-btn color="primary" label="Submit" class="q-mt-md" @click="submit" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "AddNewRole",
  props: {
    role: String,
  },
  setup() {
    const { $q } = useQuasar();
    return {
      $q,
    };
  },
  data() {
    return {
      name: "",
      phone: "",
      password: "",
      password_confirmation: "",
      selectedRole: "",
      roles: [
        { label: "SubAdmin", value: "subadmin" },
        { label: "Mentor", value: "mentor" },
        { label: "Moderator", value: "moderator" },
      ],
    };
  },
  methods: {
    submit() {
      api
        .post("/register", {
          name: this.name,
          mobile: this.phone,
          password: this.password,
          role: this.selectedRole,
        })
        .then((res) => {
          this.$q.notify({
            message: "User created successfully",
            color: "positive",
            icon: "check",
          });
          this.$router.push("/Roles/" + this.roles.find(r => r.value === this.role).label);
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "negative",
            icon: "warning",
          });
        });
    },
  },
  mounted() {
    this.selectedRole = this.role;
  },
};
</script>

<style></style>
