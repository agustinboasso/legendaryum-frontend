<template>
  <div>
    <h2>Moneda Única por Room con Temporizador</h2>
    <div v-for="coin in coins" :key="coin.id" @click="grabCoin(coin.id)">
      {{ coin.id }} - ({{ coin.x }}, {{ coin.y }}, {{ coin.z }})
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';

export default {
  props: ['room'],
  setup(props) {
    const coins = ref([]);
    const socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor Socket.io

    const grabCoin = (coinId) => {
      // Lógica para tomar la moneda y notificar al servidor
      axios.post(`http://localhost:3000/api/grab/${coinId}`)
        .then(() => {
          // Actualizar las monedas después de tomar una
          axios.get(`http://localhost:3000/api/coins/${props.room}`)
            .then((response) => {
              coins.value = response.data;
            })
            .catch((error) => {
              console.error('Error al obtener las monedas:', error);
            });
        })
        .catch((error) => {
          console.error('Error al tomar la moneda:', error);
        });
    };

    onMounted(() => {
      // Unirse a la sala específica
      socket.emit('joinRoom', props.room);

      // Escuchar eventos de actualización de monedas en la sala
      socket.on('coinsInRoom', (updatedCoins) => {
        coins.value = updatedCoins;
      });

      // Lógica para obtener las monedas de la sala desde el servidor
      axios.get(`http://localhost:3000/api/coins/${props.room}`)
        .then((response) => {
          coins.value = response.data;
        })
        .catch((error) => {
          console.error('Error al obtener las monedas:', error);
        });
    });

    return { coins, grabCoin };
  },
};
</script>
