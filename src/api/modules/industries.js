export default axios => ({
  list () {
    return axios.get('/industries/')
  },
  one (id) {
    return axios.get('/industries/' + id)
  }
})
