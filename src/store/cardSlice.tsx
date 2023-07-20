import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InterCard {
	id: number;
	title: string;
	contents: string;
	isFocused: boolean;
}

const initialState: InterCard[] = [
	{
		id: 0,
		title: '제목 없는 설문지',
		contents: '',
		isFocused: false,
	},
];

const cardSlice = createSlice({
	name: 'cardReducer',
	initialState,
	reducers: {
		addCard: (state: InterCard[], action: PayloadAction<InterCard>) => {
			return [...state, action.payload];
		},
	},
});

export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;
