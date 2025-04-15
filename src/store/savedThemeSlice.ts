import type { SavedThemes } from '@/types/theme';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { listenerMiddleware } from './listenerMiddleware';

export interface ThemeSavedState {
	value: SavedThemes;
}

const initialState: ThemeSavedState = {
	value: null,
};

export const savedThemeSlice = createSlice({
	name: 'savedTheme',
	initialState,
	reducers: {
		setSavedTheme: (state, action: PayloadAction<SavedThemes>) => {
			state.value = action.payload;
		},
	},
});

export const selectSavedTheme = (state: RootState) => state.savedTheme.value;

export const { setSavedTheme } = savedThemeSlice.actions;
export const savedThemeReducer = savedThemeSlice.reducer;

listenerMiddleware.startListening({
	actionCreator: setSavedTheme,
	effect: async (action) => {
		const theme = action.payload;
		if (!theme) {
			return;
		}

		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('saved-theme', theme);
	},
});
