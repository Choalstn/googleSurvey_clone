// store/index.tsx
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardSlice from './cardSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
	cards: cardSlice,
});

const persistConfig = {
	key: 'root',
	storage,
	keyPrefix: '',
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
