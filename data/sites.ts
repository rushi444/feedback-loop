import axios from 'redaxios'

export const getSites = async () => {
  const { data } = await axios.get('/api/sites')
  return { sites: data }
}
