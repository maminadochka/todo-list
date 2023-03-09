import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ListScreen from './screens/ListScreen';
import FocusScreen from './screens/FocusScreen';

export type Task = {
  id: string;
  label: string;
  isComplete: boolean;
}

function App() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const tasksProps = {tasks, setTasks}

  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" style={{fontWeight: 'bold'}}>List</NavLink>
        {'   '}
        <NavLink to="/focus" style={{fontWeight: 'bold'}}>Focus</NavLink>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<ListScreen {...tasksProps}/>}/>
        <Route path="/focus" element={<FocusScreen {...tasksProps}/>} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
