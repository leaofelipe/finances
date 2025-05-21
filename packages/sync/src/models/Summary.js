const Transactions = require('./Transactions')
const { MONTHS } = require('../utils/generateMonths')
const FirebaseService = require('../services/Firebase')
const COLLECTION = 'summary'

class Summary {
  constructor() {
    this.summary = {}
  }

  createContext({ year, month }) {
    this.summary[year] = this.summary[year] || {}
    this.summary[year][month] = this.summary[year][month] || {
      tags: {},
      categories: {},
      total: {
        credit_cards: 0,
        income: 0,
        outcome: 0
      }
    }
    return this.summary[year][month]
  }

  createTagSummary(context, transaction) {
    transaction.tags.forEach((tag) => {
      context.tags[tag] = context.tags[tag] || 0
      context.tags[tag] += transaction.amount_cents
    })
  }

  createCategorySummary(context, transaction) {
    const categoryId = transaction.category_id
    context.categories[categoryId] = context.categories[categoryId] || 0
    context.categories[transaction.category_id] += transaction.amount_cents
  }

  createTotalSummary(context, transaction) {}

  parseTransactions(context, transactions) {
    transactions.forEach((transaction) => {
      this.createTagSummary(context, transaction)
      this.createCategorySummary(context, transaction)
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
  }

  async saveToDatabase({ year = 2025 } = {}) {
    try {
      await this.getYearlyTransactions(year)
      const summaryJSON = JSON.parse(JSON.stringify(this.summary[year]))
      const response = await FirebaseService.createDocument(COLLECTION, {
        id: year,
        ...summaryJSON
      })
      return response
    } catch (error) {
      throw new Error('Failed to save categories to database')
    }
  }
}

module.exports = new Summary()
