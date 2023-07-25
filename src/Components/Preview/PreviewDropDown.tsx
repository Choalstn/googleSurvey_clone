import styled from 'styled-components';
import { InterCard, OptionType } from '../../store/cardSlice';
import { Select as MSelect, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectDrop } from '../../store/cardSlice';
import { deleterequiredOtems } from '../../store/requiredSlice';

interface Props {
	cardInfo: InterCard;
}

const Select = styled(MSelect)`
	margin-left: 22px;
	margin-bottom: 20px;
	width: 30%;
	height: 48px;
	fieldset {
		border-width: 1px !important;
	}
`;

function PreviewDropDown({ cardInfo }: Props) {
	const [selectedOption, setSelectedOption] = useState('');

	const dispatch = useDispatch();

	const contents = cardInfo.contents as OptionType[];

	const handleOptionChange = (e: SelectChangeEvent<unknown>) => {
		setSelectedOption(e.target.value as string);
	};

	const handleClickOption = (clickInfo: OptionType) => {
		const filter = contents.filter((el) => el.textId === clickInfo.textId);

		dispatch(
			selectDrop({
				id: cardInfo.id,
				textId: filter[0].textId,
				text: filter[0].text,
			}),
		);

		dispatch(
			deleterequiredOtems({
				cardInfo,
			}),
		);
	};
	return (
		<>
			<Select value={selectedOption} onChange={(e) => handleOptionChange(e)}>
				{contents.map((el, idx) => (
					<MenuItem
						key={idx}
						value={el.text}
						onClick={() => handleClickOption(el)}
					>
						{el.text}
					</MenuItem>
				))}
			</Select>
		</>
	);
}

export default PreviewDropDown;
