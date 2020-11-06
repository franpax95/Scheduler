import React, { useState } from 'react';
import { useTransition } from 'react-spring';
import { ScheduleInput } from '../Input'
import { AbsoluteWrapper, FormWrapper, Input, OpenButton, Submit, CloseButton } from './style';

const DateSchedulesAddButton = ({ name = 'name', value, onChange, onSubmit, duration = 100 }) => {
    const [toggle, setToggle] = useState(true);

    const transitions = useTransition(toggle, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
        config: { duration }
    });

    const onSubmitEffect = e => {
        onSubmit(e);
        setToggle(!toggle)
    }

    return(
        <AbsoluteWrapper>
            {transitions.map(({ item, key, props }) => 
                item
                    ? <FormWrapper onSubmit={onSubmitEffect} style={props} key={key}>
                        <ScheduleInput type="text" name={name} onChange={onChange} value={value} />
                        <Submit type="submit" value="Save" />
                        <CloseButton type="button" onClick={() => setToggle(!toggle)}>X</CloseButton>
                    </FormWrapper>
                    : <OpenButton onClick={() => setToggle(!toggle)} style={props} key={key}>
                        + Add schedule
                    </OpenButton>
            )}
        </AbsoluteWrapper>
    );
}

export default DateSchedulesAddButton;