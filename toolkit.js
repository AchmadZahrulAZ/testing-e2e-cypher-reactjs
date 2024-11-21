import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
};

// reducer dan action
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // pengganti action
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
    }
})

// middleware
const logger = (store) => (next) => (action) => {
    console.log("Action:", action);
    next(action);
    console.log("State sekarang:", store.getState());
}

// store
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// subscribe
store.subscribe(() => {
    // console.log("State sekarang:", store.getState());
})

// dispatch
store.dispatch(counterSlice.actions.increment())
store.dispatch(counterSlice.actions.increment())
store.dispatch(counterSlice.actions.decrement())




