const API = require('./application')
const { PORT } = process.env

API.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
