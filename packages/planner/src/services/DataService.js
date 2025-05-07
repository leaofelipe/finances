import SyncService from './SyncService'

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
      console.log(this.mainData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async getCategories() {
    this.categoriesData = await SyncService.getCategories()
    return this.categoriesData
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

  async getBudget() {
    this.budgetData = await SyncService.getBudget({ year: this.currentYear })
    console.log(this.budgetData)
    return this.budgetData[this.currentYear]
  }
}

export default new DataService()
