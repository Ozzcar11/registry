export default axios => ({
  list () {
    return axios.get('/org_form/')
  }
})
