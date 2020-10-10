import React from 'react';
import { StyledUserForm } from './style';

const DEFAULT_ON_SUBMIT = e => {
    e.preventDefault();
    console.log(e.target.value);
}

export const UserForm = ({ onSubmit, children }) => {
    const _onSubmit = onSubmit || DEFAULT_ON_SUBMIT;

    return (
        <StyledUserForm onSubmit={_onSubmit}>
            {children}
        </StyledUserForm>
    );
}

