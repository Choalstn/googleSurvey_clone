import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { RootState } from '../store';
import { useEffect } from 'react';
import { addCard } from '../store/cardSlice';
import Card from '../Components/Card';

const Container = styled.div`
	margin: 20px;
	height: 100vh;
	width: 60vw;
`;

function CreateForm() {
	const dispatch = useDispatch();
	const cards = useSelector((state: RootState) => state.cards);

	useEffect(() => {
		if (cards.length < 2) {
			dispatch(
				addCard({
					id: cards.length,
					title: '제목 없는 질문',
					contents: '',
					isFocused: false,
					cardType: '단답형',
				}),
			);
		}
	}, []);

	return (
		<>
			<Container>
				{cards.map((card, idx) => (
					<Card
						key={card.id}
						idx={idx}
						isTitle={card.cardType === '제목'}
						{...card}
					/>
				))}
			</Container>
		</>
	);
}

export default CreateForm;
