<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const apiUrl = import.meta.env.VITE_API_URL;
const users = ref([]);
const showModal = ref(false);
const username = ref("");
const email = ref("");
const roomCode = ref("");
const password = ref("");
const startDate = new Date().toISOString().slice(0, 10);

const handleShowModal = () => {
  showModal.value = !showModal.value;
  console.log(showModal.value);
};

const fetchUsers = () => {
  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      "ngrok-skip-browser-warning": "Yes",
    },
  };
  const url = `${apiUrl}/admin/tenants`;
  fetch(url, getOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      users.value = data.data;
    })
    .catch((error) => console.error("Error:", error));
};

const handleAddUser = (event) => {
  event.preventDefault();
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      "ngrok-skip-browser-warning": "Yes",
    },
    body: JSON.stringify({
      email: email.value,
      name: username.value,
      password: password.value,
      roomCode: roomCode.value,
      startDate: startDate,
    }),
  };

  const url = `${apiUrl}/admin/tenants`;

  fetch(url, postOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      toast.success("User added successfully");
      fetchUsers();
    })
    .catch((error) => console.error("Error:", error));
};

const handleDeleteUser = (userId) => {
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      "ngrok-skip-browser-warning": "Yes",
    },
  };

  const url = `${apiUrl}/admin/tenants/${userId}`;

  fetch(url, deleteOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchUsers();
    })
    .catch((error) => console.error("Error:", error));
};

fetchUsers();
</script>

<template>
  <div class="header">
    <h1>Users List</h1>
    <button class="show-modal" @click="handleShowModal">Add User</button>
    <Modal :show="showModal" @close-modal="showModal = false">
      <form onsubmit="handleAddUser()">
        <label for="email">Email </label>
        <input type="text" v-model="email" placeholder="Email" />
        <label for="username">Username </label>
        <input type="text" v-model="username" placeholder="Username" />
        <label for="password">Password </label>
        <input type="text" v-model="password" placeholder="Password" />
        <label for="room-code">Ruangan </label>
        <input type="text" v-model="roomCode" placeholder="Kode Ruangan" />
      </form>
      <button class="add-user" @click="handleAddUser">Tambahkan</button>
    </Modal>
  </div>
  <div class="main-container">
    <div class="main-card-container" v-for="user in users" :key="user.id">
      <div>
        <p class="username">{{ user.name }}</p>
        <p>{{ user.email }}</p>
        <p>Ruang {{ user.roomCode }}</p>
      </div>
      <button class="delete-button" @click="handleDeleteUser(user.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 10px 20px;
}
.main-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 10px;
}

.main-card-container {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #aeaeae;
}

.main-card-container .username {
  font-weight: 600;
}
.delete-button {
  color: #ffffff;
  background-color: #ff3c3c;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 12px;
  margin: 16px 0px;
  border-radius: 6px;
}

.show-modal {
  margin: 10px 20px;
  padding: 10px;
  font-size: 14px;
  background-color: #4894fe;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}
form {
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
}
form label {
  display: inline-block;
  margin: 5px 0px;
  width: 90px;
}
form input {
  padding: 4px 4px;
  border: 1px solid #0f0f0f;
  border-radius: 3px;
}
.add-user {
  margin: 10px 0px;
  padding: 10px;
  font-size: 14px;
  background-color: #4894fe;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}
</style>
