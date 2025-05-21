const Categories = require('../models/Categories')

class SyncController {
  async saveCategories() {
    try {
      await Categories.saveToDatabase()
    } catch (error) {
      console.error('Error saving categories:', error)
    }
  }

  async start(request, response) {
    try {
      await this.saveCategories()
      response.status(200).send('OK')
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }
}

module.exports = new SyncController()
