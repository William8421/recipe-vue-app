<template>
  <div class="filters-modal">
    <div v-for="option in options" :key="option">
      <div class="check-box">
        <input
          type="checkbox"
          :id="option"
          :value="option"
          v-model="selectedOptions"
        />
        <label :for="option">{{ option }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface FilterOptionsProps {
  options: string[];
  modelValue: string[];
}

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<FilterOptionsProps["options"]>,
      required: true,
    },
    modelValue: {
      type: Array as PropType<FilterOptionsProps["modelValue"]>,
      required: true,
    },
  },
  computed: {
    selectedOptions: {
      get(): string[] {
        return this.modelValue;
      },
      set(value: string[]) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>