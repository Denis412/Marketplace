import { defineStore } from "pinia";
import teamApi from "src/sdk/team";

export const useTeamStore = defineStore("team", {
  state: () => ({
    currentTeam: null,
  }),

  getters: {
    GET_CURRENT_TEAM() {
      return this.currentTeam;
    },
  },

  actions: {
    QUERY_CURRENT_TEAM(id) {
      return teamApi.paginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: id,
        },
      });
    },
  },
});
