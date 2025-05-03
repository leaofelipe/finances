const Organizze = require('../../services/organizze')
const Category = require('../../models/Category')

class Categories {
  constructor() {
    this.categories = {}
  }

  async fetch() {
    if (Object.keys(this.categories).length > 0) return this.categories
    const response = await Organizze.getCategories()
    response.forEach((category) => {
      this.categories[category.id] = new Category(category)
    })
  }

  async getCategory(request, response) {
    const { id } = request.params
    await this.fetch()
    response.status(200).send(this.categories[id])
  }

  async getCategories(request, response) {
    try {
      await this.fetch()
      response.status(200).send(this.categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      response.status(500).send('Internal Server Error')
    }
  }
}

module.exports = new Categories()
