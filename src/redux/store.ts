import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/posts.slice";

export const store = configureStore({
    reducer: {
        posts: postsSlice
    },
    devTools: import.meta.env.NODE_ENV !== 'production'
})

export type RootStore = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;