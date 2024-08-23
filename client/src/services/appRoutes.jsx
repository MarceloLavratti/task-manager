import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/homepage/homepage';
import Login from '../pages/login/login';
import Signin from '../pages/signin/signin';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signin' element={<Signin />}/>
    </Routes>
  )
}

export default AppRoutes