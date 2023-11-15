<template>
  <div class="coin-collector">
    <h1>Coin Collector App</h1>
    <div >
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
import { ref, onMounted } from 'vue';
import RoomPage from './RoomPage.vue'; 
import axios from 'axios';

export default {
  components: {
    
    RoomPage,
  },
  setup() {
    const rooms = ref([]);
    const selectedRoom = ref(null);

    onMounted(() => {
      
      axios.get('http://localhost:3000/api/rooms')
        .then(response => {
          rooms.value = response.data;
        })
        .catch(error => {
          console.error('Error al obtener las habitaciones:', error);
        });

      
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

h1 {
  text-align: center;
  color: #333; /* Puedes ajustar el color según tu preferencia */
}

h2 {
  margin-bottom: 20px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #4caf50; /* Color de fondo del botón */
  color: white; /* Color del texto del botón */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #45a049; /* Cambia el color de fondo al pasar el ratón sobre el botón */
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
