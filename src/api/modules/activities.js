export default axios => ({
  list () {
    return axios.get('/tree_activities/')
  }
})
