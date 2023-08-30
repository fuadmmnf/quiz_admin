import { defineStore } from "pinia";
import { api } from "boot/axios";

const defaultStore = () => {
  return {
    counter: 0,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    categories: [],
    faculty: [],
    subject: [],
    subcategories: [],
    disciplines: [],
    chapters: [],
  };
};



export const useStore = defineStore("store", {
  state: () => (
    defaultStore()
  ),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    resetState() {
      Object.assign(this, defaultStore());
    },
    increment() {
      this.counter++;
    },
    getCategories() {
      api
        .get("/categories/category?limit=0")
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFaculty() {
      api
        .get("/categories/faculty?limit=0")
        .then((response) => {
          this.faculty = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSubject() {
      api
        .get("/categories/subject?limit=0")
        .then((response) => {
          this.subject = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSubcategories() {
      api
        .get("/categories/sub-category?limit=0")
        .then((response) => {
          this.subcategories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDisciplines() {
      api
        .get("/categories/discipline?limit=0")
        .then((response) => {
          this.disciplines = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getChapters() {
      api
        .get("/categories/chapter?limit=0")
        .then((response) => {
          this.chapters = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.isAuthenticated = false;
    },
    getAuthenticatedUser() {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };
      api
        .get("/profile", { headers: headers })
        .then((response) => {
          this.user = response.data.data;
          localStorage.setItem("user", JSON.stringify(response.data.data));
          this.isAuthenticated = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    authenticate(mobile, password) {
      api
        .post("/clients/web/login", {
          mobile: mobile,
          password: password,
        })
        .then((response) => {
          this.accessToken = response.data.access_token;
          this.refreshToken = response.data.refresh_token;
          localStorage.setItem("accessToken", this.accessToken);
          localStorage.setItem("refreshToken", this.refreshToken);
          this.isAuthenticated = true;
          this.getAuthenticatedUser();
        });
    },
  },
});
