import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
  }),

  getters: {
    GET_CURRENT_USER() {
      return this.currentUser;
    },
  },

  actions: {
    SET_CURRENT_USER(currentUser) {
      this.currentUser = currentUser;
    },

    LOGOUT_CURRENT_USER() {
      this.currentUser = null;
    },
  },
});
