import axios from 'axios'
import budgetMock from './budgetMock'
const URL = 'http://localhost:3000'
const AMMOUNT_URL = `${URL}/ammount`
const CATEGORIES_URL = `${URL}/categories`

class SyncService {
  constructor() {
    this.categories = {}
    this.transactions = {}
  }

  fetch(url) {
    return axios({
      method: 'get',
      url,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async getCategories() {
    const response = await this.fetch(${CATEGORIES_URL})
    this.categories = response.data
    return this.categories
  }

  async getAmmount({ year }) {
    const response = await this.fetch(`${AMMOUNT_URL}?year=${year}`)
    return response.data
  }

  async getBudget({ year }) {
    return Promise.resolve({ [year]: budgetMock })
  }
}

export default new SyncService()
