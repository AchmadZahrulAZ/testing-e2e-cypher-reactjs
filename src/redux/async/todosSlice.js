import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';

// dapatkan data dari API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// tambahkan data ke API
export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

// update data di API
export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  console.log('Mengirim data update ke API:', todo); // Debug
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  console.log('Respon dari API update:', response.data); // Debug
  return response.data;
});

// delete data di API
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Thunk untuk toggle status completed
export const toggleTodo = createAsyncThunk('todos/toggleTodo', async ({ id, completed }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { completed }); // Perbaiki endpoint
    return response.data; // Kembalikan todo yang telah diperbarui
  } catch (error) {
    return rejectWithValue(error.response?.data || 'API Error'); // Tangani error
  }
});


const initialState = {
  todos: [],
  todo: {},
  isUpdate: false,
  loading: false,
  error: null,
  isSuccess: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  //sinkronus
  reducers: {
    currentTodo: (state, action) => {
      state.todo = action.payload; // Isi state todo dengan data yang dipilih
      state.isUpdate = true; // Aktifkan mode update
    },
    resetTodo: (state) => {
      state.todo = {}; // Reset state todo
      state.isUpdate = false; // Nonaktifkan mode update
    },
  },
  //asinkronus
  extraReducers: (builder) => {
    // fetchTodos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    });
    // addTodo
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(addTodo.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    });
    // updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.map((t) => (t.id === action.payload.id ? action.payload : t));
      state.isUpdate = false; // Reset flag isUpdate
      state.todo = {}; // Reset todo yang sedang diedit
      console.log('Update berhasil, data terbaru:', action.payload); // Debug
    });

    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      console.error('Gagal mengupdate todo:', action.error); // Debug
      state.error = action.payload || 'Something went wrong';
    });

    // deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    });
    // Update todos state after toggle operation
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
        console.log('State todos setelah toggle:', state.todos); // Debug
      }
    });
    
  },
});

export const { currentTodo, resetTodo } = todosSlice.actions;
export default todosSlice.reducer;
