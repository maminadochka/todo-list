import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {nanoid} from 'nanoid';

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export type Task = {
    id: string;
    label: string;
    isComplete: boolean;
}

const ListScreen: React.FC<Props> = ({ tasks, setTasks}) => {
    const [newTaskLabel, setNewTaskLabel] = useState('');

    const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value);
    
    const handleNewTaskLabelKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
     if (e.key === 'Enter' && newTaskLabel !== '') {
        setTasks((tasks) => [...tasks,{id: nanoid(), label: newTaskLabel, isComplete: false}]);
        setNewTaskLabel('');
        }
    };

    const handleTaskCompleteChange = (handledTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
        setTasks(tasks => 
            tasks.map(task => {
                if (task.id === handledTask.id) 
                    return {...task, isComplete: e.target.checked}
                return task;
            })
        ); 
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