const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Dashboard.vue") },
      {
        path: "/Roles/SubAdmin",
        component: () => import("pages/Roles/SubAdmin.vue"),
      },
      {
        path: "/roles/moderator",
        component: () => import("pages/Roles/Moderator.vue"),
      },
      {
        path: "/roles/mentor",
        component: () => import("pages/Roles/Mentor.vue"),
      },
      { path: "/category", component: () => import("pages/Category.vue") },
      { path: "/faculty", component: () => import("pages/Faculty.vue") },
      //faculty path with id and edit
      { path: "/subject", component: () => import("pages/Subject.vue") },
      {
        path: "/blog",
        component: () => import("pages/Blog/Blog.vue"),
      },
      {
        path: "/blog/add",
        component: () => import("pages/Blog/AddorEditBlog.vue"),
      },
      {
        path: "/questionbanks/draft",
        component: () => import("pages/QuestionBank/draftBank.vue"),
      },
      {
        path: "/questionbanks/published",
        component: () => import("pages/QuestionBank/publishedBank.vue"),
      },
      {
        path: "/questionbanks",
        component: () => import("pages/QuestionBank/AllBank.vue"),
      },
      // {
      //   path: "/questionbanks",
      //   component: () => import("pages/QuestionBank/index.vue"),
      // },
      {
        path: "/questionbanks/add",
        component: () => import("pages/QuestionBank/AddOrEdit.vue"),
      },

      // {
      //   path: "/question-bank-list/:id",
      //   component: () => import("pages/QuestionBank/AddOrEdit.vue"),
      // },
      {
        path: "/questionbanks/:id/edit-questions",
        name: "questionbank-questions",
        component: () => import("pages/QuestionBank/EditQuestion.vue"),
      },
      {
        path: "/question",
        component: () => import("pages/Question/index.vue"),
      },
      {
        path: "/question/add",
        component: () => import("pages/Question/AddOrEdit.vue"),
      },
      {
        path: "/question/:id",
        component: () => import("pages/Question/AddOrEdit.vue"),
      },
      {
        path: "exam/draft",
        component: () => import("pages/Exam/Draft/index.vue"),
      },
      {
        path: "user-activity",
        component: () => import("pages/UserActivity.vue"),
      },
      {
        path: "exam/upcoming",
        component: () => import("pages/Exam/Upcoming/index.vue"),
      },
      {
        path: "exam/completed",
        component: () => import("pages/Exam/Completed/index.vue"),
      },
      {
        path: "exam/ongoing",
        component: () => import("pages/Exam/Ongoing/index.vue"),
      },
      {
        path: "/exam/checking",
        component: () => import("pages/Exam/Checking/index.vue"),
      },
      {
        path: "/exam/checking/:id/questions",
        component: () => import("pages/Exam/Checking/questions.vue"),
      },
      {
        path: "/exam/checking/:exam_id/questions/:id/answers",
        component: () => import("pages/Exam/Checking/answers.vue"),
      },
      {
        path: "/exam/add",
        component: () => import("pages/Exam/AddOrEdit.vue"),
      },
      {
        path: "/exam/:id",
        component: () => import("pages/Exam/AddOrEdit.vue"),
      },
      {
        path: "/exam/:type/:id/attempted-users",
        component: () => import("pages/Exam/AttemptUserList.vue"),
      },
      {
        path: "/exam/:id/edit-questions",
        component: () => import("pages/Exam/EditQuestions.vue"),
      },
      { path: "/Dashboard2", component: () => import("pages/Dashboard2.vue") },
      { path: "/Profile", component: () => import("pages/UserProfile.vue") },
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
        path: "/institutions",
        component: () => import("pages/Institutions.vue"),
      },
      {
        path: "/course/draft",
        component: () => import("pages/Course/Draft/index.vue"),
      },
      {
        path: "/course/published",
        component: () => import("pages/Course/Published/index.vue"),
      },
      {
        path: "/course/completed",
        component: () => import("pages/Course/Completed/index.vue"),
      },
      {
        path: "/course/add",
        component: () => import("pages/Course/AddOrEdit.vue"),
      },
      {
        path: "/course/:id",
        component: () => import("pages/Course/AddOrEdit.vue"),
      },
      {
        path: "/course-exams/:courseId",
        component: () => import("pages/Course/CourseExamList.vue"),
      },
      // {
      //   path: "/course-questionbanks/:courseId",
      //   component: () => import("pages/Course/CourseQuestionBankList.vue"),
      // },
      {
        path: "/registered-students",
        component: () => import("pages/RegisteredStudents/index.vue"),
      },

      {
        path: "/send-message",
        component: () => import("pages/TrySendMessage.vue"),
      },

      {
        path: "/lecture-classes/:courseId",
        component: () => import("pages/LectureClass/index.vue"),
      },
      {
        path: "/lecture-classes/:courseId/add",
        component: () => import("pages/LectureClass/AddOrEdit.vue"),
      },

      {
        path: "/subscribe-user/:courseId",
        component: () => import("pages/Course/EnrolledUser.vue"),
      },

      {
        path: "/student-list",
        name: "studentList",
        component: () => import("pages/StudentList.vue"),
      },
      {
        path: "/student/:id",
        name: "studentEdit",
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
