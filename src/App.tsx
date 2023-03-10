import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ListScreen from './screens/ListScreen';
import FocusScreen from './screens/FocusScreen';

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

function App() {
 const [tasks, setTasks] = useState<Task[]>([]);

 const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
     setTasks(tasks => 
         tasks.map(task => {
             if (task.id === taskId) 
                 return {...task, isComplete }
             return task;
         })
     ); 
  };

 const tasksApi = {tasks, setTasks, updateTaskCompletion};

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
