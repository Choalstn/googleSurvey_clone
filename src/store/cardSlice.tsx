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
	id?: number;
	textId: number;
	text?: string;
	isEtc?: boolean;
	isChecked?: boolean;
}

interface changeType {
	id: number;
	cardType: string;
}

interface DeletCopyType {
	id: number;
}

interface ChangeCardInfoType {
	id: number;
	title?: string;
	contents?: string | OptionType[];
}

const initialState: InterCard[] = [
	{
		id: 0,
		title: '제목 없는 설문지',
		contents: '',
		isFocused: false,
		isRequired: false,
		cardType: '제목',
	},
];

const sortOptions = (contents: OptionType[]) => {
	const etcOption = contents.filter((el) => el.isEtc);
	const etcIndex = contents.findIndex((el) => el.isEtc);

	if (etcOption.length > 0) {
		contents.splice(etcIndex, 1);
		contents.push(...etcOption);
	}
};

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
						textId: Date.now(),
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

		setTitle: (
			state: InterCard[],
			action: PayloadAction<ChangeCardInfoType>,
		) => {
			const target = state.find(
				(card) => card.id === action.payload.id,
			) as InterCard;

			target.title = action.payload.title!;
		},

		setText: (state: InterCard[], action: PayloadAction<OptionType>) => {
			const target = state.find(
				(card) => card.id === action.payload.id,
			) as InterCard;

			if (target.cardType === '제목') {
				target.contents = action.payload.text!;
			} else if (
				target.cardType === '객관식 질문' ||
				target.cardType === '체크박스' ||
				target.cardType === '드롭다운'
			) {
				const contents = target.contents as OptionType[];
				const targetContents = contents.find(
					(el) => el.textId === action.payload.textId,
				) as OptionType;
				targetContents.text = action.payload.text;
			} else {
				target.contents = action.payload.text as string;
			}
		},

		addCardOption: (state: InterCard[], action: PayloadAction<OptionType>) => {
			const targetContents = state.find((el) => el.id === action.payload.id)
				?.contents as OptionType[];

			targetContents.push({
				textId: action.payload.textId,
				text: action.payload.text,
			});

			sortOptions(targetContents);
		},

		deleteCardOption: (
			state: InterCard[],
			action: PayloadAction<OptionType>,
		) => {
			const target = state.find(
				(card) => card.id === action.payload.id,
			) as InterCard;
			const targetContents = target.contents as OptionType[];
			const copiedContents = targetContents.map((el) => ({ ...el }));
			const targetOptionIndex = copiedContents.findIndex(
				(el) => el.textId === action.payload.textId,
			);
			copiedContents.splice(targetOptionIndex, 1);

			target.contents = copiedContents;
		},

		changeRequired: (
			state: InterCard[],
			action: PayloadAction<ChangeCardInfoType>,
		) => {
			const target = state.find(
				(card) => card.id === action.payload.id,
			) as InterCard;

			target.isRequired = !target.isRequired;
		},

		changeFocused: (
			state: InterCard[],
			action: PayloadAction<ChangeCardInfoType>,
		) => {
			return state.map((card) =>
				card.id === action.payload.id
					? { ...card, isFocused: true }
					: { ...card, isFocused: false },
			);
		},

		addEtcOption: (state: InterCard[], action: PayloadAction<OptionType>) => {
			const targetContents = state.find((el) => el.id === action.payload.id)
				?.contents as OptionType[];

			targetContents.push({
				textId: action.payload.textId,
				text: action.payload.text,
				isEtc: true,
			});
		},

		selectDrop: (state: InterCard[], action: PayloadAction<OptionType>) => {
			const target = state.find(
				(el) => el.id === action.payload.id,
			) as InterCard;
			const targetContents = target.contents as OptionType[];

			const targetOption = targetContents.find(
				(el) => el.textId === action.payload.textId,
			) as OptionType;

			targetOption.isChecked = !targetOption.isChecked;
		},
	},
});

export const {
	addCard,
	changeType,
	deleteCard,
	copyCard,
	setTitle,
	addCardOption,
	deleteCardOption,
	changeRequired,
	changeFocused,
	setText,
	addEtcOption,
	selectDrop,
} = cardSlice.actions;

export default cardSlice.reducer;
