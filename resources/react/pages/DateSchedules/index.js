import React, { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';
import { StyledDateSchedules, StyledSchedule, StyledScheduleDate } from './style';


const DateSchedules = props => {
    const { loading, error, dateSchedules, getDateSchedules } = useContext(Context);
    const { date } = props.match.params;
    const formatDate = new Date(date).toDateString();

    useEffect(() => {
        const fetchData = async () => {
            if((!dateSchedules.length || date !== dateSchedules[0].date) && !loading && !error)
                await getDateSchedules(date);
        }
        fetchData();
    }, []);
    
    return (
        <StyledDateSchedules>
            <StyledScheduleDate>
                {formatDate}
            </StyledScheduleDate>

            {dateSchedules.map((sch) => (
                <StyledSchedule key={sch.id} to={`/schedule/${sch.id}`}>
                    {sch.name}
                </StyledSchedule>
            ))}
        </StyledDateSchedules>
    );
}

export default DateSchedules;