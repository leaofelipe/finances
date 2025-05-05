const Organizze = require('../services/organizze')
const Category = require('./Category')

class Categories {
  async fetch() {
    const categories = {}
    const response = await Organizze.getCategories()
    response.forEach((category) => {
      categories[category.id] = new Category(category)
    })
    return categories
  }

  async getCategories() {
    try {
      const categories = await this.fetch()
      return categories
    } catch (error) {
      throw new Error('Error fetching categories', error)
    }
  }
}

module.exports = new Categories()
