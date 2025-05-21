const Transactions = require('./Transactions')
const { MONTHS } = require('../utils/generateMonths')

class Summary {
  constructor() {
    this.summary = {}
  }

  createContext({ year, month }) {
    this.summary[year] = this.summary[year] || {}
    this.summary[year][month] = this.summary[year][month] || {
      tags: {},
      categories: {},
      credit_cards: {},
      total: {}
    }
    return this.summary[year][month]
  }

  createTagSummary(context, transaction) {
    transaction.tags.forEach((tag) => {
      context.tags[tag] = context.tags[tag] || 0
      context.tags[tag] += transaction.amount_cents
    })
  }

  parseTransactions(context, transactions) {
    transactions.forEach((transaction) => {
      this.createTagSummary(context, transaction)
    })
    console.log('Summary.parseTransactions', this.summary)
    // this.createTagSummary(data)
  }

  async getYearlyTransactions(year) {
    const promises = MONTHS.map((month) =>
      Transactions.getTransactions({ year, month })
    )
    const results = await Promise.all(promises)
    results.forEach((transactions, index) => {
      const month = MONTHS[index]
      const context = this.createContext({ year, month })
      this.parseTransactions(context, transactions)
    })
    return {}
  }

  async saveToDatabase({ year = 2025 } = {}) {
    await this.getYearlyTransactions(year)
    console.log('Summary.getSummary', year)
    return {}
  }
}

module.exports = new Summary()
