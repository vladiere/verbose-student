import { defineStore } from 'pinia';

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socketId: '',
  }),
  getters: {
    getSocketId: (state) => state.socketId,
  },
  actions: {
    setSocketId(socketId: string) {
      this.socketId = socketId;
    },
    removeSocketId() {
      this.socketId = '';
    }
  },
  persist: {
    storage: sessionStorage,
  }
})
