import axios from "axios";

const API_BASE_URL = 'http://localhost:5000'

// Função para buscar usuários do backend
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`)
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar itens:', error)
        throw error
    }
}

// Função para buscar usuário por id
export const fetchUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId[1]}`)
        return response.data
    } catch (error) {
        console.error('Erro ao buscar itens:', error)
        throw error
    }
}

// Função para criar um novo usuário no backend
export const createUser = async (newUser) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, newUser)
        return response.data
    } catch (error) {
        console.error('Erro ao criar item: ', error)
        throw error
    }
}

// Função para dar update parcial em algum usuário por id
export const updateUserTasks = async (userId, tasks) => {
    try {
        const response = await axios.patch(`http://localhost:5000/users/${userId[1]}`, { tasks: tasks });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar tarefas:', error);
        throw error;
    }
}

