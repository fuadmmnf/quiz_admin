<template>
  <div>
    <q-dialog v-model="show" :maximized="maximizedToggle" persistent>
      <q-card>
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section align="center" v-if="content">
          <editor
            v-model="content"
            api-key="nn1oy7fxz6slcu516a4moosd888g0nx0c88bm0jhwg1fib22"
            :init="{
              height: 500,
              width: 1000,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
            }"
          >
          </editor>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="Cancel" color="primary" @click="show = false" />
          <q-btn label="Save" color="primary" @click="onSave" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn round dense flat icon="edit" @click="show = true" />
  </div>
</template>

<script
  rc="https://cdn.tiny.cloud/1/nn1oy7fxz6slcu516a4moosd888g0nx0c88bm0jhwg1fib22/tinymce/6/tinymce.min.js"
  referrerpolicy="origin"
>
import { defineComponent, ref } from "vue";
import { defineAsyncComponent } from "vue";
export default defineComponent({
  name: "TinyMceModal",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
  components: {
    QEditor: defineAsyncComponent(() => import("quasar")),
    Editor: defineAsyncComponent(() => import("@tinymce/tinymce-vue")),
  },

  data() {
    return {
      show: false,
      editorOption: {
        plugins: "link image code",
        toolbar:
          "undo redo | bold italic | alignleft aligncenter alignright | code",
      },
      maximizedToggle: ref(true),
    };
  },
  methods: {
    onSave() {
      this.show = false;
      console.log("save");
      //this.$emit("save", this.$refs.editor.editor.getContent());
      console.log(this.content);
    },
  },
});
</script>

<style>
.tox-tinymce-aux {
  z-index: 99999999999 !important;
}
</style>
