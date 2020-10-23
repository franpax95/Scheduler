import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../contexts/Context';

import { date2String } from '../../util';
import Calendar from '../../components/Calendar';


const DateSchedules = props => {
    const { loading, error, dateSchedules, getDateSchedules } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            if(!dateSchedules.length && !loading && !error){
                await getDateSchedules(props.match.params.date);
            }
        }

        fetchData();
    }, []);
    
    return (
        <div className="DateSchedules">
            
        </div>
    );
}

export default DateSchedules;