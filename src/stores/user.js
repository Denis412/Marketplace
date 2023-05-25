import { defineStore } from "pinia";
import { convertSubject } from "src/utils/convertSubject";

import UserService from "src/sevices/UserService";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
    currentSpaceSubject: null,
    files: "wtf",
  }),

  getters: {
    GET_CURRENT_USER() {
      return this.currentUser;
    },
  },

  actions: {
    async FETCH_CURRENT_USER() {
      this.currentUser = await UserService.fetchCurrentUser();
    },

    async FETCH_CURRENT_SPACE_SUBJECT(space_id = 0, is_team = false) {
      try {
        const subjectsData = await userApi.refetchPaginateSubjects({
          page: 1,
          perPage: 1,
          where: {
            column: "user_id",
            operator: "EQ",
            value: JSON.parse(localStorage.getItem("user-data")).user_id,
          },
          is_team,
          space_id,
        });

        this.currentSpaceSubject = subjectsData[0];

        return subjectsData[0];
      } catch (e) {
        return null;
      }
    },

    RESET_CURRENT_SPACE_SUBJECT() {
      this.currentSpaceSubject = null;
    },

    SET_PROP(prop, value) {
      this.currentUser[prop] = value;
    },

    SET_AVATAR(avatar_url) {
      this.currentUser.avatar = avatar_url;
    },

    LOGOUT_CURRENT_USER() {
      this.currentUser = null;
    },
  },
});
