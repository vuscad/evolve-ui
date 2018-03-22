import api from '../api'

export const pathsService = {
    getPaths: async () => {
        const response = await api.get('/paths')
    
        return response.data
      },
}