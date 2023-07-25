import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InterCard } from './cardSlice';

interface PreviewType {
	id?: number;
	idx?: number;
	cardInfo?: InterCard;
}

const initialState: number[] = [];

const requiredSlice = createSlice({
	name: 'Required',
	initialState,
	reducers: {
		requiredItems: (state: number[], action: PayloadAction<PreviewType>) => {
			return [...state, action.payload.id!];
		},
		deleterequiredOtems: (
			state: number[],
			action: PayloadAction<PreviewType>,
		) => {
			const target = state.find((el) => el === action.payload.cardInfo!.id);
			const findIdx = state.findIndex((el) => el === target);

			if (findIdx !== -1) {
				state.splice(findIdx, 1);
			}
		},
	},
});

export const { requiredItems, deleterequiredOtems } = requiredSlice.actions;

export default requiredSlice.reducer;
