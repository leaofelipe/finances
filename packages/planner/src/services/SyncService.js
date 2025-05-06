import axios from 'axios'
import budgetMock from './budgetMock'
const URL = 'http://localhost:3000'
const AMMOUNT_URL = `${URL}/ammount`

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

  async getAmmount({ year }) {
    const response = await this.fetch(`${URL}/ammount?year=${year}`)
    return response.data
  }

  async getBudget({ year }) {
    return Promise.resolve({ [year]: budgetMock })
  }
}

export default new SyncService()
