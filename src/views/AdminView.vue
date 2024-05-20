<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import HelloUser from "@/components/HelloUser.vue";
import RentMainCard from "@/components/RentMainCard.vue";
import AdminRentCardList from "@/components/AdminRentCardList.vue";

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();

const totalUnpaidBills = ref(0);
const bills = ref([]);

const fetchBillCount = () => {
  const url = `${apiUrl}/admin/count-bills`;
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
      totalUnpaidBills.value = data.data.total;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

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
      console.log(bills.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const pushToAdminUser = () => {
  router.push("/users");
};

const pushToAdminRoom = () => {
  router.push("/rooms");
};

const pushToAdminBills = () => {
  router.push("/admin/bills");
};

fetchBillCount();
fetchBills();
</script>

<template>
  <HelloUser />
  <div class="button-container">
    <button @click="pushToAdminRoom">Kamar</button>
    <button @click="pushToAdminUser">User</button>
  </div>
  <RentMainCard
    :totalBills="totalUnpaidBills"
    message="Tagihan Belum Dibayar"
    @click="pushToAdminBills" />
  <AdminRentCardList
    v-for="bill in bills.slice(0, 3)"
    :key="bill.id"
    :month="bill.month"
    :total="bill.total"
    :status="bill.status"
    :roomCode="bill.roomCode"
    :id="bill.id" />
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  margin: 2rem;
}

button {
  background-color: #4894fe;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
</style>
