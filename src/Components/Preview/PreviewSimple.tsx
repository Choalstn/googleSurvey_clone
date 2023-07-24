import styled, { css } from 'styled-components';
import { InterCard } from '../../store/cardSlice';

interface Props {
	cardInfo: InterCard;
}

interface CardType {
	cardType: string;
}

const Answer = styled.input<CardType>`
	border: none;
	margin: 15px;
	height: 3vh;
	width: 30%;
	margin-left: 23px;
	margin-bottom: 25px;
	font-size: 15px;
	border-bottom: 1px solid rgb(198, 199, 211);

	${(props) =>
		props.cardType === '장문형' &&
		css`
			width: 90%;
		`}

	&:hover {
		cursor: pointer;
	}

	&:focus {
		outline: none;
		border-bottom: 3px solid #673ab6;
	}
`;

function PreviewSimple({ cardInfo }: Props) {
	console.log(cardInfo.cardType);
	return (
		<>
			<Answer type="text" value="답변 ..." cardType={cardInfo.cardType} />
		</>
	);
}

export default PreviewSimple;
