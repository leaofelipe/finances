const Organizze = require('../services/organizze')
const Category = require('../models/Category')

class Categories {
  constructor() {
    this.categories = {}
  }

  async fetch() {
    const response = await Organizze.getCategories()
    response.forEach((category) => {
      this.categories[category.id] = new Category(category)
    })
  }

  async getCategory(request, response) {
    const { id } = request.params
    try {
      await this.fetch()
      response.status(200).send(this.categories[id])
    } catch (error) {
      console.error('Error fetching category:', error)
      response.status(500).send('Internal Server Error')
    }
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
