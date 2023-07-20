import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InterCard {
	id: number;
	title: string;
	contents: string | OptionType[];
	isFocused: boolean;
	cardType: string;
}

export interface OptionType {
	id: string;
	text?: string;
}

interface changeType {
	id: number;
	cardType: string;
}

const initialState: InterCard[] = [
	{
		id: 0,
		title: '제목 없는 설문지',
		contents: '',
		isFocused: false,
		cardType: '제목',
	},
];

const cardSlice = createSlice({
	name: 'cardReducer',
	initialState,
	reducers: {
		addCard: (state: InterCard[], action: PayloadAction<InterCard>) => {
			return [...state, action.payload];
		},

		changeType: (state: InterCard[], action: PayloadAction<changeType>) => {
			const target = state.find(
				(card) => card.id === action.payload.id,
			) as InterCard;

			if (
				!(
					target.cardType === '객관식 질문' ||
					target.cardType === '체크박스' ||
					target.cardType === '드롭다운'
				) &&
				(action.payload.cardType === '객관식 질문' ||
					action.payload.cardType === '체크박스' ||
					action.payload.cardType === '드롭다운')
			) {
				target.contents = [
					{
						id: String(Date.now()),
						text: '옵션 1',
					},
				];
			} else if (
				(target.cardType === '객관식 질문' ||
					target.cardType === '체크박스' ||
					target.cardType === '드롭다운') &&
				!(
					action.payload.cardType === '객관식 질문' ||
					action.payload.cardType === '체크박스' ||
					action.payload.cardType === '드롭다운'
				)
			) {
				target.contents = '';
			}

			target.cardType = action.payload.cardType as string;
		},
	},
});

export const { addCard, changeType } = cardSlice.actions;
export default cardSlice.reducer;
