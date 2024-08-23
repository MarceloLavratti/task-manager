import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Homepage from '../homepage/homepage'
import { fetchUsers } from '../../services/apiServices'
import { useAuth } from '../../context/AuthContext'
import './login.css'

const Login = () => {

    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const { isLoggedIn, login } = useAuth()
    const [userId, setUserId] = useState()

    const handleLogin = async () => {
        try {
            const users = await fetchUsers()
            const userData = users.find(user => user.email === inputEmail)
            if (userData.password === inputPassword) {
                setUserId(userData._id)
                login(userData._id)
            }
        } catch (err) {
            console.log('Erro ao fazer login')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <>
            {isLoggedIn[0]
                ? <Homepage />
                : (
                    <div className='login-main'>
                        <h2>Faça seu login</h2>
                        <input
                            type='email'
                            placeholder='e-mail'
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Senha'
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className='login-btn'>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                        <div>
                            <Link to='/signin' className='link-style'>
                                <span className='link-style'>Não tem cadastro? Faça o seu aqui!</span>
                            </Link>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Login