// store/index.tsx
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardSlice from './cardSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import requiredSlice from './requiredSlice';

const reducers = combineReducers({
	cards: cardSlice,
	requiredItems: requiredSlice,
});

const persistConfig = {
	key: 'root',
	storage,
	keyPrefix: '',
	blacklist: ['requiredItems'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
