import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './styles.css';

//import prueba

/**
 * returns an object of schedules prepare to display renderDay:
 * currentMonthSchedules = { [day]: name of lists, [day]: name of lists...}
 * 
 * @param {*} schedules array of Objects => { id, name, date }, date in string format
 * @param {*} month     current displayed month instance of Date
 */
const getMonthFormattedSchedules = (schedules, month) => {
    let currentMonthSchedules = {};
    schedules.map(({ date: strDate, name }) => {
        const date = new Date(strDate);
        if(date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth()){
            currentMonthSchedules = {
                ...currentMonthSchedules,
                [date.getDate()]: name
            };
        }
    });
    return currentMonthSchedules;
}

const renderDay = (day, schedules, month) => {
    const date = day.getDate();
    const monthFormattedSchedules = getMonthFormattedSchedules(schedules, month);
    return (
        <div className="cell-style">
            <div className="date-style">{date}</div>
            {monthFormattedSchedules[date] 
                && <div className="name-style">{monthFormattedSchedules[date]}</div>
            }
        </div>
    );
}

/**
 * main
 */
const Calendar = ({ schedules, month, onMonthChange, handleDayClick }) => {
    return <DayPicker
        month={month}
        onMonthChange={onMonthChange}
        renderDay={(day) => renderDay(day, schedules,month)}
        // selectedDays={schedules2Date(schedules)}
        onDayClick={handleDayClick}
        todayButton="Go To Today"
    />;
}

export default Calendar;