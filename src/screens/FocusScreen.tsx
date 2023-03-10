import React from 'react'
import {Props} from '../types'

const FocusScreen: React.FC<Props> = ({focusedTask: task, shuffleFocusedTask, updateTaskCompletion}) => {

    const handledMarkComplited = () => {
        if (task)
        updateTaskCompletion(task.id, true)
    };

    return task ? (
    <div>
       <div>{task.label}</div>
        <button onClick={handledMarkComplited}>mark completed</button>
        <button onClick={shuffleFocusedTask}>another one</button>
    </div>
    )  :  (
    <div>No incomplete tasks</div>
    );
};

export default FocusScreen;