import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    id: 0,
    fullname: '',
    email: '',
    created_at: '',
    updated_at: '',
  }),
  getters: {
    getUserId: (state) => state.id,
  },
  actions: {
    setUserDetails(data) {
      this.id = data.id;
      this.fullname = data.fullname;
      this.email = data.email;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
    },
    clearUser() {
      this.id = 0;
      this.fullname = '';
      this.email = '';
      this.created_at = '';
      this.updated_at = '';
    },
  },
  persist: {
    storage: sessionStorage,
  },
})

export default useUserStore;
