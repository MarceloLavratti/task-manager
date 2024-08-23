import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/apiServices';
import './signin.css'

const Signin = () => {

  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
  const [inputPasswordCheck, setInputPassowrdCheck] = useState('')
  const [error, setError] = useState(null);
  const [isCredentialsOk, setIsCredentialsOk] = useState(0)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate()

  const handleCreateUser = async () => {
    try {
      const createdUser = await createUser(newUser)
      setUsers([...users, createdUser])
      setNewUser({ name: '', email: '', password: '' })
    } catch (err) {
      setError('Erro ao criar usuário')
    }
  }

  const handleSignin = (e) => {
    e.preventDefault()
    if (newUser.name && validateEmail(newUser.email) && newUser.password === inputPasswordCheck) {
      setIsCredentialsOk(1)
      handleCreateUser()
      navigate('/')
    } else {
      setIsCredentialsOk(2)
    }
  }

  const validateEmail = () => {
    return emailPattern.test(newUser.email);
  }

  return (
    <div className='signin-style'>
      <input
        type='text'
        placeholder='Nome'
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type='email'
        placeholder='E-mail'
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type='password'
        placeholder='Senha'
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <input
        type='password'
        placeholder='Repita a senha'
        value={inputPasswordCheck}
        onChange={(e) => setInputPassowrdCheck(e.target.value)}
      />
      <div className='btn-wrong'>
        <button onClick={handleSignin}>Sign in</button>
        {isCredentialsOk == 2 &&
          <span>Verifique informações digitadas</span>
        }
      </div>
    </div>
  )
}

export default Signin
