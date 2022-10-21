import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Container from '@mui/material/Container';
import Taskfrom from './components/Taskfrom';
import TaskList from './components/TaskList';
import Menu from './components/Navbar'

function App() {
  return (
    <>
    <BrowserRouter>
    <Menu/>
    <Container>
    <Routes>
      <Route path='/' element={<TaskList/>}/>
      <Route path='/tasks/new' element={<Taskfrom/>} />
      <Route path='/tasks/:id/edit' element={<Taskfrom/>} />
    </Routes>
    </Container>
    </BrowserRouter>
    </>
  );
}

export default App;
