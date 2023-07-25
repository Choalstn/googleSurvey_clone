import { css, styled } from 'styled-components';
import DropDown from './DropDown';
import {
	InterCard,
	changeFocused,
	changeRequired,
	copyCard,
	deleteCard,
	setText,
	setTitle,
} from '../store/cardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Simple from './Answers/Simple';
import Radio from './Answers/Radio';
import CheckBox from './Answers/CheckBox';
import DropDownAn from './Answers/DropDown';
import { ReactComponent as SvgDelete } from '../assets/delete.svg';
import { ReactComponent as SvgCopy } from '../assets/copy.svg';
import { Switch as MSwitch } from '@mui/material';

interface FocusedType {
	isFocused: boolean;
	top?: boolean;
}

const TopCard = styled.div<FocusedType>`
	height: 15vh;
	border: 1.5px solid rgb(218, 219, 233);
	border-top: 12px solid #673ab6;
	border-radius: 11px;
	background-color: white;
	display: flex;

	${(props) =>
		props.isFocused &&
		css`
			box-shadow: 0.3px 1px #b2b1b1;
		`}

	.contents {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;
		padding-left: 10px;
		padding-right: 15px;

		> input:nth-child(1) {
			height: 50px;
			margin-bottom: 10px;
			font-size: 30px;
			font-weight: 500;
			border: none;

			${(props) =>
				props.isFocused &&
				css`
					border-bottom: 1px solid rgb(218, 219, 233);
				`}

			&:focus {
				outline: none;
				border-bottom: 2px solid #673ab6;
			}
		}

		> input:nth-child(2) {
			border: none;

			${(props) =>
				props.isFocused &&
				css`
					border-bottom: 1px solid rgb(218, 219, 233);
				`}

			&:focus {
				outline: none;
				border-bottom: 2px solid #673ab6;
			}
		}
	}
`;

const MainCard = styled.div<FocusedType>`
	min-height: 28vh;
	border: 1.5px solid rgb(218, 219, 233);
	border-radius: 11px;
	background-color: white;
	display: flex;
	margin-top: 15px;

	${(props) =>
		props.isFocused &&
		css`
			box-shadow: 0.3px 1px #b2b1b1;
		`}

	.contents {
		padding: 10px;
		display: flex;
		flex-direction: column;
		width: 100%;

		.header {
			width: 100%;
			display: flex;
			justify-content: space-between;
			> input:nth-child(1) {
				padding-left: 10px;
				font-size: 15px;
				height: 100%;
				width: 50%;
				font-weight: 500;
				border: none;

				${(props) =>
					props.isFocused &&
					css`
						border-bottom: 1px solid #9b9b9b;
						background-color: #f2f2f29c;
					`}

				&:focus {
					outline: none;
					border-bottom: 2px solid #673ab6;
					background-color: #f6f6f6;
				}
			}
		}
	}
`;

const EtcFeat = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	margin: 0 10px;

	> div:nth-child(1) {
		height: 3.5vh;
		display: flex;
		align-items: center;
		padding-right: 20px;
		border-right: 1px solid rgb(198, 199, 211);
	}

	> div:nth-child(2) {
		margin-left: 20px;

		> span {
			font-size: 14px;
			margin-right: 3px;
		}
	}
`;

const Copy = styled(SvgCopy)`
	padding: 8px;
	width: 30px;
	height: 30px;
	color: gray;
	margin-right: 20px;
	cursor: pointer;

	&:hover {
		border-radius: 100%;
		background-color: #ededed9d;
	}
`;

const Delete = styled(SvgDelete)`
	padding: 8px;
	width: 30px;
	height: 30px;
	color: gray;
	cursor: pointer;

	&:hover {
		border-radius: 100%;
		background-color: #ededed9d;
	}
`;

const Switch = styled(MSwitch)`
	.Mui-checked {
		color: #673ab6 !important;
	}
	.MuiSwitch-track {
		background-color: #e0d8f1 !important;
	}
`;

const FocusedCard = styled.div<FocusedType>`
	min-height: 100%;
	border-left: 6px solid white;

	${(props) =>
		props.isFocused &&
		props.top &&
		css`
			border-left: 6px solid #4284f3;
			border-bottom-left-radius: 11px;
		`}

	${(props) =>
		props.isFocused &&
		!props.top &&
		css`
			border-left: 6px solid #4284f3;
			border-bottom-left-radius: 11px;
			border-top-left-radius: 11px;
		`}
`;

export interface extendedCardProps extends InterCard {
	isTitle: boolean;
	idx: number;
}

function Card({ isTitle, id }: extendedCardProps) {
	const dispatch = useDispatch();
	const cardType = useSelector(
		(state: RootState) => state.cards.find((el) => el.id === id)?.cardType,
	) as string;

	const cardInfo = useSelector((state: RootState) =>
		state.cards.find((el) => el.id === id),
	) as InterCard;

	const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setTitle({ id, title: e.target.value }));
	};

	const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(
			setText({
				id,
				textId: id,
				text: e.target.value,
			}),
		);
	};

	const handleCardFocus = (id: number) => {
		dispatch(
			changeFocused({
				id,
			}),
		);
	};

	console.log(cardInfo);

	return (
		<>
			{isTitle ? (
				<TopCard
					onClick={() => handleCardFocus(0)}
					isFocused={cardInfo.isFocused}
				>
					<FocusedCard isFocused={cardInfo.isFocused} top={true} />

					<div className="contents">
						<input
							type="text"
							defaultValue="제목 없는 설문지"
							onChange={(e) => handleTitle(e)}
						/>
						<input
							type="text"
							placeholder="설문지 설명"
							onChange={(e) => handleText(e)}
						/>
					</div>
				</TopCard>
			) : (
				<MainCard
					onClick={() => handleCardFocus(id)}
					isFocused={cardInfo.isFocused}
				>
					<FocusedCard isFocused={cardInfo.isFocused} top={false} />
					<div className="contents">
						<div className="header">
							<input
								type="text"
								placeholder={cardInfo.title}
								onChange={(e) => handleTitle(e)}
							/>
							<DropDown id={id} />
						</div>

						{cardType === '단답형' || cardType === '장문형' ? (
							<Simple />
						) : cardType === '객관식 질문' ? (
							<Radio cardInfo={cardInfo} />
						) : cardType === '체크박스' ? (
							<CheckBox cardInfo={cardInfo} />
						) : cardType === '드롭다운' ? (
							<DropDownAn cardInfo={cardInfo} />
						) : null}

						<EtcFeat>
							<div>
								<Copy
									onClick={() =>
										dispatch(
											copyCard({
												id,
											}),
										)
									}
								/>
								<Delete
									onClick={() =>
										dispatch(
											deleteCard({
												id,
											}),
										)
									}
								/>
							</div>

							<div>
								<span>필수</span>
								<Switch
									onChange={() =>
										dispatch(
											changeRequired({
												id,
											}),
										)
									}
									{...(cardInfo.isRequired ? { defaultChecked: true } : {})}
								/>
							</div>
						</EtcFeat>
					</div>
				</MainCard>
			)}
		</>
	);
}

export default Card;
