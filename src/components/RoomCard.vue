<script setup>
const rooms = defineProps({
  id: Number,
  code: String,
  available: Boolean,
});
</script>

<template>
  <div class="main-card-container">
    <div>
      <p>{{ code }}</p>
      <p v-if="available == true">Available: Yes</p>
      <p v-else>Available: No</p>
    </div>
    <button class="delete-button" @click="$emit('deleteRoom')">Delete</button>
  </div>
</template>

<style scoped>
.main-card-container {
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 2px 12px 20px #f2f4f7;
}
.delete-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5rem;
  cursor: pointer;
  margin: 12px 0;
  font-weight: 600;
}
</style>
