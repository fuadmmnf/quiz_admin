<template>
  <q-dialog v-model="dialog">
    <q-card class="q-pa-lg">
      <q-toolbar>
        <q-avatar>
          <img src="/favicon.ico" alt="edu logo">
        </q-avatar>
        <q-toolbar-title><span class="text-weight-bold text-center">Share Link</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup @click="closeDialog" />
      </q-toolbar>
      <q-separator></q-separator>
      <q-card-section>
        <div class="flex items-center justify-center q-my-md">
          <q-input
            v-model="link"
            dense
            outlined
            readonly
          />
          <q-btn
            @click="copyToClipboard"
            class="q-mx-sm"
            icon="content_copy"
            round
            dense
            flat
            color="primary"
            size="md"
          >
            <q-tooltip class="bg-indigo" :offset="[10, 10]">
              Copy Link
            </q-tooltip>
          </q-btn>
        </div>
        <div class="flex justify-center"><figure class="qrcode" ref="qrCodeRef">
          <vue-qrcode
            :value="qrCodeValue"
            tag="img"
            :options="{
        errorCorrectionLevel: 'Q',
        width: 150,
      }"
          ></vue-qrcode>
          <img
            class="qrcode__image"
            src="/favicon.ico"
            alt="Chen Fengyuan"
          />
        </figure>
        </div>
        <div class=" flex justify-center">
          <q-btn
            label="Download"
            color="primary"
            size="sm"
            @click="downloadQRCode"
          >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {Notify} from "quasar";
import {ref} from "vue";
import html2canvas from "html2canvas";
const props=defineProps(['data'])
const path = (process.env.DEV ? process.env.WEB_DEV_URL : process.env.WEB_BUILD_URL);
const qrCodeRef = ref(null);
const qrCodeValue=JSON.stringify({
  type:props.data.type,
  id:props.data.id
})
const dialog=true
const link=ref(path+props.data.path+props.data.id)
const emit=defineEmits(['close'])


const downloadQRCode = () => {
  const figure = qrCodeRef.value

  html2canvas(figure)
    .then((canvas) => {
      const dataUrl = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'figure.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error('Error capturing figure:', error);
    });
};

 const copyToClipboard = async () => {
   await navigator.clipboard.writeText(link.value);
   Notify.create({
     color: "positive",
     icon: "check",
     message: "Link copied to clipboard",
   });
 };
const closeDialog=()=>{
  emit('close')
}

</script>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}

.qrcode__image {
  background-color: #fff;
  border: 0.25rem solid #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 20%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
}
</style>
