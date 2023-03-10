import React from 'react'

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    updateTaskCompletion: (taskId: string, isComplete: boolean) => void;
};

type Task = {
    id: string;
    label: string;
    isComplete: boolean;
} 

const FocusScreen: React.FC<Props> = ({tasks, updateTaskCompletion}) => {
    const task = tasks.filter((task) => !task.isComplete)[0]

    const handledMarkComplited = () => {
        updateTaskCompletion(task.id, true)
    };

    return task ? (
    <div>
       <div>{task.label}</div>
        <button onClick={handledMarkComplited}>mark completed</button>
    </div>
    )  :  (
    <div>No incomplete tasks</div>
    );
};

export default FocusScreen;