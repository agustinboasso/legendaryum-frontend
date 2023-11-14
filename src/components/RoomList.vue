<template>
  <div>
    <h2>Rooms</h2>
    <ul>
      <li v-for="room in rooms" :key="room" @click="enterRoom(room)">
        {{ room }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';

export default {
  props: ['onRoomSelected'],
  setup(props) {
    const rooms = ref([]);
    const socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor Socket.io

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

      // Escuchar eventos de actualización de habitaciones en tiempo real
      socket.on('roomListUpdated', updatedRooms => {
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
