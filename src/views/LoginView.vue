<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const apiUrl = import.meta.env.VITE_API_URL;
const router = useRouter();

const email = defineModel();
const password = defineModel("password");

toast.warning("Silahkan login terlebih dahulu");

const login = () => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  };

  console.log(email);

  const url = `${apiUrl}/login`;

  fetch(url, postOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("username", data.data.name);
      localStorage.setItem("password", data.data.password);
      localStorage.setItem("role", data.data.role);
      console.log(localStorage.getItem("role"));
      if (localStorage.getItem("role") === "tenant") {
        router.push("/");
      } else if (localStorage.getItem("role") === "admin") {
        router.push("/admin");
        console.log("masuk");
      } else {
        toast.error("Email atau password salah");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error("Email atau password salah");
    });
};

const togglePassword = () => {
  hidePassword.value = !hidePassword.value;
};
</script>

<template>
  <div class="main-container">
    <div class="text-container">
      <p>Selamat datang di</p>
      <h1>Pembayaran Kost</h1>
    </div>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" v-model="email" placeholder="Email" />
      <label for="password">Password</label>
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
}

.text-container {
  display: flex;
  flex-direction: column;
  margin: 1rem 2.5rem;
}

h1 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 80%;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #4894fe;
  color: white;
  border: none;
  margin-top: 2.5rem;
}
button:hover {
  background-color: #307bcb;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form label {
  width: 100%;
  padding: 0.5rem 2.6rem;
}
</style>
