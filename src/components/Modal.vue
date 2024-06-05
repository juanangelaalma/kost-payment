<script setup>
import { ref } from "vue";

const showModal = defineProps({
  show: Boolean,
});

console.log(showModal.show);
</script>

<template>
  <div class="modal" v-if="showModal.show">
    <div class="modal-content">
      <div class="button-container">
        <button class="close-modal" @click="$emit('close-modal')">X</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  min-width: 300px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.close-modal {
  color: #ffffff;
  background-color: #ff3c3c;
  font-size: 18px;
  font-weight: 600;
  border: none;
  padding: 5px;
  border-radius: 3px;
}

.close-modal:hover,
.close-modal:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-content p {
  font-size: 1rem;
  font-weight: bold;
  margin: 3vh;
}
</style>
