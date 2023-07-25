import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/index';
import PreviewCard from '../Components/Preview/PreviewCards';
import SubmitBtn from '../Components/Preview/SubmitBtn';
import { useEffect } from 'react';
import { requiredItems } from '../store/requiredSlice';

const Container = styled.div`
	margin: 20px;
	height: 100vh;
	width: 60vw;
`;

function Preview() {
	const dispatch = useDispatch();

	const cards = useSelector((state: RootState) => state.cards);

	const requiredCards = useSelector((state: RootState) => state.cards).filter(
		(el) => el.isRequired,
	);

	const requiredId = useSelector((state: RootState) => state.requiredItems);

	console.log('idid', requiredId);

	useEffect(() => {
		for (let i = 0; i < requiredCards.length; i++) {
			dispatch(
				requiredItems({
					id: requiredCards[i].id,
				}),
			);
		}
	}, []);
	return (
		<>
			<Container>
				{cards.map((card, idx) => (
					<PreviewCard
						key={card.id}
						idx={idx}
						isTitle={card.cardType === '제목'}
						{...card}
					/>
				))}

				<SubmitBtn />
			</Container>
		</>
	);
}

export default Preview;
function dispatch(arg0: any) {
	throw new Error('Function not implemented.');
}
