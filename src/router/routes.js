const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Dashboard.vue") },
      {
        path: "/Roles/Admin",
        component: () => import("pages/Roles/Admin.vue"),
      },
      {
        path: "/Roles/Moderator",
        component: () => import("pages/Roles/Moderator.vue"),
      },
      {
        path: "/Roles/Mentor",
        component: () => import("pages/Roles/Mentor.vue"),
      },
      { path: "/Category", component: () => import("pages/Category.vue") },
      { path: "/Faculty", component: () => import("pages/Faculty.vue") },
      //faculty path with id and edit
      { path: "/Subject", component: () => import("pages/Subject.vue") },
      {
        path: "/Question",
        component: () => import("pages/Question/index.vue"),
      },
      {
        path: "/Question/add",
        component: () => import("pages/Question/AddOrEdit.vue"),
      },
      {
        path: "/Question/:id",
        component: () => import("pages/Question/AddOrEdit.vue"),
      },
      {
        path: "Exam/Draft",
        component: () => import("pages/Exam/Draft/index.vue"),
      },
      {
        path: "Exam/Upcoming",
        component: () => import("pages/Exam/Upcoming/index.vue"),
      },
      {
        path: "Exam/Completed",
        component: () => import("pages/Exam/Completed/index.vue"),
      },
      {
        path: "Exam/Ongoing",
        component: () => import("pages/Exam/Ongoing/index.vue"),
      },
      {
        path: "/Exam/Checking",
        component: () => import("pages/Exam/Checking/index.vue"),
      },
      {
        path: "/Exam/Checking/:id/questions",
        component: () => import("pages/Exam/Checking/questions.vue"),
      },
      {
        path: "/Exam/Checking/:exam_id/questions/:id/answers",
        component: () => import("pages/Exam/Checking/answers.vue"),
      },
      {
        path: "/Exam/add",
        component: () => import("pages/Exam/AddOrEdit.vue"),
      },
      {
        path: "/Exam/:id",
        component: () => import("pages/Exam/AddOrEdit.vue"),
      },
      {
        path: "/Exam/:type/:id/AttemptedUsers",
        component: () => import("pages/Exam/AttemptUserList.vue"),
      },
      {
        path: "/Exam/:id/EditQuestions",
        component: () => import("pages/Exam/EditQuestions.vue"),
      },
      { path: "/Dashboard2", component: () => import("pages/Dashboard2.vue") },
      { path: "/Profile", component: () => import("pages/UserProfile.vue") },
      { path: "/Map", component: () => import("pages/Map.vue") },
      { path: "/MapMarker", component: () => import("pages/MapMarker.vue") },
      { path: "/TreeTable", component: () => import("pages/TreeTable.vue") },
      { path: "/StreetView", component: () => import("pages/StreetView.vue") },
      { path: "/Cards", component: () => import("pages/Cards.vue") },
      { path: "/Tables", component: () => import("pages/Tables.vue") },
      { path: "/Contact", component: () => import("pages/Contact.vue") },
      { path: "/Checkout", component: () => import("pages/Checkout.vue") },
      {
        path: "/Ecommerce",
        component: () => import("pages/ProductCatalogues.vue"),
      },
      { path: "/Pagination", component: () => import("pages/Pagination.vue") },
      { path: "/Charts", component: () => import("pages/Charts.vue") },
      { path: "/Calendar", component: () => import("pages/Calendar.vue") },
      { path: "/Directory", component: () => import("pages/Directory.vue") },
      { path: "/Footer", component: () => import("pages/Footer.vue") },
      { path: "/CardHeader", component: () => import("pages/CardHeader.vue") },
      {
        path: "/Institutions",
        component: () => import("pages/Institutions.vue"),
      },
      {
        path: "/Course",
        component: () => import("pages/Course/index.vue"),
      },
      {
        path: "/Course/add",
        component: () => import("pages/Course/AddOrEdit.vue"),
      },
      {
        path: "/Course/:id",
        component: () => import("pages/Course/AddOrEdit.vue"),
      },
      {
        path: "/RegisteredStudents",
        component: () => import("pages/RegisteredStudents/index.vue"),
      },
      {
        path: "/RegisteredStudents/:id",
        component: () => import("pages/RegisteredStudents/edit.vue"),
      },

      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ],
    meta: {
      requiresAuth: true, // This route requires authentication
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/Mail",
    component: () => import("layouts/Mail.vue"),
  },
  {
    path: "/Maintenance",
    component: () => import("pages/Maintenance.vue"),
  },
  {
    path: "/Pricing",
    component: () => import("pages/Pricing.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("src/pages/Login.vue"),
  },
  {
    path: "/Lock",
    component: () => import("pages/LockScreen.vue"),
  },
  {
    path: "/Lock-2",
    component: () => import("pages/LockScreen-2.vue"),
  },
];

export default routes;
