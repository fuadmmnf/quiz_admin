<template>
  <q-page class="q-pa-sm">
    <q-card class="q-ma-lg">
      <q-card-section>
        <div class="text-h6 text-grey-8 text-center">Upload Materials</div>
        <div class="q-mt-lg">
          <q-form @submit.prevent="submitForm" ref="materialForm">
            <div class="row q-pa-md q-gutter-md">
              <div class="col-8 col-md-5 q-mx-auto">
                <q-input
                  v-model="form.materialName"
                  label="Book Name"
                  class="q-mb-sm"
                  :rules="[val => !!val || 'Book Name is required']"
                />
              </div>
              <div class="col-8 col-md-5 q-mx-auto">
                <q-file
                  v-model="form.file"
                  clearable
                  color="orange"
                  standout
                  bottom-slots
                  label="Upload Material File"
                  counter
                  accept=".docx,.pdf,image/*,.zip"
                  :rules="[val => !!val || 'File is required']"
                  @input="onFileAdded"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="cloud_upload" />
                  </template>
                </q-file>
              </div>
            </div>
            <div class="row justify-center q-pa-md">
              <q-btn type="submit" label="Submit" color="primary" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const form = ref({
      materialName: '',
      file: null
    });

    const onFileAdded = (file) => {
      console.log('File added:', file);
    };

    const submitForm = () => {
      const formData = new FormData();
      formData.append('materialName', form.value.materialName);
      if (form.value.file) {
        formData.append('file', form.value.file);
      }
      axios.post('https://example.com/api/upload', formData)
        .then(response => {
          console.log('Form submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('There was an error submitting the form:', error);
        });
    };
    return {
      form,
      onFileAdded,
      submitForm
    };
  }
};
</script>

<style>
</style>
