const Organizze = require('../services/organizze')
const Category = require('./Category')

class Categories {
  constructor() {
    this.categories = {}
  }

  async fetch() {
    const response = await Organizze.getCategories()
    response.forEach((category) => {
      this.categories[category.id] = new Category(category)
    })
    return this.categories
  }

  async getCategories() {
    try {
      await this.fetch()
      return this.categories
    } catch (error) {
      throw new Error('Error fetching categories', error)
    }
  }
}

module.exports = new Categories()
