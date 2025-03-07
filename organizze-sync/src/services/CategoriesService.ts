import Category from '../models/Category'
import OrganizzeService from './Organizze'
import { categoriesData } from '../types/types'

class CategoriesService {
  private categories: categoriesData = {}

  async fetch() {
    const response = await OrganizzeService.getCategories()
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
