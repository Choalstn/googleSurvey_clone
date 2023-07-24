import { styled } from 'styled-components';
import { InterCard } from '../../store/cardSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import PreviewSimple from './PreviewSimple';
import PreviewRadio from './PreviewRadio';
import PreviewCheckBox from './PreviewCheckBox';
import PreviewDropDown from './PreviewDropDown';

const TopCard = styled.div`
	height: 15vh;
	border: 1.5px solid rgb(218, 219, 233);
	border-top: 12px solid #673ab6;
	border-radius: 11px;
	background-color: white;
	padding-left: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.title {
		height: 50px;
		margin-bottom: 10px;
		font-size: 30px;
		font-weight: 500;
		display: flex;
		align-items: center;
	}
`;

const MainCard = styled.div`
	min-height: fit-content;
	border: 1.5px solid rgb(218, 219, 233);
	border-radius: 11px;
	background-color: white;
	margin-top: 15px;

	.title {
		margin: 20px 15px;
		padding-left: 10px;
		font-size: 17px;
		height: 100%;
		width: 50%;
		font-weight: 450;
		background-color: white;
		color: black;
	}

	.required {
		color: rgb(200, 64, 49);
	}
`;

export interface extendedCardProps extends InterCard {
	isTitle: boolean;
	idx: number;
}

function PreviewCard({ isTitle, id }: extendedCardProps) {
	const cardType = useSelector(
		(state: RootState) => state.cards.find((el) => el.id === id)?.cardType,
	) as string;

	const cardInfo = useSelector((state: RootState) =>
		state.cards.find((el) => el.id === id),
	) as InterCard;

	const topCardContents = useSelector(
		(state: RootState) =>
			state.cards.find((el) => el.id === 0)?.contents as string,
	);

	console.log('top', topCardContents.length);

	return (
		<>
			{isTitle ? (
				<TopCard>
					<div className="title">{cardInfo.title}</div>
					{topCardContents.length > 0 && (
						<div className="content">{topCardContents}</div>
					)}
				</TopCard>
			) : (
				<MainCard>
					<div className="title">
						{cardInfo.title}{' '}
						<span className="required">{cardInfo.isRequired && '*'}</span>
					</div>

					{cardType === '단답형' || cardType === '장문형' ? (
						<PreviewSimple cardInfo={cardInfo} />
					) : cardType === '객관식 질문' ? (
						<PreviewRadio cardInfo={cardInfo} />
					) : cardType === '체크박스' ? (
						<PreviewCheckBox cardInfo={cardInfo} />
					) : cardType === '드롭다운' ? (
						<PreviewDropDown cardInfo={cardInfo} />
					) : null}
				</MainCard>
			)}
		</>
	);
}

export default PreviewCard;
