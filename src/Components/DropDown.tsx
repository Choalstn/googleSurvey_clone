import styled from 'styled-components';
import { Select as MSelect, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeType } from '../store/cardSlice';

const Select = styled(MSelect)`
	width: 45%;
	height: 48px;
	fieldset {
		border-width: 1px !important;
	}
`;

interface Props {
	id: number;
}

function DropDown({ id }: Props) {
	const dispatch = useDispatch();
	const arr = ['단답형', '장문형', '객관식 질문', '체크박스', '드롭다운'];

	const handleSelect = (e: SelectChangeEvent<unknown>) => {
		dispatch(changeType({ id, cardType: e.target.value as string }));
	};

	return (
		<>
			<Select onChange={handleSelect} defaultValue="단답형">
				{arr.map((el, idx) => (
					<MenuItem key={idx} value={el}>
						{el}
					</MenuItem>
				))}
			</Select>
		</>
	);
}

export default DropDown;
