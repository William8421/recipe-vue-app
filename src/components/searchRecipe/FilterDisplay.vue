<template>
  <div v-if="items.length !== 0">
    <h3>{{ title }}:</h3>
    <div class="selected-filters">
      <ul v-for="item in items" :key="item">
        <li>{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// functions from the Vue framework
import { defineComponent, PropType } from "vue";

export default defineComponent({
  // Props definition
  props: {
    // Prop for the title, expecting a String
    title: String,
    // Prop for the items, expecting an Array of strings and is required
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
});
</script>