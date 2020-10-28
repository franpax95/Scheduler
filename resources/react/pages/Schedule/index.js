import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../contexts/Context';

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
import { CustomCheckbox } from '../../components/CustomCheckbox';
import { IoMdCloseCircle } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';



const Schedule = props => {
    const { loading, error, schedule, successToast, errorToast,
        getSchedule, changeTask, addTask, reorderTasks, deleteTask, submitTask, resetToasts
     } = useContext(Context);
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
        changeTask({ ...task, name: e.target.value });
        console.log('onchange', task);
    }

    const onBlurNameTaskChange = (e, task) => {
        console.log(task);
        submitTask(task);
    }

    useEffect(() => {
        if(errorToast.length){
            toast.error(errorToast, { style: {
                borderRadius: '0'
            }});
        }else if(successToast.length){
            toast.success(successToast, { style: {
                borderRadius: '0'
            }});
        }
        resetToasts();
    }, [successToast, errorToast]);

    const onCompletedTaskChange = (e, task) => {
        const newTask = { ...task, completed: Number(e.target.checked) };
        changeTask(newTask);
        submitTask(newTask);
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
            <ToastContainer 
                position="top-center"
                autoClose={1500}
                hideProgressBar
                closeOnClick
                oPauseOnHover={false}
                draggable
                progress={undefined}
            />

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