import axios from 'axios'

const baceUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baceUrl)
  return response.data
}

export default { getAll }