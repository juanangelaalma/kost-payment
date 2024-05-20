<script setup>
import { ref } from "vue";

const username = localStorage.getItem("username");
const email = localStorage.getItem("email");

const handleLogout = () => {
  localStorage.clear();
  location.href = "/";
};
</script>

<template>
  <h1>User Profile</h1>
  <div class="profile-container">
    <img src="../components/icons/user.png" alt="User Profile" />
    <div class="user-data-container">
      <p>Nama: {{ username }}</p>
      <p>Email: {{ email }}</p>
      <button class="logout-button" @click="handleLogout">Log Out</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 2rem;
}
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 4rem 2rem;
}
.user-data-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
}
.user-data-container p {
  font-size: 1rem;
  border-bottom: 1px solid #e2dcdc;
  padding: 4px;
}
.logout-button {
  margin: 2rem 0;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #4894fe;
  color: white;
  border: none;
}
</style>
