import SyncService from './SyncService'
import isObjectEmpty from '../utils/isObjectEmpty'

const processTags = (tags, month, tagData) => {
  for (const tagName in tags) {
    if (!tagData[tagName]) tagData[tagName] = {}
    tagData[tagName][month] = tags[tagName]
  }
}
const BASE_YEAR = new Date().getFullYear()

class DataService {
  constructor() {
    this.currentYear = BASE_YEAR
    this.clear()
  }

  // async init() {
  //   await this.fetch()
  // }

  clear() {
    this.mainData = {}
    this.tagsData = {}
    this.categoriesData = {}
  }

  async fetch() {
    try {
      this.mainData[this.currentYear] = await SyncService.getAmmount({
        year: this.currentYear
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async getCategories() {
    this.categoriesData = await SyncService.getCategories()
    return this.categoriesData
  }

  async getCategoriesByType(type) {
    if (isObjectEmpty(this.categoriesData)) await this.getCategories()
    if (type !== 'income' && type !== 'expense') return this.categoriesData
    const data = {}
    Object.values(this.categoriesData).forEach((category) => {
      if (category.type === type) {
        data[category.id] = category
      }
    })
    return data
  }

  async processCategories() {
    await this.fetch()
    const data = this.mainData[this.currentYear]
    this.categoriesData[this.currentYear] = {}
    for (const month in data) {
      processTags(
        data[month].categories,
        month,
        this.categoriesData[this.currentYear]
      )
    }
    return this.categoriesData[this.currentYear]
  }

  async processTags() {
    await this.fetch()
    const data = this.mainData[this.currentYear]
    this.tagsData[this.currentYear] = {}
    for (const month in data) {
      processTags(data[month].tags, month, this.tagsData[this.currentYear])
    }
    return this.tagsData[this.currentYear]
  }

  async getBudgets() {
    this.budgetData = await SyncService.getBudgets({ year: this.currentYear })
    return this.budgetData
  }
}

export default new DataService()
