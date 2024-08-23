import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './header.css'
import taskImg from '../../../public/task-7.png'

const Header = () => {

    const { isLoggedIn, logout } = useAuth()

    return (
        <div className='header-style'>
            <Link to={'/'}>
                <img src={taskImg} alt='task_img' />
            </Link>
            {isLoggedIn[0] && <button onClick={logout}>Logout</button>}
        </div>
    )
}

export default Header
