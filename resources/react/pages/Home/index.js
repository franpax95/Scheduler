import React, { useContext, useEffect, useState } from 'react';
import { Context as ScheduleContext } from '../../contexts/ScheduleContext';

import Calendar from '../../components/Calendar';
import { StyledHome } from './style';

import { date2String } from '../../util';



const Home = props => {
    const { loading, error, schedules, getSchedules } = useContext(ScheduleContext);

    useEffect(() => {
        const fetchData = async () => {
            if(!schedules.length && !loading && !error)
                await getSchedules();
        }
        fetchData();
    }, []);

    const [month, setMonth] = useState(new Date());
    const onMonthChange = date => { setMonth(date); }

    const handleDayClick = day => { props.history.push(`/${date2String(day)}`); }

    if(loading) return 'Loading...';
    return (
        <StyledHome>
            <Calendar 
                schedules={schedules}
                month={month}
                onMonthChange={onMonthChange}
                handleDayClick={handleDayClick}
            />
        </StyledHome>
    );
}

export default Home;