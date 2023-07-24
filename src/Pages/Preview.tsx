import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/index';
import PreviewCard from '../Components/Preview/PreviewCards';

const Container = styled.div`
	margin: 20px;
	height: 100vh;
	width: 60vw;
`;

function Preview() {
	const cards = useSelector((state: RootState) => state.cards);

	console.log('cards', cards);
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
			</Container>
		</>
	);
}

export default Preview;
