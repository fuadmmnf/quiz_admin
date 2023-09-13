import { api } from "boot/axios";
import { defineStore } from "pinia";

const defaultStore = () => {
  return {
    counter: 0,
    isAuthenticated: true,
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
  state: () => defaultStore(),
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
    async getCategories() {
      await api
        .get("/categories/category?limit=0")
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getFaculty() {
      await api
        .get("/categories/faculty?limit=0")
        .then((response) => {
          this.faculty = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getSubject() {
      await api
        .get("/categories/subject?limit=0")
        .then((response) => {
          this.subject = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getSubcategories() {
      await api
        .get("/categories/sub-category?limit=0")
        .then((response) => {
          this.subcategories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getDisciplines() {
      await api
        .get("/categories/discipline?limit=0")
        .then((response) => {
          this.disciplines = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getChapters() {
      await api
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
    async getAuthenticatedUser() {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };
      await api
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
    async authenticate(mobile, password) {
      await api
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
