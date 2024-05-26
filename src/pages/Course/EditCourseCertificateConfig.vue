<template>
  <q-page>
    <q-card class="q-ma-lg">
      <q-card-section>
        <div class="text-h6 text-grey-8 text-center">Student Certificate Configuration</div>
        <div class="q-mt-lg">
          <q-form @submit.prevent="submitForm" ref="certificateForm">
            <div class="row q-pa-md q-gutter-md">
              <div class="col-12 col-md-5 q-mx-auto">
                <q-card>
                  <q-card-section>
                    <div class="text-h6 text-grey-8 text-center">Signature 1</div>
                    <q-input v-model="form.signature1.name" label="Name" :rules="[val => !!val || 'Name is required']" />
                    <q-input v-model="form.signature1.designation" label="Designation" :rules="[val => !!val || 'Designation is required']" />
                    <q-input v-model="form.signature1.signatureImage" label="Signature Image URL" :rules="[val => !!val || 'Signature Image URL is required']" />
                    <q-file
                      v-model="form.signature1.file"
                      clearable
                      color="orange"
                      standout
                      bottom-slots
                      label="Upload Signature Image"
                      counter
                      accept="image/*"
                      :rules="[val => !!val || 'Signature Image is required']"
                      @input="onFileAdded"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-5 q-mx-auto">
                <q-card>
                  <q-card-section>
                    <div class="text-h6 text-grey-8 text-center">Signature 2</div>
                    <q-input v-model="form.signature2.name" label="Name" :rules="[val => !!val || 'Name is required']" />
                    <q-input v-model="form.signature2.designation" label="Designation" :rules="[val => !!val || 'Designation is required']" />
                    <q-input v-model="form.signature2.signatureImage" label="Signature Image URL" :rules="[val => !!val || 'Signature Image URL is required']" />
                    <q-file
                      v-model="form.signature2.file"
                      clearable
                      color="orange"
                      standout
                      bottom-slots
                      label="Upload Signature Image"
                      counter
                      accept="image/*"
                      :rules="[val => !!val || 'Signature Image is required']"
                      @input="onFileAdded"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </q-card-section>
                </q-card>
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
      signature1: {
        name: '',
        designation: '',
        signatureImage: '',
        file: null
      },
      signature2: {
        name: '',
        designation: '',
        signatureImage: '',
        file: null
      }
    });

    const onFileAdded = (file) => {
      console.log('File added:', file);
    };

    const submitForm = () => {
      const formData = new FormData();
      formData.append('signature1_name', form.value.signature1.name);
      formData.append('signature1_designation', form.value.signature1.designation);
      formData.append('signature1_signatureImage', form.value.signature1.signatureImage);
      if (form.value.signature1.file) {
        formData.append('signature1_file', form.value.signature1.file);
      }

      formData.append('signature2_name', form.value.signature2.name);
      formData.append('signature2_designation', form.value.signature2.designation);
      formData.append('signature2_signatureImage', form.value.signature2.signatureImage);
      if (form.value.signature2.file) {
        formData.append('signature2_file', form.value.signature2.file);
      }

      axios.post('https://example.com/api/demo', formData)
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
/* Add any necessary styling here */
</style>
