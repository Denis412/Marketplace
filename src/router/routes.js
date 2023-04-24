const routes = [
  {
    path: "/",
    component: () => import("layouts/ClubLandingLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/club",
    component: () => import("layouts/ClubMainLayout.vue"),
    children: [
      {
        path: "/club/teams",
        component: () => import("pages/ClubTeamsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/authentication",
    component: () => import("pages/ClubAuthenticationPage.vue"),
  },
  {
    path: "/registration",
    component: () => import("pages/ClubRegistrationPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
