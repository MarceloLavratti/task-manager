import React, { useState, useEffect } from 'react'
import { updateUserTasks, fetchUserById } from '../../services/apiServices'
import './taskList.css'

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([])
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [lineThroughIndices, setLineThroughIndices] = useState([])
  const [editTaskId, setEditTaskId] = useState(null)
  const [editTaskDescription, setEditTaskDescription] = useState('')
  const [filter, setFilter] = useState('all') // Estado para o filtro

  const handleUpdateUserTasks = async (updatedTasks) => {
    try {
      const updatedUser = await updateUserTasks(userId, updatedTasks)
      console.log('Tarefas atualizadas:', updatedUser)
    } catch (error) {
      console.error('Erro ao atualizar tarefas:', error)
    }
  }

  const fetchUser = async () => {
    try {
      const user = await fetchUserById(userId)
      setTasks(user.tasks)
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
    }
  }

  const handleAddTasks = async () => {
    const newTask = {
      description: newTaskDescription,
      completed: false,
    }
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    setNewTaskDescription('')
    handleUpdateUserTasks(updatedTasks)
  }

  const handleRemoveTasks = async (taskId) => {
    const updatedTasks = tasks.filter(task => task._id !== taskId)
    setTasks(updatedTasks)
    handleUpdateUserTasks(updatedTasks)
  }

  const toggleTaskCheck = async (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task._id === taskId) {
        task.completed = !task.completed
      }
      return task
    })
    setTasks(updatedTasks)
    handleUpdateUserTasks(updatedTasks)
    toggleLine(taskId)
  }

  const toggleLine = (taskId) => {
    setLineThroughIndices(prevIndices =>
      prevIndices.includes(taskId)
        ? prevIndices.filter(i => i !== taskId)
        : [...prevIndices, taskId]
    )
  }

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task._id === taskId)
    setEditTaskId(taskId)
    setEditTaskDescription(taskToEdit.description)
  }

  const handleSaveTask = async (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task._id === taskId) {
        task.description = editTaskDescription
      }
      return task
    })
    setTasks(updatedTasks)
    setEditTaskId(null)
    setEditTaskDescription('')
    handleUpdateUserTasks(updatedTasks)
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value) // Atualiza o estado do filtro com o valor selecionado
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // Filtra as tarefas com base no filtro selecionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'complete') {
      return task.completed
    } else if (filter === 'incomplete') {
      return !task.completed
    } else {
      return true // Retorna todas as tarefas se o filtro for 'all'
    }
  })

  return (
    <div id='main-div'>
      <h2>Lista de Tarefas</h2>
      <div className='input-add-filter'>
        <div>
          <input
            type="text"
            placeholder="Digite sua tarefa"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <button onClick={handleAddTasks} class='material-symbols-outlined add-btn'>add_task</button>
        </div>
        <div>
          <label for="options">Filtrar:</label>
          <select id="options" name="options" onChange={handleChangeFilter}>
            <option value="all">Todas</option>
            <option value="complete">Finalizadas</option>
            <option value="incomplete">Não finalizadas</option>
          </select>
        </div>
      </div>
      <div className='ul-div'>
        <ul>
          {filteredTasks.map((task, index) => (
            <div key={index}>
              {editTaskId === task._id ? (
                <div className='editing-task'>
                  <input
                    type="text"
                    value={editTaskDescription}
                    onChange={(e) => setEditTaskDescription(e.target.value)}
                  />
                  <button onClick={() => handleSaveTask(task._id)} class='material-symbols-outlined'>save</button>
                </div>
              ) : (
                <div className='task-scope'>
                  <li onClick={() => toggleTaskCheck(task._id)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} className='task-description'>{task.description}</li>
                  <div className='btns-style'>
                    <button onClick={() => handleEditTask(task._id)} class='material-symbols-outlined save-btn'>edit</button>
                    <button onClick={() => handleRemoveTasks(task._id)} class='material-symbols-outlined delete-btn'>delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TaskList;

