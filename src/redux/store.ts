import { configureStore } from '@reduxjs/toolkit';
import componentsSlice from './components.slice';
import authSlice from './auth.slice';
import themeSlice from './theme.slice';
import commonSlice from './common.slice';
import contactWidgetSlice from './contact.widget.slice';

export const store = configureStore({
  reducer: {
    componentsSlice,
    authSlice,
    themeSlice,
    commonSlice,
    contactWidgetSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
