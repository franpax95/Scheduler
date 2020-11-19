import React from 'react';
import { StyledQuitButton, StyledScheduleSubmitButton } from './style';

import { MdClose } from 'react-icons/md';

export const ScheduleSubmitButton = ({ value = 'Submit' }) => (
    <StyledScheduleSubmitButton type="submit" value={value} />
);

export const QuitButton = ({ onClick, style, size = 'big' }) => {
    const _size = (size !== 'big' && size !== 'small') ? 'big' : size;
    return (
        <StyledQuitButton type="button" onClick={onClick} style={style} size={_size} >
            <MdClose />
        </StyledQuitButton>
    );
}