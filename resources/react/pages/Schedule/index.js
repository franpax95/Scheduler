import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../contexts/Context';


const Schedule = props => {
    const { loading, error, schedule, getSchedule } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            if((!Object.values(schedule).length || props.match.params.id !== schedule.id) && !loading && !error){
                await getSchedule(props.match.params.id);
            }
        }

        fetchData();
    }, []);
    
    return (
        <div className="Schedule">

        </div>
    );
}

export default Schedule;