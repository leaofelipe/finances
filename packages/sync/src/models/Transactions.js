const Organizze = require('../services/organizze')
const Transaction = require('./Transaction')
const MONTH_START_DAY = '01'

class Transactions {
  async fetch(date) {
    const transactionsResponse = await Organizze.getTransactions(date)
    const transactions = transactionsResponse.map((transaction) => {
      return new Transaction(transaction)
    })
    return transactions
  }

  async getTransactions({ year, month }) {
    const date = `${year}-${month}-${MONTH_START_DAY}`
    try {
      const transactions = await this.fetch(date)
      return transactions
    } catch (error) {
      throw new Error('Error fetching transactions', error)
    }
  }
}

module.exports = new Transactions()
