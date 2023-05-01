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
    SET_CURRENT_USER() {
      this.currentUser = JSON.parse(localStorage.getItem("user-data"));
    },

    SET_AVATAR(avatar_url) {
      this.currentUser.avatar = avatar_url;
    },

    LOGOUT_CURRENT_USER() {
      this.currentUser = null;
    },
  },
});
