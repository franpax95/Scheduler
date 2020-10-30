import React, { useContext, useEffect, useState } from 'react';
import { Context as ScheduleContext } from '../../contexts/ScheduleContext';

import { StyledDateSchedules, StyledScheduleLink, StyledScheduleDate } from './style';
import DateSchedulesAddButton from '../../components/DateSchedulesAddButton';



const DateSchedules = props => {
    const { date } = props.match.params;
    const formattedDate = new Date(date).toDateString();
    const { loading, error, schedulesByDate, getSchedulesByDate, addSchedule } = useContext(ScheduleContext);
    
    const [formDataName, setFormDataName] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            if((!schedulesByDate.length || date !== schedulesByDate[0].date) && !loading && !error)
                getSchedulesByDate(date);
        }
        fetchData();
    }, [date]);

    const submitForm = e => {
        e.preventDefault();
        if(addSchedule({ name: formDataName, date }));
            setFormDataName(''); //reset
    }
    
    if(loading) return 'Loading...';
    return (
        <StyledDateSchedules>
            <StyledScheduleDate>
                {formattedDate}
            </StyledScheduleDate>

            {schedulesByDate.map(sch => (
                <StyledScheduleLink key={sch.id} to={`/schedule/${sch.id}`}>
                    {sch.name}
                </StyledScheduleLink>
            ))}

            <DateSchedulesAddButton
                value={formDataName}
                onChange={e => { setFormDataName(e.target.value) }}
                onSubmit={submitForm}
                transitionDuration={400}
            />
        </StyledDateSchedules>
    );
}

export default DateSchedules;