import React from 'react'

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export type Task = {
    id: string;
    label: string;
    isComplete: boolean;
} 

const FocusScreen: React.FC<Props> = ({tasks}) => {
    const task = tasks[0]

    return task ? <div>{task.label}</div> : <div>No tasks</div>;
};

export default FocusScreen;