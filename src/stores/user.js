import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    files: 'wtf',
  }),

  getters: {
    GET_CURRENT_USER() {
      return this.currentUser
    },
  },

  actions: {
    SET_CURRENT_USER() {
      this.currentUser = JSON.parse(localStorage.getItem('user-data'))
    },

    LOGOUT_CURRENT_USER() {
      this.currentUser = null
    },
  },
})
