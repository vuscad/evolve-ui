import api from '../api'

export const domainsService = {
    getDomains: async () => {
      const response = await api.get('/domains')
    
      return response.data
    },

    getDomain: async(id) => {
      const response = await api.get('/domain/' + id)

      return response.data
    },

    createDomain: async (domain) => {
      await api.post('/domains', domain)
    },

    deleteDomain: async (id) => {
      await api.delete('/domain/' + id)
    },

    updateDomain: async (domain) => {
      await api.put('/domain/' + domain.id, domain)
    }
}