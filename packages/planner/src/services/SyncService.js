import axios from 'axios'
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

  // async getCategories() {
  //   // if (Object.keys(this.categories).length > 0) return this.categories
  //   const response = await this.fetch(CATEGORY_URL)
  //   this.categories = response.data
  //   return this.categories
  // }

  // async getTransactions({ year, month }) {
  //   // Adicionar no cache valores das chaves
  //   // if (Object.keys(this.transactions).length > 0) return this.transactions
  //   const TRANSACTIONS_URL_WITH_PARAMS = `${TRANSACTIONS_URL}?year=${year}&month=${month}`
  //   const response = await this.fetch(TRANSACTIONS_URL_WITH_PARAMS)
  //   return response.data
  // }
}

export default new SyncService()
