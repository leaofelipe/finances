const Transactions = require('../models/Transactions')
const Categories = require('../models/Categories')
const generateMonths = require('../utils/generateMonths')
const generateMonthsFn = require('../utils/generateMonthsFn')
const addAmmountToData = require('../utils/addAmmountToData')
const DEFAULT_YEAR = new Date().getFullYear().toString()

class Ammount {
  async getAmmountByTags({ year, month }) {
    const ammountByTag = {}
    const transactions = await Transactions.getTransactions({ year, month })
    transactions.forEach((transaction) => {
      transaction.tags.forEach(({ name }) => {
        addAmmountToData(name, transaction.amount_cents, ammountByTag)
      })
    })
    return ammountByTag
  }

  async getAmmountByTagsForYear(year = DEFAULT_YEAR) {
    const dataSet = {}
    const monthsFn = generateMonthsFn(year, this.getAmmountByTags.bind(this))
    const response = await Promise.all(monthsFn.map((fn) => fn()))
    response.forEach((data, index) => {
      const month = (index + 1).toString().padStart(2, '0')
      dataSet[month] = data
    })
    return dataSet
  }

  async getAmmountByCategory(date) {
    const transactionsByCategory = {}
    const categories = await Categories.getCategories()
    const transactions = await Transactions.getTransactions(date)
    transactions.forEach(({ category_id, amount_cents }) => {
      const categoryParentId = categories[category_id]?.parent_id || category_id
      addAmmountToData(
        categoryParentId.toString(),
        amount_cents,
        transactionsByCategory
      )
    })

    return transactionsByCategory
  }

  async getAmmountByCategoryForYear(year) {
    const dataSet = {}
    const monthsFn = generateMonthsFn(
      year,
      this.getAmmountByCategory.bind(this)
    )
    const response = await Promise.all(monthsFn.map((fn) => fn()))
    response.forEach((data, index) => {
      const month = (index + 1).toString().padStart(2, '0')
      dataSet[month] = data
    })
    return dataSet
  }

  async getData(request, response) {
    const { year } = request.query || DEFAULT_YEAR
    try {
      const dataSet = {}
      const months = generateMonths()
      const categoriesData = await this.getAmmountByCategoryForYear(year)
      const tagsData = await this.getAmmountByTagsForYear(year)
      months.forEach((month) => {
        dataSet[month] = {
          categories: categoriesData[month],
          tags: tagsData[month]
        }
      })
      response.status(200).json(dataSet)
    } catch (error) {
      response.status(500).json('Internal Server Error')
    }
  }
}

module.exports = new Ammount()
