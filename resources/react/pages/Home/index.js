import React, { useState } from 'react';
import { date2String } from '../../util';
import Calendar from '../../components/Calendar';

/** temporal */
const Schedules = [
    {
        id: 0,
        name: 'Horario semanal',
        date: '2020-10-22',
    },
    {
        id: 1,
        name: 'Mi cumpleaños',
        date: '2020-10-6'
    },
    {
        id: 2,
        name: 'Horario semanal',
        date: '2020-11-6'
    }
];

const Home = props => {
    const[month, setMonth] = useState(new Date());
    const onMonthChange = date => { setMonth(date); }

    const handleDayClick = day => {
        props.history.push(`/${date2String(day)}`);
    }

    return (
        <div className="Home">
            <Calendar 
                schedules={Schedules}
                month={month}
                onMonthChange={onMonthChange}
                handleDayClick={handleDayClick}
            />
        </div>
    );
}

export default Home;