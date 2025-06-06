import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/api/apiSlice';
import { savedThemeReducer } from '@/store/savedThemeSlice';
import { listenerMiddleware } from './listenerMiddleware';

export const store = configureStore({
	reducer: {
		savedTheme: savedThemeReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware).concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
