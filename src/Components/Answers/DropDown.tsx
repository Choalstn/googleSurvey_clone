import styled from 'styled-components';
import {
	InterCard,
	addCardOption,
	deleteCardOption,
	setText,
} from '../../store/cardSlice';
import { useDispatch } from 'react-redux';
import { ReactComponent as SvgDeleteOption } from '../../assets/deleteOption.svg';

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

const Front = styled.div`
	width: 23px;
	height: 23px;
	display: flex;
	justify-content: center;
`;

const AddOption = styled.div`
	font-size: 14px;

	> p {
		display: flex;
		font-weight: 500;
	}

	.addOption {
		color: #6c6b6b;
		cursor: pointer;
		margin-left: 7px;

		&:hover {
			border-bottom: 1px solid rgb(218, 219, 233);
		}
	}
`;

const DeleteOption = styled(SvgDeleteOption)`
	width: 23px;
	height: 23px;
	padding: 8px;
	cursor: pointer;

	&:hover {
		border-radius: 100%;
		background-color: #ededed9d;
	}
`;

interface Props {
	cardInfo: InterCard;
}
function DropDown({ cardInfo }: Props) {
	const dispatch = useDispatch();
	const handleAddOption = () => {
		dispatch(
			addCardOption({
				id: cardInfo.id,
				textId: cardInfo.contents.length + 1,
				text: `옵션 ${cardInfo.contents.length + 1}`,
			}),
		);
	};

	const handleOptionValue = (
		e: React.ChangeEvent<HTMLInputElement>,
		textId: number,
	) => {
		console.log(e.target.value, textId);
		dispatch(
			setText({
				textId,
				id: cardInfo.id,
				text: e.target.value,
			}),
		);
	};
	return (
		<>
			<Container>
				{Array.isArray(cardInfo.contents) &&
					cardInfo.contents.map((el, idx) => (
						<div key={el.textId}>
							<Front>{idx + 1}</Front>
							<Answer
								defaultValue={el.text}
								onChange={(e) => handleOptionValue(e, el.textId)}
							/>
							{cardInfo.contents.length > 1 && (
								<DeleteOption
									onClick={() => {
										dispatch(
											deleteCardOption({
												id: cardInfo.id,
												textId: el.textId,
											}),
										);
									}}
								/>
							)}
						</div>
					))}

				<AddOption>
					<p>
						<Front>{cardInfo.contents.length + 1}</Front>
						<span className="addOption" onClick={handleAddOption}>
							옵션추가
						</span>
					</p>
				</AddOption>
			</Container>
		</>
	);
}

export default DropDown;
