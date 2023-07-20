import { styled } from 'styled-components';

const Container = styled.div`
	border: none;
	border-bottom: 1px solid rgb(198, 199, 211);
	min-height: 9vh;
	margin: 10px;

	> div {
		display: flex;
		align-items: center;
	}
`;

const Answer = styled.div`
	border: none;
	border-bottom: 1px dotted rgb(198, 199, 211);
	margin: 15px;
	width: 70%;
	padding: 10px;
	color: gray;
	font-size: 12px;

	&:focus {
		outline: none;
	}
`;
function Simple() {
	return (
		<Container>
			<Answer>텍스트</Answer>
		</Container>
	);
}

export default Simple;
