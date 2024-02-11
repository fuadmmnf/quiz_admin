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
        path: "/blogs/:status",
        name: 'blog-list',
        component: () => import("pages/Blog/Index.vue"),
      },
      {
        path: "/blog/add",
        component: () => import("pages/Blog/AddorEdit.vue"),
      },
      {
        path: "/questionbanks/:status",
        name: "questionbank-list",
        component: () => import("pages/QuestionBank/index.vue"),
      },
      // {
      //   path: "/questionbanks/draft",
      //   component: () => import("pages/QuestionBank/draftBank.vue"),
      // },
      // {
      //   path: "/questionbanks/published",
      //   component: () => import("pages/QuestionBank/publishedBank.vue"),
      // },
      // {
      //   path: "/questionbanks",
      //   component: () => import("pages/QuestionBank/AllBank.vue"),
      // },
      // {
      //   path: "/questionbanks",
      //   component: () => import("pages/QuestionBank/index.vue"),
      // },
      {
        path: "/questionbank/add",
        name: "questionbank-create",
        component: () => import("pages/QuestionBank/AddOrEdit.vue"),
      },

      // {
      //   path: "/question-bank-list/:id",
      //   component: () => import("pages/QuestionBank/AddOrEdit.vue"),
      // },
      {
        path: "/questionbank/:id/edit-questions",
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
        path: "exams/:status",
        name: "exam-list",
        component: () => import("pages/Exam/index.vue"),
      },
      {
        path: "user-activity",
        component: () => import("pages/UserActivity.vue"),
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
        name: "exam-create",
        component: () => import("pages/Exam/AddOrEdit.vue"),
      },
      {
        path: "/exam/:id",
        component: () => import("pages/Exam/AddOrEdit.vue"),
      },
      {
        path: "/exam/:status/:id/attempted-users",
        component: () => import("pages/Exam/AttemptUserList.vue"),
      },
      {
        path: "/exam/:id/edit-questions",
        component: () => import("pages/Exam/EditQuestions.vue"),
      },
      { path: "/Profile", component: () => import("pages/UserProfile.vue") },
      {
        path: "/institutions",
        component: () => import("pages/Institutions.vue"),
      },
      {
        path: "/courses/:status",
        name: 'course-list',
        component: () => import("pages/Course/index.vue"),
      },
      {
        path: "/course/add",
        name: 'course-create',
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
        component: () => import("pages/SendMessage.vue"),
      },
      {
        path: "/class-materials/:status",
        name: 'classmaterial-list',
        component: () => import("pages/ClassMaterial/index.vue"),
      },
      {
        path: "/class-material/add",
        name: 'classmaterial-create',
        component: () => import("pages/ClassMaterial/AddOrEdit.vue"),
      },
      {
        path: "/class-material/:id/edit",
        name: 'classmaterial-edit',
        component: () => import("pages/ClassMaterial/AddOrEdit.vue"),
      },

      {
        path: "/subscribe-user/:courseId",
        name: 'course-users',
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
    path: "/Login",
    name: "Login",
    component: () => import("src/pages/Login.vue"),
  },
];

export default routes;
