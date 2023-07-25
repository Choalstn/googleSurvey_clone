import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { InterCard } from '../store/cardSlice';

const Container = styled.div`
	margin: 20px;
	height: 100vh;
	width: 60vw;
`;

const ResultCard = styled.div`
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
function Result() {
	const cardInfo = useSelector((state: RootState) =>
		state.cards.find((el) => el.cardType === '제목'),
	) as InterCard;

	return (
		<>
			<Container>
				<ResultCard>
					<div className="title">{cardInfo.title}</div>
					<div>응답이 기록되었습니다</div>
				</ResultCard>
			</Container>
		</>
	);
}

export default Result;
