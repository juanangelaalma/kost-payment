<script setup>
import { ref } from "vue";
import bca from "../components/icons/bca.png";
import bri from "../components/icons/bri.png";
import mandiri from "../components/icons/mandiri.png";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();

const paymentOptions = ref([
  {
    name: "Bank Central Asia",
    image: bca,
    bankCode: "bca",
  },
  {
    name: "Bank Rakyat Indonesia",
    image: bri,
    bankCode: "bri",
  },
  {
    name: "Bank Nasional Indonesia",
    image: mandiri,
    bankCode: "bni",
  },
]);

const selectedOption = ref(null);
const buttonEnabled = ref(false);
const paymentMethod = ref(null);
const invoice = ref(null);

const handleRadio = () => {
  buttonEnabled.value = true;
  paymentMethod.value = selectedOption.value.bankCode;
  console.log(buttonEnabled.value);
  postOptions.body = JSON.stringify({
    paymentMethod: paymentMethod.value,
  });
};

const postOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
  },
  body: JSON.stringify({
    paymentMethod: paymentMethod.value,
  }),
};

const handleButton = () => {
  const url = `${apiUrl}/bills/${router.currentRoute.value.params.id}/pay`;
  fetch(url, postOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      invoice.value = data.data.invoice;
      console.log(invoice.value);
      router.push(`/payment/${invoice.value}`);
    })
    .catch((error) => console.error("Error:", error));
};
</script>

<template>
  <h1>Metode Pembayaran</h1>
  <h2>Transfer Bank</h2>
  <li v-for="(option, index) in paymentOptions" :key="index">
    <label class="payment-options">
      <input
        type="radio"
        :value="option"
        v-model="selectedOption"
        @change="handleRadio" />
      <img :src="option.image" alt="Bank Logo" />
      {{ option.name }}
    </label>
  </li>
  <div class="btn-container">
    <button :disabled="!buttonEnabled" @click="handleButton">Bayar</button>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
  margin: 3vh;
  font-weight: bold;
}
h2 {
  font-size: 1.2rem;
  margin: 3vh;
  font-weight: 500;
}
.payment-options {
  display: flex;
  align-items: center;
  margin: 1vh;
  padding: 20px 10px;
  gap: 10px;
  border-bottom: 1px solid #ccc;
}
li {
  list-style-type: none;
}

.btn-container {
  display: flex;
  justify-content: center;
}

button {
  padding: 1rem 1rem;
  border-radius: 5px;
  background-color: #4894fe;
  color: white;
  border: none;
  margin: 2vh 3vh;
  width: 50%;
  position: fixed;
  bottom: 0;
}

button:disabled {
  opacity: 0.3;
}
</style>
