import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: 'en', // Default bahasa adalah 'en'
  translations: {
    en: {
      navbarTitle: "To-Do App",
      switchLanguage: "Switch to Bahasa",
      addTaskPlaceholder: "Add a new task...",
      addButton: "Add",
      updateButton: "Update",
      editButton: "Edit",
      deleteButton: "Delete",
    },
    id: {
      navbarTitle: "Aplikasi To-Do",
      switchLanguage: "Ganti ke Inggris",
      addTaskPlaceholder: "Tambahkan tugas baru...",
      addButton: "Tambah",
      updateButton: "Perbarui",
      editButton: "Ubah",
      deleteButton: "Hapus",
    },
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "id" : "en";
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
