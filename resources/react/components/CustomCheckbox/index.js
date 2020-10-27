import React from 'react';
import './styles.css';

export const CustomCheckbox = ({ name = '', checked, onChange }) => (
    <label className="control control-checkbox">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <div className="control_indicator"></div>
    </label>
);