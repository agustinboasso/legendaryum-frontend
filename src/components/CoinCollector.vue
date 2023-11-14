<template>
  <div>
    <h1>Coin Collector App</h1>
    <div>
      <h2>Rooms</h2>
      <ul>
        <li v-for="room in rooms" :key="room" @click="enterRoom(room)">
          {{ room }}
        </li>
      </ul>
    </div>
    <div v-if="selectedRoom">
      <Room :room="selectedRoom" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import RoomPage from './RoomPage.vue'; // Ajusta la ruta según tu estructura de archivos

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
      // axios.get('http://localhost:3000/api/rooms')
      //   .then(response => {
      //     rooms.value = response.data;
      //   })
      //   .catch(error => {
      //     console.error('Error al obtener las habitaciones:', error);
      //   });

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
