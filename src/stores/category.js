import { defineStore } from "pinia";

const defaultStore = () => {
  return {
    categories: [],
    faculties: [],
    subjects: [],
  };
};

export const useCategoryStore = defineStore("category", {
  state: () => defaultStore(),
  getters: {
    getCategories:  (state) => state.categories,
    getSubjects:  (state) => state.subjects,
    getFaculties:  (state) => state.faculties,
    getCategoryOptions: (state) =>
      state.categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),

    getFacultyOptions: (state) =>
      state.faculties.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
      })),

    getSubjectOptions: (state) =>
      state.subjects.map((subject) => ({
        label: subject.name,
        value: subject.id,
      })),
  },
  actions: {
    setCategories(newCategories) {
      this.categories = newCategories;
    },

    setFaculties(newFaculties) {
      this.faculties = newFaculties;
    },

    setSubjects(newSubjects) {
      this.subjects = newSubjects;
    },

    getCategoryById(id) {
      return this.categories.find((c) => c.id === id);
    },

    getFacultyById(id) {
      return this.faculties.find((c) => c.id === id);
    },

    getSubjectById(id) {
      return this.subjects.find((c) => c.id === id);
    },
  },
});
