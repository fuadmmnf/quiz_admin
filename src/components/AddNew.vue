<template>
  <div class="text-h6 text-indigo-8">Add new {{ page }}</div>

  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-lg">
    <q-input
      filled
      v-model="name"
      stack-label
      :label="`${page} name *`"
      :hint="`${page} name must be unique`"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-select
      filled
      stack-label
      v-model="model"
      :options="options"
      :label="`Parent ${page} *`"
      lazy-rules
    />
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
export default {
  name: "AddNew",
  props: {
    page: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      model: "",
      options: [
        { label: "Parent Category", value: "" },
        { label: "Category 1", value: "1" },
        { label: "Category 2", value: "2" },
        { label: "Category 3", value: "3" },
        { label: "Category 4", value: "4" },
        { label: "Category 5", value: "5" },
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      console.log("@submit - do something here", evt);
      evt.target.submit();
    },
    onReset(evt) {
      console.log("@reset - do something here", evt);
    },
  },
};
</script>

<style></style>
