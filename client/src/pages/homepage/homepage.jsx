import React from 'react'
import Login from '../login/login'
import TaskList from '../../components/taskList/taskList'
import { useAuth } from '../../context/AuthContext'

const Homepage = () => {

  const { isLoggedIn } = useAuth()
  
  return (
    <>
      {isLoggedIn[0]        
        ? (<div>
          <TaskList userId={isLoggedIn} />
        </div>)
        : <Login />}
    </>
  )
}

export default Homepage