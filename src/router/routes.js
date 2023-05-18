import userApi from "src/sdk/user";

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
        path: "team/:name",
        name: "team",
        component: () => import("pages/ClubTeamPage.vue"),
      },
      {
        path: "team/:name/invite",
        name: "teamInvite",
        component: () => import("pages/ClubTeamInvitePage.vue"),
      },
      {
        path: "team/:name/edit",
        name: "teamEdit",
        props: true,
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
        path: "project/:space/:name",
        name: "project",
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
        path: 'taskPage',
        name: 'taskPage',
        component: () => import('pages/ClubTaskPage.vue'),
      },
      {
        path: 'taskPage',
        name: 'taskPage',
        component: () => import('pages/ClubTaskPage.vue'),
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
