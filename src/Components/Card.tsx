import { styled } from 'styled-components';
import DropDown from './DropDown';
import { InterCard } from '../store/cardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Simple from './Answers/Simple';
import Radio from './Answers/Radio';
import CheckBox from './Answers/CheckBox';
import DropDownAn from './Answers/DropDown';
import { ReactComponent as SvgDelete } from '../assets/delete.svg';
import { ReactComponent as SvgCopy } from '../assets/copy.svg';
import { Switch as MSwitch } from '@mui/material';

const TopCard = styled.div`
	height: 15vh;
	border: 1.5px solid rgb(218, 219, 233);
	border-top: 12px solid #673ab6;
	border-radius: 11px;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 30px;

	> input:nth-child(1) {
		height: 50px;
		margin-bottom: 10px;
		font-size: 30px;
		font-weight: 500;
		border: none;

		&:focus {
			outline: none;
			border-bottom: 2px solid #673ab6;
		}
	}

	> input:nth-child(2) {
		border: none;

		&:focus {
			outline: none;
			border-bottom: 2px solid #673ab6;
		}
	}
`;

const MainCard = styled.div`
	min-height: 28vh;
	border: 1.5px solid rgb(218, 219, 233);
	border-radius: 11px;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 10px;
	margin-top: 15px;

	> div:nth-child(1) {
		padding: 10px;
		display: flex;
		height: 8vh;
		justify-content: space-between;
		align-items: center;

		> input:nth-child(1) {
			padding-left: 10px;
			font-size: 15px;
			height: 100%;
			width: 50%;
			font-weight: 500;
			border: none;

			&:focus {
				outline: none;
				border-bottom: 2px solid #673ab6;
				background-color: #f6f6f6;
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
	width: 19px;
	height: 19px;
	color: gray;
	margin-right: 20px;
`;

const Delete = styled(SvgDelete)`
	width: 19px;
	height: 19px;
	color: gray;
`;

const Switch = styled(MSwitch)`
	.Mui-checked {
		color: #673ab6 !important;
	}
	.MuiSwitch-track {
		background-color: #e0d8f1 !important;
	}
`;

export interface extendedCardProps extends InterCard {
	isTitle: boolean;
	idx: number;
}

function Card({ isTitle, id, idx }: extendedCardProps) {
	const cardType = useSelector(
		(state: RootState) => state.cards.find((el) => el.id === id)?.cardType,
	) as string;

	const cardInfo = useSelector((state: RootState) =>
		state.cards.find((el) => el.id === id),
	) as InterCard;

	return (
		<>
			{isTitle ? (
				<TopCard>
					<input type="text" defaultValue="제목 없는 설문지" />
					<input type="text" placeholder="설문지 설명" />
				</TopCard>
			) : (
				<MainCard>
					<div>
						<input type="text" defaultValue="제목없는 질문" />
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
							<Copy />
							<Delete />
						</div>

						<div>
							<span>필수</span>
							<Switch />
						</div>
					</EtcFeat>
				</MainCard>
			)}
		</>
	);
}

export default Card;
