import api from '../api.'

export const pathsService = {
    getPaths: async () => {
        const response = await api.post('', {})
    
        console.log(response)

        return response
      },
}