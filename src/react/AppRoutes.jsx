import React from 'react'

import { Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import Task from './Pages/Task'
import StartTask from './Pages/StartTask'

import Error404 from './Pages/Error404'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Task" element={<Task />} />
    <Route path="/StartTask" element={<StartTask />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
