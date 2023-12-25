import { defineStore } from "pinia";

const defaultStore = () => {
  return {

    faculties: [],
    institutions: [],
  };
};

export const useCategoryStore = defineStore("category", {
  state: () => defaultStore(),
  getters: {


    getFacultyOptions: (state) =>
      state.faculties.map((faculty) => ({
        label: faculty.name,
        value: faculty.id,
      })),

    getInstitutionOptions: (state) =>
      state.institutions.map((institution) => ({
        label: institution.name,
        value: institution.id,
      })),
  },
  actions: {

    setFaculties(newFaculties) {
      this.faculties = newFaculties;
    },

    setInstitution(newInstitutions) {
      this.institutions = newInstitutions;
    },



    getFacultyById(id) {
      return this.faculties.find((c) => c.id === id);
    },

    getInstitutionById(id) {
      return this.institutions.find((c) => c.id === id);
    },
  },
});
