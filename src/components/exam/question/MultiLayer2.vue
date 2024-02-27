<template>
  <div class="q-page q-pa-md flex justify-center items-center">
    <div>
      <q-card class="my-card" style="width: 100%; max-width: 1000px">
        <q-card-section>
          <div class="text-subtitle2" v-html="question.content"></div>
        </q-card-section>

        <q-card-actions align="center" vertical>
          <div class="q-pa-md" style="width: 100%; max-width: 1000px">
            <div>
              <q-tabs
                v-model="tab"
                active-color="primary"
                align="justify"
                class="text-grey"
                dense
                indicator-color="primary"
                narrow-indicator
              >
                <q-tab label="Questions" name="questions" />
                <q-tab label="Hints" name="hints" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="questions">
                  <div style="display: flex; flex-direction: column">
                    <div
                      v-for="(option, index) in opts"
                      :key="option.id"
                      class="option-container"
                    >
                      <!--                      <input-->
                      <!--                        id=""-->
                      <!--                        :checked="-->
                      <!--                          store.checkIfOptionSelected(question.id, option.id)-->
                      <!--                        "-->
                      <!--                        type="radio"-->
                      <!--                        @click="toggleAnswer(option)"-->
                      <!--                      />-->
                      <q-avatar
                        :color="
                          getOptionAnnotationColor(
                            option,
                            store.checkIfOptionSelected(question.id, option.id)
                          )
                        "
                        style="border: 1px solid #000"
                        text-color="black"
                        class="smaller-avatar"
                        @click="toggleAnswer(option)"
                      >
                        {{ String.fromCharCode(65 + index) }}
                      </q-avatar>
                      <label
                        class="option-label"
                        @click="toggleAnswer(option)"
                        >{{ option.content }}</label
                      >
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="hints">
                  <q-stepper
                    v-model="currentHintLevelIndex"
                    animated
                    color="primary"
                    vertical
                  >
                    <q-step
                      v-for="(hint, index) in hints"
                      :key="hint.id"
                      :name="index + 1"
                      :title="`Hint #${index + 1} (Penalty: ${
                        hint.negative_mark
                      } pts)`"
                      :val="`hint ${index + 1}`"
                      icon=""
                      @click="
                        () => {
                          if (index <= lastShownHintIndex) {
                            currentHintLevelIndex = index;
                          }
                        }
                      "
                    >
                      <q-stepper-navigation>
                        <q-btn
                          v-if="
                            index === lastShownHintIndex &&
                            index !== hints.length - 1
                          "
                          color="primary"
                          label="Next"
                          @click="
                            () => {
                              if (index === lastShownHintIndex) {
                                lastShownHintIndex += 1;

                                setMultilayerType2Answer();
                              }

                              if (index < hints.length - 1) {
                                currentHintLevelIndex += 1;
                              }
                            }
                          "
                        />
                        <q-btn
                          v-if="index > 0"
                          class="q-ml-sm"
                          color="primary"
                          flat
                          label="Back"
                          @click="
                            currentHintLevelIndex = currentHintLevelIndex - 1
                          "
                        />
                      </q-stepper-navigation>
                    </q-step>
                  </q-stepper>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MultiLayer2",

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
  setup(props) {
    const store = useExamStore();
    const step = ref(1);
    const tab = ref("questions");
    const hints = ref([]);
    const opts = ref([]);
    const startShowingHints = ref(false);
    const currentHintLevelIndex = ref(0);
    const lastShownHintIndex = ref(0);
    const selectedOption = ref(null);

    function organize() {
      hints.value = props.question.options.data.filter((o) => o.is_hint);
      opts.value = props.question.options.data.filter((o) => !o.is_hint);

      const contextData = store.getAnswers(props.question.id);
      if (contextData.length > 0) {
        const hintAnswerModel = contextData.find(
          (element) => element.content === "hint"
        );
        if (hintAnswerModel !== undefined) {
          startShowingHints.value = true;
          lastShownHintIndex.value = hints.value.findIndex(
            (element) => element.id === hintAnswerModel.id
          );
        }
        const optionAnswerModel = contextData.find(
          (element) => element.content !== "hint"
        );
        if (optionAnswerModel !== undefined) {
          selectedOption.value = opts.value.find(
            (element) => element.id === optionAnswerModel.option_id
          );
        }
      }
    }

    onMounted(() => {
      // console.log(tableRefs.value[tab.value]);
      organize();
    });

    watch(tab, (newTab, oldTab) => {
      if (newTab !== oldTab && !startShowingHints.value) {
        startShowingHints.value = true;
        setMultilayerType2Answer();
      }
    });

    function setMultilayerType2Answer() {
      store.clearAnswer(props.question.id);
      if (selectedOption.value !== null) {
        store.addAnswer({
          question_id: props.question.id,
          option_id: selectedOption.value.id,
          content: null,
        });
      }
      if (startShowingHints.value) {
        store.addAnswer({
          question_id: props.question.id,
          option_id: hints.value[lastShownHintIndex.value].id,
          content: "hint",
        });
      }
    }

    // function toggleAnswer(option) {
    //   if (
    //     option.answer !== undefined ||
    //     (!this.store.examConfig.data.can_change_answer &&
    //       this.store
    //         .getAnswers(this.question.id)
    //         .filter((a) => a.content !== "hint").length > 0)
    //   ) {
    //     return;
    //   }
    //
    //   if (this.store.checkIfOptionSelected(this.question.id, option.id)) {
    //     this.selectedOption = null;
    //     this.store.clearAnswer(this.question.id);
    //   } else {
    //     this.selectedOption = option;
    //     setMultilayerType2Answer();
    //   }
    //
    //   // TODO emit signal for onAnswerChange + signalParent
    //
    //   // Emit the selected answers array
    //   // this.$emit("answer-selected", {
    //   //   q_id: this.question.id,
    //   //   answers: [this.selectedAnswers],
    //   // });
    // }

    return {
      store,
      step,
      tab,
      opts,
      hints,
      selectedOption,
      startShowingHints,
      lastShownHintIndex,
      currentHintLevelIndex,
      setMultilayerType2Answer,
      // toggleAnswer,
    };
  },
  methods: {
    getOptionAnnotationColor(option, isSelected) {
      const route = useRoute();

      if (
        !this.showAnswer ||
        option.is_correct === undefined ||
        route.name === "exam-attempt"
      ) {
        return isSelected ? "blue" : "white";
      }

      return isSelected
        ? option.is_correct
          ? "green"
          : "red"
        : option.is_correct
        ? "indigo"
        : "white";
    },

    toggleAnswer(option) {
      if (this.showAnswer && option.answer !== undefined) {
        return;
      }

      if (this.store.checkIfOptionSelected(this.question.id, option.id)) {
        if (this.store.examConfig.data.can_change_answer) {
          this.store.removeAnswer(this.question.id, option.id);
        }
      } else {
        this.store.addAnswer({
          question_id: this.question.id,
          option_id: option.id,
          content: null,
        });
      }

      // TODO emit signal for onAnswerChange + signalParent

      // Emit the selected answers array
      // this.$emit("answer-selected", {
      //   q_id: this.question.id,
      //   answers: [this.selectedAnswers],
      // });
    },
  },
});
</script>

<style>
.option-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 8px; /* Adjust this value to control the spacing between options */
}

.option-label {
  margin-left: 12px; /* Adjust this value to control the spacing between the radio button and label */
  text-align: left;
}
</style>
