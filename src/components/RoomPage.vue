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
import { useCoinCollectorStore } from '../store/coinCollector'; 
import { SOCKET_SERVER_URL } from '../../configURL'
import { io } from 'socket.io-client';

export default {
  props: ['room'],
  setup(props) {
    const coinCollectorStore = useCoinCollectorStore();
    const coins = ref([]);
    const numberOfPeople = ref(0);
    const allCoinsCollected = ref(false);
    const socket = io(SOCKET_SERVER_URL);

    const grabCoin = async (coinId) => {
      try {
        await coinCollectorStore.grabCoin(coinId, props.room);
        const updatedCoins = coins.value.filter((coin) => coin.id !== coinId);
        coins.value = updatedCoins;
        socket.emit('coinGrabbed', { room: props.room, coinId });
        
      } catch (error) {
        console.error('Error al tomar la moneda:', error);
      }
    };

  onMounted(async () => {
    socket.connect()
    coinCollectorStore.fetchRooms();
    coins.value = await coinCollectorStore.fetchCoins(props.room);

    socket.emit('joinRoom', props.room);
    console.log(`'joined room', ${props.room}`)
    
    socket.on('coinsInRoom', (updatedCoins) => {
      coins.value = updatedCoins;
      console.log(`Monedas en la habitación ${props.room}:`, coins.value);
    });

    socket.on('peopleInRoom', (peopleCount) => {
      numberOfPeople.value = peopleCount;
      console.log('people', peopleCount)
    });

  
    socket.on('updateRoom', async ({ room }) => {
      if (room === props.room) {

        numberOfPeople.value = io.sockets.adapter.rooms[room].length;
        coins.value = await coinCollectorStore.fetchCoins(props.room);
      }
    });
  });

    watch(coinCollectorStore.coins, (newCoins) => {
      coins.value = newCoins;
      allCoinsCollected.value = newCoins.length === 0;

      if (allCoinsCollected.value) {
        setTimeout(async () => {
          coins.value = await coinCollectorStore.fetchCoins(props.room);
          allCoinsCollected.value = false;
        }, 3600000);
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
