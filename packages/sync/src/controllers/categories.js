const CategoriesModel = require('../models/Categories')

class Categories {
  constructor() {
    this.categories = {}
  }

  async getCategories(request, response) {
    try {
      this.categories = await CategoriesModel.getCategories()
      response.status(200).send(this.categories)
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }
}

module.exports = new Categories()
