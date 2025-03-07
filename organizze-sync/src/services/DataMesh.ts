import CategoriesService from './CategoriesService'
import TransactionsService from './TransactionsService'
import Transaction from '../models/Transaction'
import { dateFilter } from '../types/types'

type ammountByType = {
  [prop: string]: {
    total: number
  }
}

function addAmmountToData(
  key: string,
  value: number,
  dataSet: ammountByType = {}
) {
  if (!dataSet[key]) dataSet[key] = { total: 0 }
  dataSet[key].total += value
  return dataSet
}

export default class DataMesh {
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
}
