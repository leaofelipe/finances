const FirebaseService = require('../services/Firebase')
const generateMonths = require('../utils/generateMonths')
const COLLECTION = 'budget'

class Budget {
  get data() {
    return {
      id: this.id,
      name: this.name,
      months: this.months
    }
  }

  constructor(name, months = {}) {
    this.id = name.toLowerCase()
    this.name = name
    this.months = months
  }

  async create(name) {
    try {
      const months = generateMonths()
      months.forEach((month) => (this.months[month] = 0))
      const response = FirebaseService.createDocument(COLLECTION, this.data)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create budget')
    }
  }

  async fetch() {
    try {
      const response = await FirebaseService.getDocument(COLLECTION, this.id)
      if (response) {
        this.name = response.name
        this.months = response.months
      } else {
        throw new Error('Budget not found')
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get budget document')
    }
  }

  async setMonth(month, amount) {
    try {
      const response = await FirebaseService.updateDocument(
        COLLECTION,
        this.id,
        {
          [`months.${month}`]: amount
        }
      )
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to set month')
    }
  }

  async delete() {
    try {
      const response = await FirebaseService.deleteDocument(COLLECTION, this.id)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete budget')
    }
  }

  static async getBudgets() {
    try {
      const response = await FirebaseService.getCollection(COLLECTION)
      return response
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get budgets')
    }
  }
}

module.exports = Budget
