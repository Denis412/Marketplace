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
        path: "account",
        name: "account",
        component: () => import("pages/ClubAccountSettingsPage.vue"),
      },
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
        path: "teams/my-teams",
        name: "my-teams",
        component: () => import("pages/ClubMyTeams.vue"),
      },
      {
        path: "teams/all-teams",
        name: "all-teams",
        component: () => import("pages/ClubAllTeams.vue"),
      },
      //тестовые роуты
      {
        path: "market",
        name: "market",
        component: () => import("pages/ErrorNotFound.vue"),
      },
      {
        path: "projects",
        name: "projects",
        component: () => import("pages/ErrorNotFound.vue"),
      },
      {
        path: "space",
        name: "space",
        component: () => import("pages/ErrorNotFound.vue"),
      },
      //
      {
        path: "order-create",
        name: "order-create",
        component: () => import("pages/ClubOrderCreate.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/authentication",
    name: "auth",
    component: () => import("pages/ClubAuthenticationPage.vue"),
  },
  {
    path: "/registration",
    name: "reg",
    component: () => import("pages/ClubRegistrationPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
