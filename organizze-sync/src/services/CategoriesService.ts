import Category from '../models/Category'
import { getCategories } from '../API/organizzeAPI'

type categoriesData = {
  [key: string]: Category
}

class CategoriesService {
  private categories: categoriesData = {}

  async fetch() {
    const response = await getCategories()
    response.forEach((category: Category) => {
      this.categories[category.id] = new Category(category)
    })
  }

  getCategory(id: number): Category {
    return this.categories[id]
  }

  async getCategories(): Promise<categoriesData> {
    if (Object.keys(this.categories).length === 0) await this.fetch()
    return this.categories
  }
}

export default new CategoriesService()
