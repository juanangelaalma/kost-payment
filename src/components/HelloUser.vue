<script setup>
// import UserIcon from "./icons/user.png";
import { useRouter } from "vue-router";

const router = useRouter();
const username = localStorage.getItem("username");
</script>

<template>
  <div class="main-container">
    <p class="hello-user">Hello, {{ username }}</p>
    <div class="user-icon" @click="router.push('/profile')">
      <img src="./icons/user.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
}
.user-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
}
img {
  width: 100%;
  margin: auto;
}
.hello-user {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
