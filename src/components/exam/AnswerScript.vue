<template>
  <q-page class="text-center">
    <div
      class="flex justify-center q-mt-lg"
    >
      <q-btn
        color="primary"
        class="q-pa-sm"
        size="md"
        icon="question_answer"
        dense
        @click="generateAnswerScript"
        label="Download Answer Script"
      >
      </q-btn>
    </div>

    <vue3-html2pdf
      :show-layout="controlValue.showLayout"
      :float-layout="controlValue.floatLayout"
      :enable-download="controlValue.enableDownload"
      :preview-modal="controlValue.previewModal"
      :filename="controlValue.filename"
      :pdf-quality="controlValue.pdfQuality"
      :pdf-format="controlValue.pdfFormat"
      :pdf-orientation="controlValue.pdfOrientation"
      :pdf-content-width="controlValue.pdfContentWidth"
      :manual-pagination="controlValue.manualPagination"
      :paginate-elements-by-height="controlValue.paginateElementsByHeight"
      :html-to-pdf-options="htmlToPdfOptions"
      @progress="onProgress($event)"
      @startPagination="startPagination()"
      @hasPaginated="hasPaginated()"
      @beforeDownload="beforeDownload($event)"
      @hasDownloaded="hasDownloaded($event)"
      ref="html2Pdf"
    >
      <template  v-slot:pdf-content>
        <div v-if="answerScriptReport">
          <VerticalView @domRendered="domRendered()"  :exam-questions="exam_questions"/>
        </div>
      </template>
    </vue3-html2pdf>
    <VerticalView  :exam-questions="exam_questions" />

  </q-page>
</template>

<script >
import {api} from "boot/axios";
import {computed, onMounted, ref} from "vue";
import VerticalView from "components/exam/VerticalView.vue";
import {useRoute} from "vue-router";
import StudentCertificate from "components/certificate/StudentCertificate.vue";
import jsPDF from 'jspdf'
import Vue3Html2pdf from 'vue3-html2pdf'

export default {
  components: {StudentCertificate, VerticalView,Vue3Html2pdf},
  data() {
    return {
      answerScriptReport:false,
      progress:0,
      controlValue: {
        showLayout: false,
        floatLayout: false,
        enableDownload: false,
        previewModal: false,
        manualPagination: true,
        filename: 'AnswerScriptReport.pdf',
        pdfQuality: 2,
        pdfFormat: 'a4',
        pdfOrientation: 'portrait',
        pdfContentWidth: '100%',
        paginateElementsByHeight:6000
      },
      contentRendered: false,
    };
  },
  computed:{
    htmlToPdfOptions() {
      return {
        margin:5,
        filename: "AnswerScript.pdf",
        enableLinks: true,
        pagebreak: { mode: ['avoid-all'] },
        html2canvas: {
          useCORS: true
        },
        jsPDF:{ unit: 'px',
          hotfixes :["px_scaling"]}
      };
    },
  },

  methods: {

    async generateAnswerScript () {
      this.answerScriptReport=true
    },

    validateControlValue() {
      if (this.controlValue.pdfQuality > 2) {
        alert("pdf-quality value should only be 0 - 2");
        this.controlValue.pdfQuality = 2;
        return false;
      }

      if (!this.controlValue.paginateElementsByHeight) {
        alert("paginate-elements-by-height value cannot be empty");
        this.controlValue.paginateElementsByHeight = 1400;

        return false;
      }

      const paperSizes = [
        "a0",
        "a1",
        "a2",
        "a3",
        "a4",
        "letter",
        "legal",
        "a5",
        "a6",
        "a7",
        "a8",
        "a9",
        "a10",
      ];

      if (!paperSizes.includes(this.controlValue.pdfFormat)) {
        alert(`pdf-format value should only be ${paperSizes}`);
        this.controlValue.pdfFormat = "a4";
        return false;
      }

      if (!this.controlValue.pdfOrientation) {
        alert("pdf-orientation value cannot be empty");
        this.controlValue.pdfOrientation = "portrait";
        return false;
      }

      if (!this.controlValue.pdfContentWidth) {
        alert("pdf-content-width value cannot be empty");
        this.controlValue.pdfContentWidth = "100%";
        return false;
      }
      return true;
    },

    onProgress(progress) {
      this.progress = progress;
      console.log(`PDF generation Progress: ${progress}%`)
    },

    startPagination() {
      console.log(`PDF has started pagination`);
    },

    hasPaginated () {
      console.log(`PDF has been paginated`)
    },

    async beforeDownload ({ html2pdf, options, pdfContent }) {
      console.log(`On Before PDF Generation`)
      await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages()
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i)
          pdf.setFontSize(10)
          pdf.setTextColor(150)
          pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
        }
      }).save()
    },

    hasDownloaded (blobPdf) {
      console.log(`PDF has downloaded`)
      this.answerScriptReport=false
    },

    domRendered() {
      console.log("Dom Has Rendered");
      this.contentRendered = true;
      if (!(this.validateControlValue())) return;
      this.$refs.html2Pdf.generatePdf()
    },
  },

  setup(){
    const exam_questions=ref([])
    const route=useRoute()
    const exam_id=computed(()=>route.params.exam_id)
    const fetchExamSolution=async ()=>{
      const params = {
        include: "question",
        customInclude: "option.answer",
        limit: 0,
      };
      const response =await api.get(`exam-questions/${exam_id.value}`, {
        params,
      });
      exam_questions.value=response.data.data
    }

    onMounted(()=>{
      fetchExamSolution()
    })

    return{
      exam_questions,
      exam_id
    }
  }
}

</script>

<style></style>
