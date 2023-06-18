import { configureStore } from '@reduxjs/toolkit'
import componentsSlice from "./components.slice";
import authSlice from "./auth.slice";
import themeSlice from "./theme.slice";

export const store = configureStore({
    reducer: {
        componentsSlice,
        authSlice,
        themeSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch