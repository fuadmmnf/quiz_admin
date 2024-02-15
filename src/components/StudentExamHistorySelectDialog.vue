<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-toolbar>
        <q-btn flat round dense icon="close" @click="close" />
      </q-toolbar>
      <q-card-section>
        <q-card-section>
          <div class="text-h6 text-grey-8 text-center">Generate Report</div>
          <div class="row q-pa-md">
            <q-form
              @submit.prevent="generateStudentExamHistoryReport"
              ref="historyFormRef"
            >
              <div class="row q-pa-md q-gutter-md">
                <div class="col-12 q-px-md">
                  <q-input
                    filled
                    outlined
                    v-model="formData.limit"
                    label="Exam Count"
                  />
                </div>
                <div class="col-12 q-px-md">
                  <q-select
                    outlined
                    filled
                    v-model="formData.course_id"
                    :options="courses"
                    emit-value
                    map-options
                    label="Courses"
                  />
                </div>
                <div class="col-12 q-px-md">
                  <q-item class="justify-center">
                    <q-btn color="primary" type="submit" label="Generate"></q-btn>
                  </q-item>
                </div>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
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
        <div v-if="report">
          <StudentExamHistoryReport @domRendered="domRendered()"  :data="data"  >
          </StudentExamHistoryReport>
        </div>
      </template>
    </vue3-html2pdf>
  </q-dialog>
</template>

<script>
import {onMounted, ref} from "vue";
import jsPDF from 'jspdf'
import Vue3Html2pdf from 'vue3-html2pdf'
import { api } from "boot/axios";
import { useStore } from "src/stores/store";
import {useQuasar} from "quasar";
import StudentExamHistoryReport from "components/report/StudentExamHistoryReport.vue";

export default {
    components: {StudentExamHistoryReport,jsPDF,Vue3Html2pdf},
    props:['user_id'],
    emits:['closeDialog'],
    setup(props, { emit }){
        const store = useStore();
        const dialog = true;
        const $q=useQuasar()
        const formData = ref({
            limit:null,
            course_id:""
        });
        const historyFormRef = ref(null);
        const courses = ref([]);

        const  fetchCourseData=async ()=>{
            try {
                const response = await api.get(`course-users?search=user_id:${props.user_id};
    course.status:published&orderBy=id&sortedBy=desc&searchJoin=and&include=course&limit=0`);
                response.data.data.map(item=>{
                    courses.value.push({
                        label:item.course.data.title,
                        value:item.course_id
                    })
                })
            } catch (error) {
                console.log(error)
            }
        }
        const submitForm = async () => {
            try {
                // if (historyFormRef.value.validate()) {
                //   const response = await api.patch(`v1/elections/${props.election_id}`, {
                //     status: formData.value.status,
                //   });
                //   $q.notify("Election Status Changed")
                //   emit("reload");
                // }
            } catch (error) {
                console.log(error)
            }
        };
        const close = () => {
            emit("closeDialog");
        };

        onMounted(()=>{
            fetchCourseData()
        })

        return {
            dialog,
            submitForm,
            close,
            formData,
            courses,
            historyFormRef
        }
    },
    data(){
        return {
            report:false,
            progress:0,
            controlValue: {
                showLayout: false,
                floatLayout: true,
                enableDownload: false,
                previewModal: true,
                manualPagination: true,
                filename: 'StudentExamHistoryListReport.pdf',
                pdfQuality: 2,
                pdfFormat: 'a4',
                pdfOrientation: 'portrait',
                pdfContentWidth: '100%',
                paginateElementsByHeight:9000
            },
            contentRendered: false,
            data:{
                rows:[],
                columns:[],
                title:[],
            },
        }
    },
    computed:{
        htmlToPdfOptions() {
            return {
                margin: 1,
                filename: "MemberListReport.pdf",
                enableLinks: true,
                pagebreak: { mode: ['avoid-all'] },
                html2canvas: {
                    useCORS: true,
                },
                jsPDF: {
                    unit: "in",
                    format: this.controlValue.pdfFormat,
                    orientation: this.controlValue.pdfOrientation,
                },
            };
        },
    },
    methods: {
        async generateStudentExamHistoryReport () {
            // this.$q.loading.show({
            //     message: `PDF generation is in progress. Hang on...`
            // })
          this.data.columns=[
            {
              name: "title",
              label: "Title",
              field: "title",
            },
            {
              name: "correct_answers",
              label: "correct_answers",
              field: "correct_answers",
            },
            {
              name: "partial_correct_answers",
              label: "partial_correct_answers",
              field: "partial_correct_answers",
            },
            {
              name: "negative_marks",
              label: "negative_marks",
              field: "negative_marks",

            },
            {
              name: "ranking",
              label: "ranking",
              field: "ranking",
            }
          ]
            const response = await api
                .get(`exam-markings?search=user_id${this.user_id}
                ${this.formData.course_id.length?";course_id:"+this.formData.course_id:""}
                include=examAttempt,examAttempt.exam&limit=${this.formData.limit?this.formData.limit:0}`)

            // this.data.rows = response.data.data;
            if(response.data.data.length>0){
                response.data.data.map(item=>{
                    this.data.rows.push({
                        title:item.examAttempt.data.exam.data.title,
                        correct_answers: item.correct_answers,
                        partial_correct_answers:item.partial_correct_answers,
                        marks:item.marks,
                        negative_marks:item.negative_marks,
                        time_needed: item.time_needed,
                        ranking:item.ranking
                    })
                })
                console.log(this.data.rows)
                this.data.title=`Student Exam History list Report`
                this.report=true;

            }

            // if (!(await this.validateControlValue())) return;
            // setTimeout(()=>{
            //     this.$refs.html2Pdf.generatePdf()
            //   },5000)
        },

        validateControlValue() {
            if (this.controlValue.pdfQuality > 2) {
                alert("pdf-quality value should only be 0 - 2");
                this.controlValue.pdfQuality = 2;
                return false;
            }

            // if (!this.controlValue.paginateElementsByHeight) {
            //   alert("paginate-elements-by-height value cannot be empty");
            //   this.controlValue.paginateElementsByHeight = 1400;
            //
            //   return false;
            // }

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
            console.log(`PDF generation progress: ${progress}%`)
        },

        startPagination() {
            console.log(`PDF has started pagination`);
            // const trElements = this.$el.querySelectorAll(".custom-table tbody tr");
            // let sum = 0;
            // for (let i = 0; i < trElements.length; i++) {
            //     const trHeight = trElements[i].offsetHeight;
            //     sum += trHeight;
            //     if (sum > 900) {
            //         console.log("Sum:",sum)
            //         trElements[i].classList.add('page-break')
            //         // console.log(trElements[i - 1].classList)
            //         sum = trHeight; // Reset sum for the next page
            //     }
            // }
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
            this.report=false
            // this.$q.loading.hide()
            // this.pdfDownloaded = true
            // console.log(blobPdf)
        },

        domRendered() {
            console.log("Dom Has Rendered");
            this.contentRendered = true;
            if (!(this.validateControlValue())) return;
            this.$refs.html2Pdf.generatePdf()
        },


    },

}






</script>

<style></style>
