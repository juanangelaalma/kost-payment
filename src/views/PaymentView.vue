<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;

const paymentData = ref({});
const bankLogo = ref("");
const vaNumber = ref("");
const deadline = ref("");

const getOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
    "ngrok-skip-browser-warning": "Yes",
  },
};

const fetchPayment = () => {
  const url = `${apiUrl}/payments/${router.currentRoute.value.params.invoice}`;
  fetch(url, getOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      paymentData.value = data.data;
      bankLogo.value = data.data.payment.logo;
      vaNumber.value = data.data.payment.vaNumber;
      deadline.value = data.data.deadline;
    })
    .catch((error) => console.error("Error:", error));
};

fetchPayment();

const reactiveCountdownTimer = setInterval(() => {
  let countDownDate = new Date(paymentData.value.deadline).getTime();
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  deadline.value = `${days}h ${hours}:${minutes}:${seconds}`;
});

reactiveCountdownTimer;

const handleCopyButton = () => {
  navigator.clipboard.writeText(paymentData.value.payment.vaNumber);
  toast("Nomor Va Berhasil disalin", {
    theme: "colored",
    type: "success",
    dangerouslyHTMLString: true,
    position: toast.POSITION.BOTTOM_LEFT,
    toastStyle: {
      fontFamily: "Poppins",
    },
  });
};
</script>

<template>
  <div class="top-text-container">
    <div class="top-left-text-container">
      <p class="batas-waktu">Batas waktu pembayaran</p>
      <p class="time-limit">{{ paymentData.formattedDeadline }}</p>
    </div>
    <div class="top-right-text-container">
      <p class="payment-status" v-if="paymentData.status == 'paid'">
        Pembayaran Sukses
      </p>
      <p class="countdown" v-else-if="deadline != 'NaNh NaN:NaN:NaN'">
        {{ deadline }}
      </p>
      <p class="top-right-loading" v-else>Loading...</p>
    </div>
  </div>
  <div class="main-container">
    <div class="sub-container">
      <p>Transfer Bank</p>
      <img :src="bankLogo" alt="Bank Logo" />
    </div>
    <div class="details-container">
      <div class="details-sub-container">
        <p>Pembayaran kost</p>
        <p class="no-rek">{{ vaNumber }}</p>
      </div>
      <button @click="handleCopyButton">Salin</button>
    </div>
    <div>
      <p>Total Pembayaran</p>
      <p>{{ paymentData.amount }}</p>
    </div>
    <button class="status-button" @click="fetchPayment">Cek status</button>
  </div>
</template>

<style scoped>
.top-text-container {
  margin: 3vh;
  display: flex;
  justify-content: space-between;
}
.batas-waktu {
  font-size: 14px;
}
.time-limit {
  font-size: 15px;
  font-weight: 600;
}
.countdown {
  font-size: 14px;
  font-weight: 600;
  width: 100px;
  text-align: right;
}
.payment-status {
  font-size: 14px;
  font-weight: 600;
  color: #4894fe;
  text-align: right;
}
.top-right-loading {
  font-size: 14px;
  font-weight: 600;
  width: 100px;
  text-align: right;
}
.main-container {
  margin: 3vh;
}
.sub-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vh;
}

.sub-container img {
  width: 50px;
  height: 50px;
}

.details-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vh;
  background-color: #f5f5f5;
  padding: 0.7rem 1rem;
}
.details-sub-container .no-rek {
  font-size: 18px;
  font-weight: 500;
}

.details-container button {
  padding: 0.3rem 1rem;
  border-radius: 15px;
  border: 1px solid #4894fe;
  color: #4894fe;
  background-color: white;
  font-size: 12px;
}
.status-button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #4894fe;
  color: white;
  border: none;
  width: 100%;
  margin: 3vh 0;
}

.no-rek {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1.5px;
}
</style>
