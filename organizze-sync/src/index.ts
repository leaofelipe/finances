import 'dotenv/config'
import app from './models/App'

app.setTransactions({ year: '2025' }).then(() => {
  console.log(app.TRANSACTIONS)
})
// import { getCategories, getTransactions } from './API/organizzeAPI'

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
