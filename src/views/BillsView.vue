<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import RentCardList from "@/components/RentCardList.vue";

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();

const bills = ref([]);

const fetchBills = () => {
  const url = `${apiUrl}/bills`;
  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      "ngrok-skip-browser-warning": "Yes",
    },
  };
  fetch(url, getOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      bills.value = data.data;
    })
    .catch((error) => console.error("Error:", error));
};

const handleCardClick = (billstat, billInv, billId) => {
  if (billstat === "paid" || billstat === "pending") {
    pushPaymentDetails(billInv);
  } else {
    pushPayment(billId);
  }
};

const pushPaymentDetails = (billInv) => {
  router.push(`/payment/${billInv}`);
};

const pushPayment = (billId) => {
  router.push(`/payment-options/${billId}`);
};

fetchBills();
</script>

<template>
  <div class="main-container">
    <p class="title">Daftar Tagihan</p>
    <RentCardList
      v-for="bill in bills"
      :key="bill.id"
      :month="bill.month"
      :amount="bill.amount"
      :status="bill.status"
      :id="bill.id"
      @push-payment="pushPayment"
      @click="handleCardClick(bill.status, bill.invoice, bill.id)" />
  </div>
</template>

<style scoped>
.title {
  font-size: 18px;
  font-weight: 600;
  margin: 16px;
}
</style>
