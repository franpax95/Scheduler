import React from 'react';
import { StyledUserFormInput, StyledUserFormSubmit } from './style';

const DEFAULT_ON_CHANGE = e => {
    console.log(e.target.value);
}

export const UserFormInput = ({ type = 'text', name, placeholder, onChange }) => {
    const _onChange = onChange || DEFAULT_ON_CHANGE;

    return <StyledUserFormInput 
        type={ type }
        name={ name || '' }
        placeholder={ placeholder || '' }
        onChange={ _onChange }
    />;
}

export const UserFormSubmit = ({ value = '' }) => {
    return <StyledUserFormSubmit type="submit" value={value} />;
}