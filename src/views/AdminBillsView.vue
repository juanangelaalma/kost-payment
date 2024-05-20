<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminRentCardList from "@/components/AdminRentCardList.vue";

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();

const bills = ref([]);

const fetchBills = () => {
  const url = `${apiUrl}/admin/bills`;
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
      bills.value = data.data.bills;
    })
    .catch((error) => console.error("Error:", error));
};

fetchBills();
</script>

<template>
  <div class="main-container">
    <p class="title">Daftar Tagihan</p>
    <AdminRentCardList
      v-for="bill in bills"
      :key="bill.id"
      :month="bill.month"
      :total="bill.total"
      :status="bill.status"
      :roomCode="bill.roomCode"
      :id="bill.id" />
  </div>
</template>

<style scoped>
.title {
  font-size: 18px;
  font-weight: 600;
  margin: 16px;
}
</style>
