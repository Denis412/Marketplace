const routes = [
  {
    path: "/",
    component: () => import("layouts/ClubLandingLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/club",
    name: "club",
    component: () => import("layouts/ClubMainLayout.vue"),
    children: [
      {
        path: "team/:id",
        name: "team",
        component: () => import("pages/ClubTeamPage.vue"),
      },
      {
        path: "team/:id/invite",
        name: "teamInvite",
        component: () => import("pages/ClubTeamInvitePage.vue"),
      },
      {
        path: "teams",
        name: "teams",
        component: () => import("pages/ClubTeamsPage.vue"),
      },
      {
        path: "my-teams",
        name: "my-teams",
        component: () => import("pages/ClubMyTeams.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
