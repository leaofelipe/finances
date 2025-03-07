import CategoriesService from './CategoriesService'
import TransactionsService from './TransactionsService'
import Transaction from '../models/Transaction'
import { dateFilter, ammountByType, yearlyData } from '../types/types'
import {
  generateMonths,
  generateMonthsFn,
  addAmmountToData
} from '../utils/utils'

class DataMesh {
  async getAmmountByCategory(date: dateFilter): Promise<ammountByType> {
    const transactionsByCategory: ammountByType = {}
    const categories = await CategoriesService.getCategories()
    const transactions = await TransactionsService.getTransactions(date)
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

  async getAmmountByTags(date: dateFilter): Promise<ammountByType> {
    const ammountByTag: ammountByType = {}
    const transactions = await TransactionsService.getTransactions(date)
    transactions.forEach((transaction: Transaction) => {
      transaction.tags.forEach(({ name }) => {
        addAmmountToData(name, transaction.amount_cents, ammountByTag)
      })
    })
    return ammountByTag
  }

  async getYearlyData(year: string): Promise<yearlyData> {
    const dataSet: yearlyData = {}
    const months = generateMonths()
    const categoriesData = await this.getYearlyAmmountByCategory(year)
    const tagsData = await this.getYearlyAmmountByTags(year)
    months.forEach((month) => {
      dataSet[month] = {
        categories: categoriesData[month],
        tags: tagsData[month]
      }
    })

    return dataSet
  }

  async getYearlyAmmountByTags(year: string) {
    const dataSet: { [key: string]: { [key: string]: ammountByType } } = {}
    const monthsFn = generateMonthsFn(year, this.getAmmountByTags.bind(this))
    const response = await Promise.all(monthsFn.map((fn) => fn()))
    response.forEach((data, index) => {
      const month = (index + 1).toString().padStart(2, '0')
      dataSet[month] = data
    })
    return dataSet
  }

  async getYearlyAmmountByCategory(year: string) {
    const dataSet: { [key: string]: { [key: string]: ammountByType } } = {}
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
}

export default new DataMesh()
