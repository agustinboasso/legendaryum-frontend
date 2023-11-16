// coinCollector.js
import { defineStore } from "pinia";
import axios from "axios";

export const useCoinCollectorStore = defineStore("coinCollector", {
  state: () => ({
    rooms: [],
    selectedRoom: null,
    coins: [],
    numberOfPeople: 0,
    allCoinsCollected: false,
  }),

  actions: {
    async fetchRooms() {
      try {
        const response = await axios.get("http://localhost:3000/api/rooms");
        this.rooms = response.data;
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    },

    async fetchCoins(room) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/coins/${room}`,
        );
        this.coins = response.data;
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    },

    async grabCoin(coinId, room) {
      try {
        await axios.post(`http://localhost:3000/api/grab/${coinId}`);
        await this.fetchCoins(room);
      } catch (error) {
        console.error("Error grabbing coin:", error);
      }
    },
    
  },
});
