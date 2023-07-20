import { styled } from 'styled-components';
import { ReactComponent as SvgEye } from '../assets/eye.svg';

const Container = styled.div`
	background-color: white;
	height: 10vh;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 60px;
`;

const Eye = styled(SvgEye)`
	width: 30px;
	height: 30px;
	padding: 8px;
	cursor: pointer;

	&:hover {
		border-radius: 100%;
		background-color: #acacac9d;
	}
`;

function Header() {
	return (
		<Container>
			<Eye></Eye>
		</Container>
	);
}

export default Header;
