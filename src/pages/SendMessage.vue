<template>
  <q-page class="q-pa-sm">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-indigo-8">
          Send Message
          <div class="text-subtitle2">Mail to all or specific user</div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Send" icon="send" />
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced />
    <div class="q-pa-none">
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-card class="no-shadow" bordered>
            <q-card-section class="row items-center justify-between">
              <div class="text-h6">Receiver Configuration</div>
            </q-card-section>
            <q-card-section>
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="receiverOption" val="all" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>All Users</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio
                      v-model="receiverOption"
                      val="custom"
                      color="orange"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Custom Users</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="receiverOption" val="examWise" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Exam Wise</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="receiverOption" val="courseWise" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Course Wise</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-if="receiverOption === 'custom'">
                <q-select
                  filled
                  v-model="modelMultiple"
                  input-debounce="0"
                  multiple
                  :options="options"
                  use-chips
                  stack-label
                  use-input
                  @filter="filterFn"
                  label="Select Users"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-badge color="secondary" class="q-mb-md">
                  Selected: {{ modelMultiple || "[]" }}
                </q-badge>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6">

         <q-card class="no-shadow" bordered>
           <q-card-section class="">
             <div class="text-h6">Message Content</div>
             <q-list class="row q-mt-md">
               <q-item tag="label" v-ripple>
                 <q-item-section avatar>
                   <q-radio  val="push" />
                 </q-item-section>
                 <q-item-section>
                   <q-item-label>Push Notification</q-item-label>
                 </q-item-section>
               </q-item>

               <q-item tag="label" v-ripple>
                 <q-item-section avatar>
                   <q-radio
                     val="custom"
                   />
                 </q-item-section>
                 <q-item-section>
                   <q-item-label>Custom Message</q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>
           </q-card-section>
           <q-card-section>
             <q-input
               filled

               type="textarea"
               label="Write your message here"
               rows="4"

             />
           </q-card-section>
         </q-card>

<!--          <q-card class="no-shadow" bordered>-->
<!--            <q-card-section class="row items-center justify-between">-->
<!--              <div class="text-h6">Template Configuration</div>-->
<!--            </q-card-section>-->
<!--            <q-card-section>-->
<!--              <q-select-->
<!--                filled-->
<!--                v-model="model"-->
<!--                use-input-->
<!--                input-debounce="0"-->
<!--                label="Select template"-->
<!--                :options="templatesOptions"-->
<!--                @filter="filterTemplateFn"-->
<!--                behavior="menu"-->
<!--              >-->
<!--                <template v-slot:no-option>-->
<!--                  <q-item>-->
<!--                    <q-item-section class="text-grey">-->
<!--                      No results-->
<!--                    </q-item-section>-->
<!--                  </q-item>-->
<!--                </template>-->
<!--              </q-select>-->
<!--            </q-card-section>-->
<!--            <q-card-section v-if="model">-->
<!--              <div class="text-subtitle2 q-mb-md">-->
<!--                SMS template : {{ model }}-->
<!--              </div>-->
<!--              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,-->
<!--              quia atque recusandae inventore totam ut perferendis, sit ipsam-->
<!--              nisi aut accusantium tempora, reprehenderit consequuntur animi-->
<!--              excepturi quo voluptatem. In, voluptatem?-->

<!--              <q-separator class="q-my-md" />-->
<!--              <div class="row">-->
<!--                <q-btn-->
<!--                  color="primary"-->
<!--                  label="Send"-->
<!--                  icon="send"-->
<!--                  @click="onSend()"-->
<!--                />-->
<!--                <q-btn-->
<!--                  label="Clear"-->
<!--                  color="primary"-->
<!--                  class="q-ml-sm"-->
<!--                  @click="model = null"-->
<!--                />-->
<!--              </div>-->
<!--            </q-card-section>-->

<!--          </q-card>-->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

const stringOptions = ["Sultana", "Marjan", "Mitu"];
const stringTemplatesOptions = ["Simple", "Dynamic", "Email type"];


export default {
  setup() {
    const options = ref(stringOptions);
    const templatesOptions = ref(stringTemplatesOptions);

    return {
      receiverOption: ref("all"),
      modelMultiple: ref([]),
      stringOptions,
      options,

      model: ref(null),
      templatesOptions,
      stringTemplatesOptions,
      filterTemplateFn(val, update) {
        if (val === "") {
          update(() => {
            templatesOptions.value = stringTemplatesOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          templatesOptions.value = stringTemplatesOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },


      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options.value = stringOptions;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
  methods: {
    onSend() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to send this message?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log(">>>> OK");
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        });
    },
  },
};
</script>
