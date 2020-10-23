import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../contexts/Context';

import { date2String } from '../../util';
import Calendar from '../../components/Calendar';


const Home = props => {
    const { loading, error, schedules, getSchedules } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            if(!schedules.length && !loading && !error){
                await getSchedules();
            }
        }

        fetchData();
    }, []);

    const [month, setMonth] = useState(new Date());
    const onMonthChange = date => { setMonth(date); }

    const handleDayClick = day => {
        props.history.push(`/${date2String(day)}`);
    }

    return (
        <div className="Home">
            <Calendar 
                schedules={schedules}
                month={month}
                onMonthChange={onMonthChange}
                handleDayClick={handleDayClick}
            />
        </div>
    );
}

export default Home;