<template>
  <div v-if="show" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <slot></slot>
      <button class="custom-button" @click="closeModal">Done</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    closeModal: Function,
  },
};
</script>