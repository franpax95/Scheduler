import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context as ScheduleContext } from '../../contexts/ScheduleContext';
import { Context as TaskContext } from '../../contexts/TaskContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    StyledTaskRowButton,
    StyledTaskInput,
    StyledSchedule,
    StyledTitle,
    StyledTaskRow,
    StyledDeleteButton
} from './style';
import Title from '../../components/Title';
import { CustomCheckbox } from '../../components/CustomCheckbox';
import { IoMdCloseCircle } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';



const Schedule = props => {
    const { loading, error, schedule, getSchedule } = useContext(ScheduleContext);
    const { 
        loading: taskLoading, error: taskError, tasks, toastSuccess, toastError, scheduleId,
        getTasks, submitTask, deleteTask, changeSchedule, changeTask, swapTasks, addTask, resetToasts
    } = useContext(TaskContext);

    const ref = useRef();
    const [newElementOrder, setNewElementOrder] = useState(-1);


    /** fetch effects */
    // schedule effect
    useEffect(() => {
        const fetchData = async () => {
            const { id } = props.match.params;
            if((!Object.values(schedule).length || id !== schedule.id) && !loading && !error) {
                changeSchedule(id);
                await getSchedule(id);
            }
        }
        fetchData();
    }, [schedule]);

    //tasks effect
    useEffect(() => {
        const fetchData = async () => {
            const { id } = props.match.params;
            if((!tasks.length || id !== scheduleId) && !taskLoading && !taskError)
                await getTasks();
        }

        if(Object.values(schedule).length) fetchData();
    }, [schedule, tasks]);


    /** event handlers */
    const onNameTaskChange = (e, task) => { changeTask({ ...task, name: e.target.value }); }
    const onNameTaskBlur = task => { submitTask(task); }
    const onNameTaskKeyPress = e => {
        if(e.key === "Enter") 
            e.target.blur();
    }

    const onCompletedTaskChange = (e, task) => {
        if(task.id){ //prevent duplications
            const newTask = { ...task, completed: Number(e.target.checked) };
            changeTask(newTask);
            submitTask(newTask);
        }
    }

    const onAddTaskClick = order => {
        addTask(order);
        setNewElementOrder(order);
    }


    /** effects */
    // toasts effect
    useEffect(() => {
        if(toastError.length){
            toast.error(toastError, { style: {
                borderRadius: '0'
            }});
        }else if(toastSuccess.length){
            toast.success(toastSuccess, { style: {
                borderRadius: '0'
            }});
        }
        resetToasts(); //No estoy seguro de si es necesario
    }, [toastError, toastSuccess]);

    // focus new input after add task effect
    useEffect(() => {
        if(newElementOrder >= 0 && ref.current.children.length) {
            ref.current.children[newElementOrder].children[0].focus();
            setNewElementOrder(-1);
        }
    }, [newElementOrder]);
    


    if(loading) return 'Loading...';
    return (<>
        {schedule.id === Number(props.match.params.id) && <StyledSchedule>
            <ToastContainer 
                position="top-center"
                autoClose={1500}
                hideProgressBar
                closeOnClick
                oPauseOnHover={false}
                draggable
                progress={undefined}
            />

            <Title>{schedule.name}</Title>

            <StyledTaskRowButton onClick={() => onAddTaskClick(0)}>
                <GoPlus /> Add element
            </StyledTaskRowButton>

            <div ref={ref}>
                {tasks.map(task => 
                    <StyledTaskRow key={task.order} draggable>
                        <StyledTaskInput
                            type="text"
                            name="name"
                            value={task.name}
                            onKeyPress={onNameTaskKeyPress}
                            onChange={e => onNameTaskChange(e, task) }
                            onBlur={() => onNameTaskBlur(task)}
                            disabled={taskLoading}
                        />
                        
                        <CustomCheckbox
                            name="completed"
                            checked={task.completed}
                            onChange={e => onCompletedTaskChange(e, task)}
                            disabled={taskLoading}
                        />

                        <StyledDeleteButton onClick={() => deleteTask(task.id)}>
                            <IoMdCloseCircle />
                        </StyledDeleteButton>
                    </StyledTaskRow>
                )}
            </div>

            <StyledTaskRowButton onClick={() => onAddTaskClick(tasks.length)}>
                <GoPlus /> Add element
            </StyledTaskRowButton>
            {/* <button onClick={() => { reorderTasks(0, 2) }}>Reorder</button> */}
        </StyledSchedule>}
    </>);
}

export default Schedule;