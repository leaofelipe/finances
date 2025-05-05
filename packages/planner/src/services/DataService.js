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
    this.mainData = {}
    this.tagsData = {}
  }

  clear() {
    this.mainData = {}
    this.tagsData = {}
  }

  async fetch() {
    try {
      this.mainData[this.currentYear] = await SyncService.getAmmount(
        this.currentYear
      )
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async processTags() {
    await this.fetch()
    const data = this.mainData[this.currentYear]
    this.tagsData[this.currentYear] = {}
    for (const month in data) {
      processTags(data[month].tags, month, this.tagsData[this.currentYear])
    }

    console.log(this.tagsData)
  }
}

export default new DataService()
