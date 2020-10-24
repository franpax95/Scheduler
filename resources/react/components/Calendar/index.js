import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './styles.css';

import { GoPrimitiveDot } from 'react-icons/go';

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
            if(currentMonthSchedules[date.getDate()]) {
                currentMonthSchedules[date.getDate()].push(name);
            }else{
                currentMonthSchedules = {
                    ...currentMonthSchedules,
                    [date.getDate()]: new Array(name)
                };
            }
            
        }
    });
    return currentMonthSchedules;
}



const CalendarNavbar = ({ month, nextMonth, previousMonth, onPreviousClick, onNextClick, localeUtils }) => {
    const months = localeUtils.getMonths();
    const prev = months[previousMonth.getMonth()];
    const next = months[nextMonth.getMonth()];

    return (
        <div className="CalendarNavbar">
          <button onClick={() => onPreviousClick()}>
            ← {prev.slice(0, 3)}
          </button>

          <div className="main">
            {`${months[month.getMonth()]} ${month.getFullYear()}`}
          </div>

          <button onClick={() => onNextClick()}>
            {next.slice(0, 3)} →
          </button>
        </div>
      );
}

const Weekday = ({ weekday, className, localeUtils, locale }) => {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
    return <div className={className} title={weekdayName}>{weekdayName}</div>;
}

const renderDay = (date, schedules, month) => {
    const day = date.getDate();
    const monthFormattedSchedules = getMonthFormattedSchedules(schedules, month);
    return (
        <div className="cell-style">
            <div className="date-style">{day}</div>

            {monthFormattedSchedules[day] 
                && <div className="name-style">
                    {monthFormattedSchedules[day].map((sch, key) => 
                        <span key={key}><GoPrimitiveDot size={10}/> {sch}</span>
                    )}
                </div>
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
        renderDay={(date) => renderDay(date, schedules,month)}
        onDayClick={handleDayClick}
        todayButton="Go To Today"
        navbarElement={<CalendarNavbar />}
        weekdayElement={<Weekday />}
    />;
}

export default Calendar;