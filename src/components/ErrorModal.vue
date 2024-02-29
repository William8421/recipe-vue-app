<template>
  <div>
    <div class="error-message">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    message: String,
  },
});
</script>