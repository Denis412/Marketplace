const routes = [
  {
    path: "/",
    component: () => import("layouts/ClubLandingLayout.vue"),
    children: [
      {
        path: "",
        name: "landing-main",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "develop",
        name: "landing-develop",
        component: () => import("pages/ClubDevelopPage.vue"),
      },
    ],
  },
  {
    path: "/club",
    name: "club",
    component: () => import("layouts/ClubMainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "account",
        name: "account",
        component: () => import("pages/ClubAccountSettingsPage.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/ClubUserProfilePage.vue"),
      },
      {
        path: "profile/settings",
        name: "profileSettings",
        component: () => import("pages/ClubUserProfileSettingsPage.vue"),
      },
      {
        path: "team/:id",
        name: "team",
        props: true,
        component: () => import("pages/ClubTeamPage.vue"),
      },
      {
        path: "team-space/:id",
        name: "teamSpace",
        meta: { isTeamMember: true },
        component: () => import("pages/ClubTeamSpace.vue"),
      },
      {
        path: "team/:id/invite",
        name: "teamInvite",
        meta: { isTeamOwner: true },
        component: () => import("pages/ClubTeamInvitePage.vue"),
      },
      {
        path: "project/:id/invite",
        name: "projectInvite",
        component: () => import("pages/ClubTeamInvitePage.vue"),
      },
      {
        path: "team/:id/edit",
        name: "teamEdit",
        meta: { isTeamOwner: true },
        component: () => import("src/pages/ClubTeamSettingsPage.vue"),
      },
      {
        path: "team-space/:id/edit",
        name: "teamSpaceEdit",
        meta: { isTeamOwner: true },
        component: () => import("src/pages/ClubTeamSettingsPage.vue"),
      },
      {
        path: "teams",
        name: "teams",
        component: () => import("pages/ClubTeamsPage.vue"),
      },
      {
        path: "team-create",
        name: "team-create",
        component: () => import("pages/ClubCreateTeamPage.vue"),
      },
      {
        path: "teams/my-teams",
        name: "my-teams",
        component: () => import("src/pages/ClubMyTeamsPage.vue"),
      },
      {
        path: "my-projects",
        name: "my-projects",
        component: () => import("src/pages/ClubMyProjectsPage.vue"),
      },
      {
        path: "project/:id",
        name: "project",
        // meta: { isTeamMember: true },
        component: () => import("src/pages/ClubProjectInformationPage.vue"),
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
      {
        path: "addDocument",
        name: "addDocument",
        component: () => import("pages/ClubAddNewDocument.vue"),
      },
      {
        path: "addDocument/:id",
        name: "Document",
        component: () => import("pages/ClubAddNewDocument.vue"),
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("pages/ClubOrdersPage.vue"),
      },
      //
      {
        path: "order-create",
        name: "order-create",
        component: () => import("pages/ClubOrderCreate.vue"),
      },
      {
        path: "/order-info/:id",
        name: "order-info",
        component: () => import("src/pages/ClubOrderInformationPage.vue"),
      },
      {
        path: "order-edit/:id",
        name: "order-edit",
        component: () => import("pages/ClubOrderEdit.vue"),
      },
      {
        path: "order-created",
        name: "order-created",
        component: () => import("pages/ClubOrderCreated.vue"),
      },
      {
        path: "notifications",
        name: "notifications",
        component: () => import("pages/ClubNotificationPage.vue"),
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
