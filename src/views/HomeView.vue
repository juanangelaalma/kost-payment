<script setup>
import RentMainCard from "@/components/RentMainCard.vue";
import HelloUser from "@/components/HelloUser.vue";
import RentCardList from "@/components/RentCardList.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();

const totalBills = ref("");
const bills = ref([]);

const fetchTotalBills = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const url = `${apiUrl}/total-bills`;
  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email,
      password: password,
      "ngrok-skip-browser-warning": "Yes",
    },
  };

  fetch(url, getOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      totalBills.value = data.data.total;
    })
    .catch((error) => console.error("Error:", error));
};

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

fetchTotalBills();
fetchBills();

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

const pushBills = () => {
  router.push("/bills");
};
</script>

<template>
  <div>
    <HelloUser />
    <RentMainCard
      :total-bills="totalBills"
      :message="'Total Tagihan'"
      @click="pushBills" />
    <p>Riwayat pembayaran</p>
    <RentCardList
      v-for="bill in bills.slice(0, 3)"
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
p {
  font-size: 1rem;
  font-weight: bold;
  margin: 3vh;
}
</style>
