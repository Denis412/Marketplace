import { defineStore } from "pinia";
import userApi from "src/sdk/user";
import { convertSubject } from "src/utils/convertSubject";

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
    async FETCH_CURRENT_USER() {
      const subjectsData = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "user_id",
          operator: "EQ",
          value: JSON.parse(localStorage.getItem("user-data")).user_id,
        },
      });

      const userData = await userApi.refetchUserById(
        JSON.parse(localStorage.getItem("user-data")).user_id
      );

      this.currentUser = convertSubject({
        ...userData,
        ...subjectsData[0],
      });
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
