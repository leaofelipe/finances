import {
  getCategories,
  getTransactions,
  getYearlyTransactions
} from '../API/organizzeAPI'

type Categories = {
  [prop: number]: string
}

type Category = {
  id: number
  name: string
}

type Transaction = {}

type Transactions = {
  [year: string]: {
    [month: string]: []
  }
}

class App {
  CATEGORIES: Categories = {}
  TRANSACTIONS: Transactions = {}

  constructor() {
    console.log('App initialized')
  }

  async setCategories() {
    const categories = await getCategories()
    categories.forEach((category: Category) => {
      this.CATEGORIES[category.id] = category.name
    })
  }

  async setTransactions({ year }: { year: string }) {
    getYearlyTransactions(year)
    // this.TRANSACTIONS[year] = transactions
    // const cacheTransactions = this.TRANSACTIONS[year]?.[month]
    // if (cacheTransactions) {
    //   console.log('CACHED')
    //   return cacheTransactions
    // }
    // if (!this.TRANSACTIONS[year]) this.TRANSACTIONS[year] = {}
    // const DATE = `${year}-${month}-01`
    // const transactions = await getTransactions(DATE)
    // this.TRANSACTIONS[year][month] = transactions
  }
}

// const YEAR = '2025'
// const MONTH = '03'

// const startDate = `${YEAR}-${MONTH}-01`

// async function populateCategories() {
//   const CATEGORIES: { [prop: number]: string } = {}
//   const categories: [{ id: number; name: string }] = await getCategories()
//   categories.map((category) => {
//     CATEGORIES[category.id] = category.name
//   })
//   return CATEGORIES
// }

// getTransactions(startDate).then((transactions: []) => {
//   const CATEGORIES = populateCategories()
//   const transactionsByCategory: {
//     [prop: number]: { name: string; total: number }
//   } = {}

//   transactions.map((transaction: { category_id: number }) => {
//     if (!transactionsByCategory[transaction.category_id]) {
//       transactionsByCategory[transaction.category_id] = {
//         name: CATEGORIES[transaction.category_id],
//         total: 0
//       }
//     }
//   })
// })

export default new App()
