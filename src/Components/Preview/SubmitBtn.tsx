import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';

const Btn = styled.button`
	border: none;
	background-color: #673ab6;
	color: white;
	cursor: pointer;
	border-radius: 5px;
	width: 12%;
	margin-top: 15px;
	padding: 10px;
	font-weight: 450;
	font-size: 14px;
`;
function SubmitBtn() {
	const requiredCards = useSelector((state: RootState) => state.cards).filter(
		(el) => el.isRequired,
	);

	const requiredId = useSelector((state: RootState) => state.requiredItems);

	const handleSubmit = () => {
		const incompleteSimpleCards = requiredCards.filter(
			(el) => el.cardType === '단답형' && el.contents?.length === 0,
		);

		if (requiredId.length > 0 || incompleteSimpleCards.length > 0) {
			alert('필수 사항을 입력해주세요');
		} else {
			window.location.assign('/result');
		}
	};

	return (
		<>
			<Btn onClick={handleSubmit}>제출</Btn>
		</>
	);
}

export default SubmitBtn;
