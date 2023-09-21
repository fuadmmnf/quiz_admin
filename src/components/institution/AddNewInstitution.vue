<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-indigo-8 q-mb-md">Add/Edit institutions</div>
      <q-form>
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
        <q-btn color="primary" label="Submit" class="q-mt-md" @click="submit" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import _ from "lodash";

export default {
  name: "AddNewInstitution",
  setup() {
    const { $q } = useQuasar();
    return {
      $q,
    };
  },
  data() {
    return {
      name: "",
      address: "",
    };
  },
  methods: {
    submit: _.debounce(function () {
      // Create a new institution object with the submitted data
      const newInstitution = {
        id: Math.floor(Math.random() * 1000000),
        name: this.name,
        address: this.address,
      };

      // Retrieve existing institutions from local storage or initialize an empty array
      const existingInstitutions =
        JSON.parse(localStorage.getItem("institutions")) || [];

      // Add the new institution to the array
      existingInstitutions.push(newInstitution);

      // Store the updated array back in local storage
      localStorage.setItem(
        "institutions",
        JSON.stringify(existingInstitutions)
      );

      console.log("Institution data submitted and stored in local storage.");
    }, 2000),
  },
};
</script>

<style></style>
