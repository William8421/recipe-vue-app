<template>
  <div v-if="show" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ header }}</h2>
      <slot></slot>
      <button class="custom-button" @click="closeModal">{{ close }}</button>
    </div>
  </div>
</template>

<script lang="ts">
// functions from the Vue framework
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // Prop for controlling modal visibility, expecting a Boolean
    show: Boolean,
    // Prop for the function to close the modal, expecting a Function
    closeModal: Function,
    header: String,
    close: String,
  },
});
</script>