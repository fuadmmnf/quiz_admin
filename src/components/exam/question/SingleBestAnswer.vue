<template>
  <div class="q-page q-pa-md flex justify-center">
    <div>
      <q-card class="my-card" style="width: 100%; max-width: 1000px">
        <q-card-section>
          <div class="text-subtitle2" v-html="question.content"></div>
        </q-card-section>

        <q-card-actions class="q-pa-md">
          <!-- Radio buttons for answer options -->
          <div>
            <div class="q-layout" style="display: flex; flex-direction: column">
              <div
                v-for="(option, index) in question.options.data"
                :key="option.id"
                class="option-container"
              >
                <q-avatar
                  :color="
                    getOptionAnnotationColor(
                      option
                    )
                  "
                  style="border: 1px solid #000"
                  text-color="black"
                  class="smaller-avatar"
                >
                  {{ String.fromCharCode(65 + index) }}
                </q-avatar>

                <label class="option-label">{{
                  option.content
                }}</label>
              </div>
            </div>
          </div>
          <br />

          <br />
        </q-card-actions>

        <div></div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import {getOptionAnnotationColor} from "components/exam/utils";


export default defineComponent({
  name: "SingleBestAnswer",
  methods: {getOptionAnnotationColor},

  props: {
    question: {
      type: Object,
      required: true,
    },
    showAnswer: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style>
.option-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  /* Adjust this value to control the spacing between options */
}
.option-label {
  margin-left: 12px; /* Adjust this value to control the spacing between the radio button and label */
  text-align: left;
}
.smaller-avatar {
  width: 32px; /* Set the desired width for the smaller avatar */
  height: 32px; /* Set the desired height for the smaller avatar */
}
</style>
