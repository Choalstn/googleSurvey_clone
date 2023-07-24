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

const Radio = styled.input`
	appearance: none;
	cursor: pointer;
	margin-top: -3px;
	vertical-align: middle;
	border: 2px solid gray;
	border-radius: 50%;
	width: 20px;
	height: 20px;

	&:checked {
		border: 6px solid #673ab6;
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

function PreviewRadio({ cardInfo }: Props) {
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
							<Radio
								ref={etcRef}
								type="radio"
								name={`option_${cardInfo.id}`}
								value={el.text}
							/>
							{el.isEtc ? (
								<Label>
									<>
										<span>기타: </span>
										<EtcInput type="text" onChange={(e) => handleEtcValue(e)} />
									</>
								</Label>
							) : (
								<Label>{el.text}</Label>
							)}
						</div>
					))}
			</Container>
		</>
	);
}

export default PreviewRadio;
