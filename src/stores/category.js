import {defineStore} from "pinia";
import {loadCategories, loadFaculties, loadSubjects} from "src/services/category_service";

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
    getCategories: (state) => state.categories,
    getSubjects: (state) => state.subjects,
    getFaculties: (state) => state.faculties,
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

    async loadCategories() {
      const {
        data: categoryData,
        status: categoryStatus,
        error: categoryError,
      } = await loadCategories({});
      if (categoryStatus === 200) {
        // console.log("Category", categoryData);
        this.setCategories(categoryData.data);
      }
    },

    setFaculties(newFaculties) {
      this.faculties = newFaculties;
    },
    async loadFaculties() {
      const {
        data: facultyData,
        status: facultyStatus,
        error: facultyError,
      } = await loadFaculties({});
      if (facultyStatus === 200) {
        // console.log("Faculty", facultyData);
        this.setFaculties(facultyData.data);
      }
    },
    setSubjects(newSubjects) {
      this.subjects = newSubjects;
    },
    async loadSubjects() {
      const {
        data: subjectData,
        status: subjectStatus,
        error: subjectError,
      } = await loadSubjects({});
      if (subjectStatus === 200) {
        // console.log("Subject", subjectData);
        this.setSubjects(subjectData.data);
      }
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
