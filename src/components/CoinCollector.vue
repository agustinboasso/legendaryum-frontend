<template>
  <div class="coin-collector">
    <h1>Coin Collector App</h1>
    <div class="coin-container">
      <h2>HABITACIONES</h2>
      <ul>
        <li v-for="room in rooms" :key="room" @click="enterRoom(room)">
          {{ room }}
        </li>
      </ul>
    </div>
    <div v-if="selectedRoom">
      <RoomPage :room="selectedRoom" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import RoomPage from './RoomPage.vue'; // Ajusta la ruta según tu estructura de archivos
import axios from 'axios';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    RoomPage,
  },
  setup() {
    const rooms = ref([]);
    const selectedRoom = ref(null);

    onMounted(() => {
      // Lógica para obtener la lista de habitaciones desde el servidor
      // Asume que tienes un endpoint en el backend que devuelve la lista de habitaciones
      // Ejemplo con axios:
      axios.get('http://localhost:3000/api/rooms')
        .then(response => {
          rooms.value = response.data;
        })
        .catch(error => {
          console.error('Error al obtener las habitaciones:', error);
        });

      // Como ejemplo, inicializamos las habitaciones manualmente
      rooms.value = ['sala1', 'sala2', 'sala3'];
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

h2 {
  margin-bottom: 20px;
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