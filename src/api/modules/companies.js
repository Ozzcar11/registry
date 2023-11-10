export default axios => ({
  list (event = {}) {
    return axios.post('/companies/', event)
  }
})
