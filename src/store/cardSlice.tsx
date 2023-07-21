import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InterCard {
	id: number;
	title: string;
	contents: string | OptionType[];
	isFocused: boolean;
	isRequired: boolean;
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

interface DeletCopyType {
	id: number;
}

const initialState: InterCard[] = [
	{
		id: Date.now(),
		title: '제목 없는 설문지',
		contents: '',
		isFocused: false,
		isRequired: false,
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

		deleteCard: (state: InterCard[], action: PayloadAction<DeletCopyType>) => {
			const copiedState = state.map((el) => ({ ...el }));
			const targetCardIndex = copiedState.findIndex(
				(el) => el.id === action.payload.id,
			);

			copiedState.splice(targetCardIndex, 1);

			return copiedState;
		},

		copyCard: (state: InterCard[], action: PayloadAction<DeletCopyType>) => {
			const copiedState = state.map((el) => ({ ...el }));
			const target = state.find(
				(card) => card.id === action.payload.id,
			) as InterCard;

			const copiedCard = { ...target, id: Date.now() };

			copiedState.splice(target.id, 0, copiedCard);
			return copiedState;
		},
	},
});

export const { addCard, changeType, deleteCard, copyCard } = cardSlice.actions;
export default cardSlice.reducer;
