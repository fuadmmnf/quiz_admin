<template>
  <q-select
    filled
    options-dense
    v-model="model"
    :options="options"
    :label="label"
    color="teal"
    option-value="id"
    option-label="name"
    clearable
    @clear="model = null"
    options-selected-class="text-deep-orange"
  >
    <template v-slot:option="scope">
      <q-expansion-item
        dense
        expand-separator
        group="somegroup"
        :default-opened="hasChild(scope)"
        header-class="text-weight-bold"
        :label="scope.opt.name"
        @click="model = scope.opt"
      >
        <template v-for="child in scope.opt.children?.data" :key="child.id">
          <q-item
            dense
            clickable
            v-ripple
            v-close-popup
            map-options
            emit-value
            @click="model = child"
            :class="{ 'bg-light-blue-1': model?.id === child.id }"
          >
            <q-item-section>
              <q-item-label v-html="child.name" class="q-ml-md"></q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-expansion-item>
    </template>
  </q-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    initialValue: {
      default: null
    }
  },
  data() {
    return {
      model: this.initialValue,
    };
  },
  watch: {
    model(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.emitChange()
      }
    },
    initialValue(nVal, oVal){
      if(nVal === null){
        this.model = null
        return
      }

      let obj = this.options.reduce((acc, c) => {
        if(c.children?.data)
          return [...acc, c, ...c.children?.data]
        else return [...acc, c]
      }, []).find(c => c.id === nVal)
      console.log(obj)
      this.model = obj? obj: null
    }
  },
  methods: {
    hasChild (scope) {
      return scope.opt.children.data.some(c => c.id === this.model)
    },
    emitChange() {
      this.$emit('change', this.model);
    }
  },
};
</script>
