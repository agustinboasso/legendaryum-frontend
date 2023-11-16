<template>
  <div>
    <h2>Welcome to the Metaverse Coin Collector!</h2>
    <RoomList :onRoomSelected="enterRoom" />
    <div v-if="selectedRoom">
      <CoinCollector :room="selectedRoom" />
    </div>
  </div>
</template>

<script>
import RoomList from "@/components/RoomList.vue";
import CoinCollector from "@/components/CoinCollector.vue";

export default {
  components: {
    RoomList,
    CoinCollector,
  },
  data() {
    return {
      selectedRoom: null,
    };
  },
  methods: {
    enterRoom(room) {
      this.selectedRoom = room;
    },
  },
};
</script>
