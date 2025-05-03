const axios = require('axios')
const CATEGORY_URL = `${process.env.ORGANIZZE_API_URL}/categories`
const TRANSACTIONS_URL = `${process.env.ORGANIZZE_API_URL}/transactions`

class Organizze {
  fetch(url) {
    return axios({
      method: 'get',
      url,
      headers: {
        'user-agent': `${process.env.ORGANIZZE_USER_AGENT}`,
        Authorization: `Basic ${process.env.ORGANIZZE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
  }

  async getCategories() {
    const response = await this.fetch(CATEGORY_URL)
    return response.data
  }

  async getTransactions(startDate) {
    const TRANSACTIONS_URL_WITH_PARAMS = `${TRANSACTIONS_URL}?start_date=${startDate}`
    const response = await this.fetch(TRANSACTIONS_URL_WITH_PARAMS)
    return response.data
  }
}

module.exports = new Organizze()
