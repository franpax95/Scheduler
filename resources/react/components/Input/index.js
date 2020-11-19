import React from 'react';
import { StyledScheduleInput } from './style';

export const ScheduleInput = ({ name = 'name', value, onChange }) => 
    <StyledScheduleInput 
        type="text" 
        name={name} 
        value={value} 
        onChange={onChange} 
        autoComplete={"off"} 
    />;