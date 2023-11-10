export default axios => ({
  list () {
    return axios.get('/municipals/')
  }
})
