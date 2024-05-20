<script setup>
import RoomCard from "@/components/RoomCard.vue";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const rooms = ref([]);
const showModal = ref(false);
const roomCode = ref("");

const apiUrl = import.meta.env.VITE_API_URL;
const getOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
    "ngrok-skip-browser-warning": "Yes",
  },
};

const fetchRooms = () => {
  const url = `${apiUrl}/admin/rooms`;
  fetch(url, getOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      rooms.value = data.data;
    })
    .catch((error) => console.error("Error:", error));
};

const handleShowModal = () => {
  showModal.value = !showModal.value;
  console.log(showModal.value);
};

const handleAddRoom = (event) => {
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
      code: roomCode.value,
    }),
  };

  const url = `${apiUrl}/admin/rooms`;

  fetch(url, postOptions)
    .then((response) => {
      console.log(response.status);
      if (response.status == 400) toast.error("Gagal menambahkan ruangan");
      else return response.json();
    })
    .then((data) => {
      console.log(data);
      toast.success("Ruangan ditambahkan");
      fetchRooms();
      handleShowModal();
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error("Failed to add room");
    });
};

const handleDeleteRoom = (roomId) => {
  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      "ngrok-skip-browser-warning": "Yes",
    },
  };

  const url = `${apiUrl}/admin/rooms/${roomId}`;

  fetch(url, deleteOptions)
    .then((response) => {
      console.log(response.status);
      if (response.status == 400) toast.error("Gagal menghapus ruangan");
      else return response.json();
    })
    .then((data) => {
      console.log(data);
      toast.success("Ruangan dihapus");
      fetchRooms();
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error("Gagal menghapus ruangan");
    });
};

fetchRooms();
</script>

<template>
  <div class="header-area">
    <p>Admin Room View</p>
    <button @click="handleShowModal" class="show-modal">Add Room</button>
  </div>
  <Modal :show="showModal" @close-modal="showModal = false">
    <form onsubmit="handleAddRoom()" class="room-form">
      <label for="room-code"
        >Room Code
        <input type="text" v-model="roomCode" placeholder="Room Code"
      /></label>
      <button @click="handleAddRoom">Add Room</button>
    </form>
  </Modal>
  <RoomCard
    v-for="room in rooms"
    :code="room.code"
    :available="room.available"
    @deleteRoom="handleDeleteRoom(room.id)" />
</template>

<style scoped>
.header-area p {
  margin: 2rem;
  font-size: 18px;
}

.room-form {
  margin: 10px;
  font-size: 18px;
}

.room-form input {
  padding: 4px;
  width: 100%;
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

.room-form button {
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
