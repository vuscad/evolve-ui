import api from '../api'

export const pathsService = {
    getPaths: async () => {
        const response = await api.get('/paths')
      
        return response.data
      },
  
      getPath: async(id) => {
        const response = await api.get('/path/' + id)
  
        return response.data
      },
  
      createPath: async (path) => {
        await api.post('/path', path)
      },
  
      deletePath: async (id) => {
        await api.delete('/path/' + id)
      },
  
      updatePath: async (path) => {
        await api.put('/path/' + path.id, path)
      }
}