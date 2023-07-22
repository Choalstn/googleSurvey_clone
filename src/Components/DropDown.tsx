import styled from 'styled-components';
import { Select as MSelect, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InterCard, changeType } from '../store/cardSlice';
import { RootState } from '../store';

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
	const cardInfo = useSelector((state: RootState) =>
		state.cards.find((el) => el.id === id),
	) as InterCard;

	const handleSelect = (e: SelectChangeEvent<unknown>) => {
		dispatch(changeType({ id, cardType: e.target.value as string }));
	};

	return (
		<>
			<Select
				onChange={handleSelect}
				defaultValue="단답형"
				value={cardInfo.cardType}
			>
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
