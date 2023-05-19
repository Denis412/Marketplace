import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useUserStore } from "src/stores/user";
import teamApi from "src/sdk/team";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    console.log("to", to, from);

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const teamMember = to.matched.some((record) => record.meta.isTeamMember);
    const teamOwner = to.matched.some((record) => record.meta.isTeamOwner);

    if (teamOwner) {
      const team = await teamApi.refetchPaginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: to.params.id,
        },
      });

      const subject = await userStore.FETCH_CURRENT_SPACE_SUBJECT(0, true);

      if (team[0].author_id !== subject.id)
        next(`/club/team/${to.params.id}?space=${to.query?.space}`);
    } else if (teamMember || to.name === "team") {
      const result = await userStore.FETCH_CURRENT_SPACE_SUBJECT(
        to.query.space,
        true
      );

      console.log("subject", result);

      if (teamMember && !result)
        next(`/club/team/${from.params.id}?space=${from.query?.space}`);
    } else userStore.RESET_CURRENT_SPACE_SUBJECT();

    const isAuthenticated = localStorage.getItem("user-data");

    requiresAuth && !isAuthenticated ? next("/authentication") : next();
  });

  return Router;
})();
