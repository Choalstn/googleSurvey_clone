import styled from 'styled-components';
import { InterCard, OptionType } from '../../store/cardSlice';
import { Select as MSelect, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';

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

	const contents = cardInfo.contents as OptionType[];
	const options = [] as string[];
	contents.map((el) => options.push(el.text!));
	console.log(options);

	const handleOptionChange = (e: SelectChangeEvent<unknown>) => {
		setSelectedOption(e.target.value as string);
	};
	return (
		<>
			<Select value={selectedOption} onChange={(e) => handleOptionChange(e)}>
				{options.map((el, idx) => (
					<MenuItem key={idx} value={el}>
						{el}
					</MenuItem>
				))}
			</Select>
		</>
	);
}

export default PreviewDropDown;
