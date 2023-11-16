<template>
  <div>
    <button class="common-button" v-if="rooms.length === 1" @click="enterRoom(rooms[0])">
      {{ rooms[0] }}
    </button>

    <button class="common-button" v-else-if="rooms.length > 1" @click="enterRoom('Selecciona una sala')">
      Ir a las habitaciones
    </button>

    <p class="common-text" v-else>No hay habitaciones disponibles.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useCoinCollectorStore } from '../store/coinCollector'; 
import { io } from 'socket.io-client';
import { SOCKET_SERVER_URL } from '../../configURL'

export default {
  props: ['onRoomSelected'],
  setup(props) {
    const coinCollectorStore = useCoinCollectorStore();
    const rooms = ref([]);
    const socket = io(SOCKET_SERVER_URL);

   onMounted(async () => {
      
      await coinCollectorStore.fetchRooms();
      rooms.value = coinCollectorStore.rooms;

      socket.on('roomListUpdated', (updatedRooms) => {
        rooms.value = updatedRooms;
      });
    });

    const enterRoom = (room) => {
      props.onRoomSelected(room);
    };

    return { rooms, enterRoom };
  },
};
</script>

<style scoped>

.common-button {
  display: block;
  width: 150px;
  height: 30px; 
  margin: 0 auto; 
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.common-button:hover {
  background-color: #45a049;
}


</style>