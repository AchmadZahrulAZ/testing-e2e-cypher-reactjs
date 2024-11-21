import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./async/todosSlice";
import languageReducer from './slices/languageSlice';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        language: languageReducer, // Tambahkan language reducer
    }
});