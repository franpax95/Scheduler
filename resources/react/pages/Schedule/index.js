import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../contexts/Context';

import {
    StyledTaskRowButton,
    StyledTaskInput,
    StyledSchedule,
    StyledTitle,
    StyledTaskRow,
    StyledDeleteButton
} from './style';
import { CustomCheckbox } from '../../components/CustomCheckbox';
import { IoMdCloseCircle } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';



const Schedule = props => {
    const { loading, error, schedule, getSchedule, changeTask, addTask, reorderTasks, deleteTask, submitTask } = useContext(Context);
    const ref = useRef();
    const [newElementOrder, setNewElementOrder] = useState(-1);

    useEffect(() => {
        const fetchData = async () => {
            if((!Object.values(schedule).length || props.match.params.id !== schedule.id) && !loading && !error){
                await getSchedule(props.match.params.id);
            }
        }

        fetchData();
    }, []);

    const onNameTaskChange = (e, task) => {
        changeTask({
            ...task,
            name: e.target.value
        });
    }

    const onBlurNameTaskChange = (e, task) => {
        submitTask(task);
        //console.log(task, schedule.tasks);
    }

    const onCompletedTaskChange = (e, task) => {
        changeTask({
            ...task,
            completed: Number(e.target.checked)
        });

        //submit data
    }

    const onAddTaskClick = order => {
        addTask(order);
        setNewElementOrder(order);
    }

    useEffect(() => {
        if(newElementOrder >= 0) {
            ref.current.children[newElementOrder].children[0].focus();
            setNewElementOrder(-1);
        }
    }, [newElementOrder]);
    
    return (<>
        {schedule.id === Number(props.match.params.id) && <StyledSchedule>
            <StyledTitle>{schedule.name}</StyledTitle>

            <StyledTaskRowButton onClick={() => onAddTaskClick(0)}>
                <GoPlus /> Add element
            </StyledTaskRowButton>

            <div ref={ref}>
                {schedule.tasks && schedule.tasks.map((task, key) => 
                    <StyledTaskRow key={key}>
                        <StyledTaskInput
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={e => onNameTaskChange(e, task) }
                            onBlur={e => onBlurNameTaskChange(e, task)}
                        />
                        
                        <CustomCheckbox
                            name="completed"
                            checked={task.completed}
                            onChange={e => onCompletedTaskChange(e, task)}
                        />

                        <StyledDeleteButton onClick={() => deleteTask(task.order)}>
                            <IoMdCloseCircle />
                        </StyledDeleteButton>
                    </StyledTaskRow>
                )}
            </div>

            <StyledTaskRowButton onClick={() => onAddTaskClick(schedule.tasks.length)}>
                <GoPlus /> Add element
            </StyledTaskRowButton>
            {/* <button onClick={() => { reorderTasks(0, 2) }}>Reorder</button> */}
        </StyledSchedule>}
    </>);
}

export default Schedule;