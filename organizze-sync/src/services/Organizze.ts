import axios from 'axios'

const CATEGORY_URL: string = `${process.env.ORGANIZZE_API_URL}/categories`
const TRANSACTIONS_URL: string = `${process.env.ORGANIZZE_API_URL}/transactions`

class Organizze {
  private fetch(url: string) {
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

  async getCategories(): Promise<[]> {
    const response = await this.fetch(CATEGORY_URL)
    return response.data
  }

  async getTransactions(startDate: string): Promise<[]> {
    const TRANSACTIONS_URL_WITH_PARAMS = `${TRANSACTIONS_URL}?start_date=${startDate}`
    const response = await this.fetch(TRANSACTIONS_URL_WITH_PARAMS)
    return response.data
  }
}

export default new Organizze()
