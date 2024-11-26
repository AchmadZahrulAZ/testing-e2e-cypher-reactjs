import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        currentTodo: (state, action) => {
            state.isUpdate = true;
            state.todo = action.payload;
        },
        updateTodo: (state, action) => {
            state.isUpdate = false;
            const { id, text } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text;
            }
        },
    },
})

// untuk di component
export const { addTodo, deleteTodo, toggleTodo, updateTodo, currentTodo, changeLanguage } = todoSlice.actions;

// untuk di store
export default todoSlice.reducer;