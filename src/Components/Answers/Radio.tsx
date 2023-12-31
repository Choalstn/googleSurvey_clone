import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	InterCard,
	OptionType,
	addCardOption,
	addEtcOption,
	deleteCardOption,
	setText,
} from '../../store/cardSlice';
import { ReactComponent as SvgCircle } from '../../assets/radioCircle.svg';
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
const AnswerEtc = styled.div`
	border: none;
	border-bottom: 1px dotted rgb(198, 199, 211);
	margin: 15px;
	margin-left: 5px;
	width: 80%;
	padding: 5px;
	color: gray;
	font-size: 15px;

	&:focus {
		outline: none;
	}
`;

const RadioCircle = styled(SvgCircle)`
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
function Radio({ cardInfo }: Props) {
	const contents = cardInfo.contents as OptionType[];

	const dispatch = useDispatch();

	const handleAddOption = () => {
		dispatch(
			addCardOption({
				id: cardInfo.id,
				textId: Date.now(),
				text: `옵션 ${contents.filter((el) => !el.isEtc).length + 1}`,
			}),
		);
	};

	const handleAddEtcOption = () => {
		dispatch(
			addEtcOption({
				id: cardInfo.id,
				textId: Date.now(),
				text: '기타...',
			}),
		);
	};

	const handleOptionValue = (
		e: React.ChangeEvent<HTMLInputElement>,
		textId: number,
	) => {
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
							<RadioCircle />
							{el.isEtc ? (
								<AnswerEtc>기타...</AnswerEtc>
							) : (
								<Answer
									defaultValue={el.text}
									onChange={(e) => handleOptionValue(e, el.textId)}
								/>
							)}
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
					<RadioCircle />
					<p>
						<span className="addOption" onClick={handleAddOption}>
							옵션추가
						</span>
						{contents.filter((el) => el.isEtc).length === 0 && (
							<>
								&nbsp; 또는 &nbsp;
								<span className="addEtc" onClick={handleAddEtcOption}>
									'기타'추가
								</span>
							</>
						)}
					</p>
				</AddOption>
			</Container>
		</>
	);
}

export default Radio;
