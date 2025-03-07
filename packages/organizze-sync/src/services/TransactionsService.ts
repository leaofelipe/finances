import OrganizzeService from './Organizze'
import Transaction from '../models/Transaction'
import { dateFilter } from '../types/types'

const MONTH_START_DAY = '01'

class TransactionsService {
  async getTransactions({ year, month }: dateFilter): Promise<Transaction[]> {
    const date = `${year}-${month}-${MONTH_START_DAY}`
    const response = await OrganizzeService.getTransactions(date)
    const transactions = response.map((transaction: Transaction) => {
      return new Transaction(transaction)
    })

    return transactions
  }
}

export default new TransactionsService()
