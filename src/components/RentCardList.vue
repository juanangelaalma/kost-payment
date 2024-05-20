<script setup>
const bill = defineProps({
  month: String,
  amount: String,
  status: String,
  id: Number,
});

const emits = defineEmits(["push-payment"]);
console.log(bill);

const pushPayment = () => {
  const billId = bill.id;
  console.log(billId);
  emits("push-payment", billId);
};
</script>

<template>
  <div class="rent-cards">
    <img src="./icons/blue-calendar.png" alt="" />
    <div>
      <p class="month-text">{{ bill.month }}</p>
      <p class="price-text">{{ bill.amount }}</p>
    </div>
    <div class="button-status">
      <p class="paid" v-if="bill.status == 'paid'">Terbayar</p>
      <p class="pending" v-else-if="bill.status == 'pending'">Pending</p>
      <button v-else @click="pushPayment">Bayar</button>
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
</style>
