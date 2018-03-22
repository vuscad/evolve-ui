import api from '../api'

export const pathsService = {
    getTasks: async () => {
        const response = await api.get('/tasks')
    
        return response.data
      },
}