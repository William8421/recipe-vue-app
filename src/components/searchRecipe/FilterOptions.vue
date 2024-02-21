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
export default {
  props: {
    options: Array as () => string[],
    modelValue: Array as () => string[],
  },
  emits: ["update:modelValue"],
  computed: {
    selectedOptions: {
      get() {
        return this.modelValue;
      },
      set(value: any) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>