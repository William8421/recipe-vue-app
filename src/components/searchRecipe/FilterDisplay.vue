<template>
  <div v-if="items.length !== 0">
    <h4>{{ title }}:</h4>
    <div v-for="item in items" :key="item">
      <li>{{ item }}</li>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    title: String,
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
});
</script>