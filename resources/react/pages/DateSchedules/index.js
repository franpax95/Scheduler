import React, { useContext, useEffect, useState } from 'react';
import { Context as ScheduleContext } from '../../contexts/ScheduleContext';

import { StyledDateSchedules, ScheduleLink, DeleteScheduleButton } from './style';
import Title from '../../components/Title';
import DateSchedulesAddButton from '../../components/DateSchedulesAddButton';

import { MdClose } from 'react-icons/md';



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
            <Title>{formattedDate}</Title>

            {schedulesByDate.map(sch => (
                <ScheduleLink key={sch.id} to={`/schedule/${sch.id}`}>
                    {sch.name}

                    <DeleteScheduleButton onClick={e => e.preventDefault()}>
                        <MdClose />
                    </DeleteScheduleButton>
                </ScheduleLink>
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