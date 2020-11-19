import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context as ScheduleContext } from '../../contexts/ScheduleContext';
import { Context as TaskContext } from '../../contexts/TaskContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { StyledTaskRowButton, StyledTaskInput, StyledSchedule, StyledTaskRow } from './style';

import Toast from '../../components/Toast';
import Title from '../../components/Title';
import { CustomCheckbox } from '../../components/CustomCheckbox';
import { QuitButton } from '../../components/Button';
import { GoPlus } from 'react-icons/go';




const Schedule = props => {
    const { loading, error, schedule, getSchedule } = useContext(ScheduleContext);
    const { 
        loading: taskLoading, error: taskError, tasks, toastSuccess, toastError, scheduleId,
        getTasks, submitTask, deleteTask, changeSchedule, changeTask, swapTasks, addTask, resetToasts
    } = useContext(TaskContext);

    const listWrapperRef = useRef();
    const lastAddButtonRef = useRef();
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

    const onDragStart = () => {
        lastAddButtonRef.current.style.marginTop = '100px';
    }

    const onDragEnd = result => {
        lastAddButtonRef.current.style.marginTop = '10px';

        if (!result.destination) {
            return;
        }
    
        if (result.destination.index === result.source.index) {
            return;
        }

        swapTasks(result.source.index, result.destination.index);
    }


    /** effects */
    // focus new input after add task effect
    useEffect(() => {
        if(newElementOrder >= 0 && listWrapperRef.current.children.length) {
            listWrapperRef.current.children[0].children[newElementOrder].children[0].focus();
            setNewElementOrder(-1);
        }
    }, [newElementOrder]);
    


    if(loading) return 'Loading...';
    return (<>
        {schedule.id === Number(props.match.params.id) && <StyledSchedule>
            <Toast toastError={toastError} toastSuccess={toastSuccess} resetToasts={resetToasts} />

            <Title>{schedule.name}</Title>

            <StyledTaskRowButton onClick={() => onAddTaskClick(0)}>
                <GoPlus /> Add element
            </StyledTaskRowButton>


            <div ref={listWrapperRef}>
                <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onDragStart}>
                    <Droppable droppableId="list">
                        {provided => (
                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                {tasks.map((task, key) => (
                                    <Draggable key={key} draggableId={`${key}`} index={key}>
                                        {provided => (
                                            <StyledTaskRow {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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

                                                {/* <StyledDeleteButton onClick={() => deleteTask(task.id)}>
                                                    <IoMdCloseCircle />
                                                </StyledDeleteButton> */}
                                                <QuitButton onClick={() => deleteTask(task.id)} size={'small'} />
                                            </StyledTaskRow>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <StyledTaskRowButton onClick={() => onAddTaskClick(tasks.length)} ref={lastAddButtonRef}>
                <GoPlus /> Add element
            </StyledTaskRowButton>
        </StyledSchedule>}
    </>);
}

export default Schedule;