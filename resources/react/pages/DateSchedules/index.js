import React, { useContext, useEffect } from 'react';
import { Context as ScheduleContext } from '../../contexts/ScheduleContext';

import { StyledDateSchedules, StyledSchedule, StyledScheduleDate } from './style';



const DateSchedules = props => {
    const { date } = props.match.params;
    const formattedDate = new Date(date).toDateString();
    const { loading, error, schedulesByDate, getSchedulesByDate } = useContext(ScheduleContext);
    
    useEffect(() => {
        const fetchData = async () => {
            
            console.log(date);
            if((!schedulesByDate.length || date !== schedulesByDate[0].date) && !loading && !error)
                await getSchedulesByDate(date);
        }
        fetchData();
    }, []);
    
    
    if(loading) return 'Loading...';
    return (
        <StyledDateSchedules>
            <StyledScheduleDate>
                {formattedDate}
            </StyledScheduleDate>

            {schedulesByDate.map(sch => (
                <StyledSchedule key={sch.id} to={`/schedule/${sch.id}`}>
                    {sch.name}
                </StyledSchedule>
            ))}
        </StyledDateSchedules>
    );
}

export default DateSchedules;