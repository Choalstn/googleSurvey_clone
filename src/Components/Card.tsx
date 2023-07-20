import { styled } from 'styled-components';
import DropDown from './DropDown';
import { InterCard } from '../store/cardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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
	height: 25vh;
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
	);

	console.log('aaa', cardInfo);

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
				</MainCard>
			)}
		</>
	);
}

export default Card;
