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
// functions from the Vue framework
import { defineComponent, PropType } from "vue";
// types
import { FilterOptionsProps } from "../../types/Types";

export default defineComponent({
  props: {
    // Prop for filter options, expecting an Array and is required
    options: {
      type: Array as PropType<FilterOptionsProps["options"]>,
      required: true,
    },
    // Prop for the selected options, expecting an Array and is required
    modelValue: {
      type: Array as PropType<FilterOptionsProps["modelValue"]>,
      required: true,
    },
  },
  // Computed property for managing selected options
  computed: {
    selectedOptions: {
      get(): string[] {
        return this.modelValue;
      },
      set(value: string[]) {
        // Emit an event to update the parent component's modelValue
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>