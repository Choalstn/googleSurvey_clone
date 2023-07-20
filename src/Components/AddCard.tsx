import styled from 'styled-components';
import { ReactComponent as SvgPlus } from '../assets/plus.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../store/cardSlice';
import { RootState } from '../store';

const Container = styled.div`
	border: 1px solid rgb(218, 219, 233);
	border-radius: 9px;
	background-color: white;
	position: absolute;
	left: 82%;
	top: 15%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
`;

const AddCardIcon = styled(SvgPlus)`
	width: 40%;
	height: 40%;
`;
function AddCard() {
	const dispatch = useDispatch();
	const cards = useSelector((state: RootState) => state.cards);

	const handleAddCard = () => {
		dispatch(
			addCard({
				id: cards.length + 1,
				title: '제목 없는 질문',
				contents: '',
				isFocused: false,
				cardType: '단답형',
			}),
		);
	};
	return (
		<Container onClick={handleAddCard}>
			<AddCardIcon />
		</Container>
	);
}

export default AddCard;
