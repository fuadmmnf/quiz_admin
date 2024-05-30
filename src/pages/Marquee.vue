<template>
  <q-page class="q-pa-sm">
    <q-card class="q-ma-lg">
      <q-card-section>
        <div class="text-h6 text-grey-8 text-center">Update Marquee Text</div>
        <div class="q-mt-lg">
          <q-form @submit.prevent="submitForm" ref="materialForm">
            <div class="row q-pa-md q-gutter-md">
              <div class="col-8 col-md-5 q-mx-auto">
                <q-input
                  filled
                  v-model="form.marqueeText"
                  label="Marquee Text"
                  type="text"
                  clearable
                  :rules="[val => !!val || 'Marquee Text is required']"
                />
              </div>
              <div class="col-8 col-md-5 q-mx-auto">
                <q-input
                  filled
                  v-model="form.marqueeLink"
                  label="Marquee Link"
                  type="url"
                  clearable
                  :rules="[val => !!val || 'Marquee Link is required']"
                />
              </div>
            </div>
            <div class="row justify-center q-pa-md">
              <q-btn type="submit" label="Submit" color="primary" />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
    <!-- Display the marquee -->
    <div class="marquee-container">
      <div class="marquee">
        <a :href="form.marqueeLink" target="_blank">{{ form.marqueeText }}</a>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const form = ref({
      marqueeText: '',
      marqueeLink: ''
    });

    const $q = useQuasar();

    const submitForm = () => {
      const materialForm = form.value;
      if (!materialForm.marqueeText || !materialForm.marqueeLink) {
        $q.notify({
          message: 'Please fill in both fields.',
          type: 'negative',
        });
        return;
      }
      // Display a success message
      $q.notify({
        message: 'Marquee updated successfully!',
        type: 'positive',
      });
    };

    return {
      form,
      submitForm,
    };
  },
};
</script>
