import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {Task, Props} from '../types'


const ListScreen: React.FC<Props> = ({ addTask, tasks, setTasks, updateTaskCompletion}) => {
    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value);
    
    const handleNewTaskLabelKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
     if (e.key === 'Enter' && newTaskLabel !== '') {
            addTask({label: newTaskLabel})
        setNewTaskLabel('');
        }
    };

    const handleTaskCompleteChange = 
        (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
            updateTaskCompletion(task.id, e.target.checked)
        };

    const handleClearClick = () => 
        setTasks((tasks) => tasks.filter((task) => !task.isComplete))

    const handleTaskDeleteClick = (handledTask: Task) => () => {
        setTasks((tasks) => tasks.filter((task) => task.id !== handledTask.id))
    };   

    return ( 
    <div>
        <div>
            {tasks.map((task: Task) => 
                <div key={task.id}>
                    <input type="checkbox" checked={task.isComplete} onChange={handleTaskCompleteChange(task)}
                    />{' '} 
                    {task.label}
                    <button onClick={handleTaskDeleteClick(task)}>delete</button>
                </div>)}
        </div>
        <input 
            value={newTaskLabel} 
            onChange={handleNewTaskLabelChange} 
            onKeyDown={handleNewTaskLabelKeyDown}
        /> 
        <div>
        <button onClick={handleClearClick}>clear completed</button>
        </div>        
    </div>
    );
    
};

export default ListScreen;