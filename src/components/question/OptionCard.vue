<template>
  <!--    q-expansion  option with inputs hint, explanation, visible, iscorrect, descroption -->
  <q-expansion-item
    class="q-ma-md"
    :label="`Option ${index + 1}`"
    :key="index"
    :value="index"
    :expand-separator="true"
    :default-open="true"
  >
    <q-card>
      <q-card-section>
        <!-- inputr -->
        <q-input
          filled
          label="Description"
          v-model="option.description"
          :key="index"
          :name="`description${index}`"
          :id="`description${index}`"
          readonly
        >
          <template v-slot:append>
            <tiny-mce-modal
              :content="option.description"
              @save="onDescriptionChange"
            />
          </template>
        </q-input>
        <q-input
          filled
          label="Hint"
          v-model="option.hint"
          :key="index"
          :name="`hint${index}`"
          :id="`hint${index}`"
        />
        <q-input
          filled
          label="Explanation"
          v-model="option.explanation"
          :key="index"
          :name="`explanation${index}`"
          :id="`explanation${index}`"
          readonly
        >
          <template v-slot:append>
            <tiny-mce-modal
              :content="option.description"
              @save="onDescriptionChange"
            />
          </template>
        </q-input>
        <!-- same row + delete button-->
        <div class="row">
          <q-checkbox
            v-model="option.visible"
            :key="index"
            :name="`visible${index}`"
            :id="`visible${index}`"
            label="Visible"
            class="q-ma-md"
          />
          <q-checkbox
            v-model="option.isCorrect"
            :key="index"
            :name="`isCorrect${index}`"
            :id="`isCorrect${index}`"
            label="Correct"
            class="q-ma-md"
          />
          <q-btn
            @click="deleteItem(index)"
            icon="delete"
            size="sm"
            color="negative"
            class="q-ma-lg"
          >
            Delete
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
  <!-- modal with editor -->
</template>

<script>
// define async sync components
import { QEditor } from "quasar";
import { defineAsyncComponent } from "vue";

export default {
  name: "OptionCard",
  components: {
    QEditor,
    TinyMceModal: defineAsyncComponent(() =>
      import("components/TinyMceModal.vue")
    ),
  },
  props: {
    option: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      editorOption: {
        toolbar: [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "alignleft",
          "aligncenter",
          "alignright",
          "alignjustify",
          "bullist",
          "numlist",
          "outdent",
          "indent",
          "link",
          "image",
          "undo",
          "redo",
        ],
      },
    };
  },
  methods: {
    onReady() {
      this.$refs.editor.quill.enable(false);
    },
    deleteItem(index) {
      this.$emit("deleteItem", index);
    },
    onDescriptionChange(value) {
      console.log("onDescriptionChange", value);
      this.option.description = value;
    },
  },
};
</script>

<style></style>
