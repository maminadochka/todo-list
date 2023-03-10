import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ListScreen from './screens/ListScreen';
import FocusScreen from './screens/FocusScreen';
import {Task} from './types';
import {shuffle} from 'lodash';
import {nanoid} from 'nanoid';



function App() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(undefined);


 const addTask = (task: Pick<Task, 'label'>) => {
    const id = nanoid();
    setTasks((tasks) => [...tasks,
        {id, label: task.label, isComplete: false}, 
    ]);
    if (!focusedTaskId) setFocusedTaskId(id)
 }

 const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
     setTasks(tasks => 
         tasks.map(task => {
             if (task.id === taskId) 
                 return {...task, isComplete }
             return task;
         })
     ); 
  };

 const focusedTask = tasks.find((task) => task.id === focusedTaskId);

 const shuffleFocusedTask = () => {
    setFocusedTaskId(
      shuffle(tasks.filter(task => !task.isComplete))[0]?.id ?? null
    );
 };

 const tasksApi = {
    addTask,
    focusedTask,
    tasks, 
    setTasks, 
    shuffleFocusedTask, 
    updateTaskCompletion
  };

  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" style={{fontWeight: 'bold'}}>List</NavLink>
        {'   '}
        <NavLink to="/focus" style={{fontWeight: 'bold'}}>Focus</NavLink>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<ListScreen {...tasksApi}/>}/>
        <Route path="/focus" element={<FocusScreen {...tasksApi}/>} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
