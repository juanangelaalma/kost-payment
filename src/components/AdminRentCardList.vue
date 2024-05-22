<script setup>
const bill = defineProps({
  month: String,
  total: String,
  status: String,
  roomCode: String,
  year: String,
  id: Number,
});
</script>

<template>
  <div class="rent-cards">
    <img src="./icons/blue-calendar.png" alt="" />
    <div>
      <p class="month-text">{{ bill.month }}</p>
      <p class="price-text">{{ bill.total }}</p>
    </div>
    <div class="button-status">
      <div class="room">{{ bill.roomCode }}</div>
      <p class="paid" v-if="bill.status == 'paid'">Terbayar</p>
      <p class="pending" v-else-if="bill.status == 'pending'">Pending</p>
    </div>
  </div>
</template>

<style scoped>
.rent-cards {
  box-shadow: 2px 12px 20px #f2f4f7;
  margin: 3vh;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.month-text {
  font-size: 1.2rem;
  font-weight: bold;
}
.price-text {
  font-size: 1rem;
  color: #8696bb;
}
.button-status {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #4894fe;
  color: white;
  border: none;
}
.paid {
  color: #4caf50;
  font-size: 14px;
}
.pending {
  color: #ff9800;
  font-size: 14px;
}

.room {
  font-size: 1rem;
  color: white;
  font-weight: 600;
  background-color: #4894fe;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}
</style>
