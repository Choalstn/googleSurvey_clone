import { configureStore } from '@reduxjs/toolkit';
import cardSlice from './cardSlice';

const store = configureStore({
	reducer: {
		cards: cardSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
