import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 0,
    questions: [
      {
        name: "Question 1",
        category: "Category 1",
        subcategory: "Subcategory 1",
        subject: "Subject 1",
        chapter: "Chapter 1",
      },
      {
        name: "Question 2",
        category: "Category 2",
        subcategory: "Subcategory 2",
        subject: "Subject 2",
        chapter: "Chapter 2",
      },
      {
        name: "Question 3",
        category: "Category 3",
        subcategory: "Subcategory 3",
        subject: "Subject 3",
        chapter: "Chapter 3",
      },
    ],
    exams: [
      {
        id: 1,
        name: "Exam 1",
        faculty: "Faculty 1",
        subject: "Subject 1",
        discipline: "Discipline 1",
        duration: "Duration 1",
      },
      {
        id: 2,
        name: "Exam 2",
        faculty: "Faculty 2",
        subject: "Subject 2",
        discipline: "Discipline 2",
        duration: "Duration 2",
      },
      {
        id: 3,
        name: "Exam 3",
        faculty: "Faculty 3",
        subject: "Subject 3",
        discipline: "Discipline 3",
        duration: "Duration 3",
      },
    ],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
