<script setup>
import { ref } from "vue";

defineProps(["totalBills", "message"]);

const date = new Date();
const slicedDate = date.toDateString().slice(4, 15);
</script>

<template>
  <div class="main-card">
    <p class="main-text">{{ totalBills }}</p>
    <p class="sub-text">{{ message }}</p>
    <p class="date-text">{{ slicedDate }}</p>
  </div>
</template>

<style scoped>
.main-card {
  background-color: #4894fe;
  margin: 3vh;
  padding: 18px;
  border-radius: 10px;
}
p {
  color: white;
}
.main-text {
  font-size: 1.5rem;
  font-weight: bold;
}
.sub-text {
  font-size: 1rem;
  border-bottom: 1px solid #fff;
  padding-bottom: 18px;
}
.date-text {
  font-size: 0.8rem;
  padding-top: 18px;
}
</style>
