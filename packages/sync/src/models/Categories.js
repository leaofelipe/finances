const Organizze = require('../services/organizze')
const FirebaseService = require('../services/Firebase')
const Category = require('./Category')
const COLLECTION = 'categories'
const ID = 'data'

class Categories {
  constructor() {
    this.categories = {}
  }

  async fetchFromOrganizze() {
    const categories = {}
    try {
      const response = await Organizze.getCategories()
      response.forEach((category) => {
        categories[category.id] = new Category(category)
      })
      return categories
    } catch (error) {
      throw new Error('Failed to fetch categories from Organizze')
    }
  }

  async fetchFromDatabase() {
    try {
      const response = await FirebaseService.getDocument(COLLECTION, ID)
      this.categories = response
    } catch (error) {
      throw new Error('Failed to fetch categories from database')
    }
  }

  async getCategories() {
    try {
      await this.fetchFromDatabase()
      return this.categories
    } catch (error) {
      throw new Error('Error fetching categories', error)
    }
  }

  async saveToDatabase() {
    try {
      const categories = await this.fetchFromOrganizze()
      const categoriesJSON = JSON.parse(JSON.stringify(categories))
      const response = await FirebaseService.createDocument(COLLECTION, {
        id: ID,
        ...categoriesJSON
      })
      return response
    } catch (error) {
      throw new Error('Failed to save categories to database')
    }
  }
}

module.exports = new Categories()
