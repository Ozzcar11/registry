export default axios => ({
  create (body) {
    return axios.post('/applications/', body)
  },
  upload (body) {
    return axios.post('/add_image_applications/', body)
  }
})
