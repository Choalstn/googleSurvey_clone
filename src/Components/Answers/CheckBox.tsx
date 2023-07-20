import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InterCard } from '../../store/cardSlice';
import { ReactComponent as SvgSquare } from '../../assets/CheckBoxSquare.svg';

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

const Answer = styled.input`
	border: none;
	margin: 15px;
	width: 80%;
	height: 3vh;
	padding: 5px;
	margin-left: 5px;
	font-size: 15px;

	&:hover {
		border-bottom: 1px solid rgb(198, 199, 211);
	}

	&:focus {
		outline: none;
		border-bottom: 3px solid #673ab6;
	}
`;

const CheckBoxSquare = styled(SvgSquare)`
	width: 23px;
	height: 23px;
`;

const AddOption = styled.div`
	font-size: 14px;

	> p {
		margin-left: 10px;
		font-weight: 500;
	}

	.addOption {
		color: #6c6b6b;
		cursor: pointer;

		&:hover {
			border-bottom: 1px solid rgb(218, 219, 233);
		}
	}

	.addEtc {
		color: #1b72e8;
		cursor: pointer;

		&:hover {
			border-radius: 3px;
			background-color: #e0edffdf;
		}
	}
`;

interface Props {
	cardInfo: InterCard;
}
function CheckBox({ cardInfo }: Props) {
	return (
		<>
			<Container>
				{Array.isArray(cardInfo.contents) &&
					cardInfo.contents.map((el, idx) => (
						<div>
							<CheckBoxSquare />
							<Answer defaultValue={el.text} />
						</div>
					))}

				<AddOption>
					<CheckBoxSquare />
					<p>
						<span className="addOption">옵션추가</span> &nbsp; 또는 &nbsp;
						<span className="addEtc">'기타'추가</span>
					</p>
				</AddOption>
			</Container>
		</>
	);
}

export default CheckBox;
