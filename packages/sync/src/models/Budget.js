const Firebase = require('../services/Firebase')

class Budget {
  constructor() {
    this.budget = {}
  }

  async fetch() {
    this.budget = await Firebase.getBudget()
    return this.budget
  }

  async getBudget() {
    try {
      await this.fetch()
      return this.budget
    } catch (error) {
      throw new Error('Error fetching Budget', error)
    }
  }
}

module.exports = new Budget()
