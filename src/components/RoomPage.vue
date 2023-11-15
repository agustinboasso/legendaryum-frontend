<template>
  <div>
    <h2>MONEDAS EN LA HABITACION</h2>
    <div class="room-info">
      <p>Personas conectadas: {{ numberOfPeople }}</p>
    </div>
    
    <div v-if="allCoinsCollected">
      <p>Todas las monedas han sido recogidas. Se regenerarán automáticamente después de una hora.</p>
    </div>
    <div class="coin-container">
      <div
        class="coin"
        v-for="coin in coins"
        :key="coin.id"
        @click="grabCoin(coin.id)"
        :style="{ top: coin.y + 'px', left: coin.x + 'px' }"
      >
        {{ coin.id }}
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';

export default {
  props: ['room'],
  setup(props) {
    const coins = ref([]);
    const numberOfPeople = ref(0);
    const allCoinsCollected = ref(false);
    const socket = io('http://localhost:3000');

    const grabCoin = (coinId) => {
      axios.post(`http://localhost:3000/api/grab/${coinId}`)
        .then(() => {
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
      socket.emit('joinRoom', props.room);

      socket.on('coinsInRoom', (updatedCoins) => {
        coins.value = updatedCoins;
      });

      socket.on('peopleInRoom', (peopleCount) => {
        numberOfPeople.value = peopleCount;
      });

      axios.get(`http://localhost:3000/api/coins/${props.room}`)
        .then((response) => {
          coins.value = response.data;
        })
        .catch((error) => {
          console.error('Error al obtener las monedas:', error);
        });
    });

    watch(coins, (newCoins) => {
      allCoinsCollected.value = newCoins.length === 0;

      if (allCoinsCollected.value) {
        // Configura un temporizador para regenerar las monedas después de una hora
        setTimeout(() => {
          axios.get(`http://localhost:3000/api/coins/${props.room}`)
            .then((response) => {
              coins.value = response.data;
              allCoinsCollected.value = false;
            })
            .catch((error) => {
              console.error('Error al regenerar las monedas:', error);
            });
        }, 3600000); // 3600000 milisegundos = 1 hora
      }
    });

    return { coins, grabCoin, numberOfPeople, allCoinsCollected };
  },
};
</script>

<style scoped>
.coin-container {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 20px auto;
  border: 2px solid #333;
  padding: 10px;
}

.coin {
  width: 50px;
  height: 50px;
  background-color: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.coin:hover {
  transform: scale(1.1);
  background-color: #ffea00;
}

.room-info {
  text-align: center;
  margin-bottom: 10px;
}
</style>
