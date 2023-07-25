import styled, { css } from 'styled-components';
import { InterCard, setText } from '../../store/cardSlice';
import { useDispatch } from 'react-redux';
import { deleterequiredOtems } from '../../store/requiredSlice';

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
	const dispatch = useDispatch();

	const handleUserAns = (
		e: React.ChangeEvent<HTMLInputElement>,
		cardId: number,
	) => {
		dispatch(
			setText({
				textId: Date.now(),
				id: cardId,
				text: e.target.value,
			}),
		);

		if (cardInfo.contents.length > 0) {
			dispatch(
				deleterequiredOtems({
					cardInfo,
				}),
			);
		}
	};
	return (
		<>
			<Answer
				type="text"
				value={cardInfo.contents as string}
				onChange={(e) => handleUserAns(e, cardInfo.id)}
				cardType={cardInfo.cardType}
			/>
		</>
	);
}

export default PreviewSimple;
