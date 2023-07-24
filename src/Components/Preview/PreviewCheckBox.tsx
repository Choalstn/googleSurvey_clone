import styled from 'styled-components';
import { InterCard } from '../../store/cardSlice';
import { useRef } from 'react';

interface Props {
	cardInfo: InterCard;
}

const Container = styled.div`
	min-height: 9vh;
	margin: 10px;

	> div {
		padding: 15px;
	}
`;

const CheckBox = styled.input`
	appearance: none;
	cursor: pointer;
	margin-top: -3px;
	vertical-align: middle;
	border: 2px solid gray;
	border-radius: 4px;
	width: 20px;
	height: 20px;

	+ label {
		cursor: pointer;
	}

	&:checked {
		border-color: transparent;
		background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
		background-size: 100% 100%;
		background-position: 50%;
		background-repeat: no-repeat;
		background-color: #673ab6;
	}
`;

const Label = styled.label`
	align-items: center;
	cursor: pointer;
	padding-left: 12px;
`;

const EtcInput = styled.input`
	border: none;
	width: 80%;
	height: 1vh;
	padding: 5px;
	margin-left: 5px;
	font-size: 15px;

	&:hover {
		border-bottom: 1px solid rgb(198, 199, 211);
	}

	&:focus {
		outline: none;
		border-bottom: 2px solid #673ab6;
	}
`;

function PreviewCheckBox({ cardInfo }: Props) {
	const etcRef = useRef<HTMLInputElement>(null);

	const handleEtcValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		etcRef.current!.checked = true;
	};
	return (
		<>
			<Container>
				{Array.isArray(cardInfo.contents) &&
					cardInfo.contents.map((el, idx) => (
						<div key={el.textId}>
							<CheckBox
								ref={etcRef}
								type="checkbox"
								name={`option_${cardInfo.id}`}
								value={el.text}
								id="checkbox"
							/>
							{el.isEtc ? (
								<Label htmlFor="checkbox">
									<>
										<span>기타: </span>
										<EtcInput type="text" onChange={(e) => handleEtcValue(e)} />
									</>
								</Label>
							) : (
								<Label htmlFor="checkbox">{el.text}</Label>
							)}
						</div>
					))}
			</Container>
		</>
	);
}

export default PreviewCheckBox;
