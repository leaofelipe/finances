const Categories = require('../models/Categories')
const Summary = require('../models/Summary')
const CURRENT_YEAR = new Date().getFullYear()

class SyncController {
  async saveSummary({ year = 2025 } = {}) {
    await Summary.saveToDatabase({ year })
  }

  async saveCategories() {
    try {
      await Categories.saveToDatabase()
    } catch (error) {
      console.error('Error saving categories:', error)
    }
  }

  async start(request, response) {
    const { year } = request.query || CURRENT_YEAR
    try {
      // await this.saveCategories()
      await this.saveSummary({ year })
      response.status(200).send('OK')
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }
}

module.exports = new SyncController()
