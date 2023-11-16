<template>
  <div class="coin-collector">
    <h1>Coin Collector App</h1>
    <div>
      <h2>HABITACIONES</h2>
      <h3>Para cambiar de habitación, refreseque la página</h3>

      <button v-for="room in rooms" :key="room" @click="enterRoom(room)">
        {{ room }}
      </button>
    </div>
    <div v-if="selectedRoom">
      <RoomPage :room="selectedRoom" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import RoomPage from "./RoomPage.vue";
import { useCoinCollectorStore } from "../store/coinCollector";
import axios from "axios";

export default {
  components: {
    RoomPage,
  },
  setup() {
    const coinCollectorStore = useCoinCollectorStore();
    const rooms = ref([]);
    const selectedRoom = ref(null);

    onMounted(async() => {
      axios
        await coinCollectorStore.fetchRooms();
      rooms.value = coinCollectorStore.rooms;

      rooms.value = ["sala1", "sala2"];
    });

    const enterRoom = (room) => {
      selectedRoom.value = room;
    };

    return { rooms, selectedRoom, enterRoom };
  },
};
</script>

<style scoped>
.coin-collector {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
}

h2 {
  margin-bottom: 20px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #45a049;
}

.coin-container {
  display: flex;
  flex-wrap: wrap;
}

.coin {
  width: 50px;
  height: 50px;
  background-color: #ffd700;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.coin:hover {
  transform: scale(1.1);
}

.coin-symbol {
  font-size: 1.5em;
}
</style>
