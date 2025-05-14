import DataService from '../services/DataService'
import formatCurrency from '../utils/formatCurrency'
import generateMonths from '../utils/generateMonths'
const MONTHS = generateMonths()

export default class Budget {
  constructor(year) {
    this.budgets = {}
    this.tags = {}
    this.year = year
    this.data = {}
  }

  async fetchData() {
    const [budgets, tags] = await Promise.all([
      DataService.getBudgets({ year: 2025 }),
      DataService.processTags({ year: 2025 })
    ])
    this.budgets = budgets
    this.tags = tags
    this.parseMonthBudget()
  }

  parseMonthBudget() {
    MONTHS.forEach((month) => {
      this.data[month] = this.parseBudget(month)
    })
  }

  parseBudget(month) {
    const data = {}
    Object.keys(this.budgets).forEach((key) => {
      const budgetName = this.budgets[key].name
      const tag = this.tags[budgetName] || {}
      data[budgetName] = budgetName
      const tagMonthValue = formatCurrency(tag[month]?.total || 0)
      const budgetMonthValue = formatCurrency(
        this.budgets[key]?.months[month] || 0
      )
      const resultMonthValue = budgetMonthValue.add(tagMonthValue)
      data[budgetName] = {
        budget: budgetMonthValue.format(),
        tag: tagMonthValue.format(),
        result: resultMonthValue.format()
      }
    })
    return data
  }

  async getBudgetByMonth(month) {
    if (this.data[month]) return this.data[month]
    await this.fetchData()
    return this.data[month]
  }
}
