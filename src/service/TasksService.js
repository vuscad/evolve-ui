import api from '../api'

export const tasksService = {
  getTasks: async () => {
    const response = await api.get('/tasks')
  
    return response.data
  },

  getTask: async(id) => {
    const response = await api.get('/task/' + id)

    return response.data
  },

  createTask: async (task) => {
    await api.post('/task', task)
  },

  deleteTask: async (id) => {
    await api.delete('/task/' + id)
  },

  updateTask: async (task) => {
    await api.put('/task/' + task.id, task)
  }
}