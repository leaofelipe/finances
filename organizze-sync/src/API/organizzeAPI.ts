import axios from 'axios'

const CATEGORY_URL: string = `${process.env.ORGANIZZE_API_URL}/categories`
const TRANSACTIONS_URL: string = `${process.env.ORGANIZZE_API_URL}/transactions`

function fetchOrganizze(url: string) {
  return axios({
    method: 'get',
    url,
    headers: {
      'user-agent': `${process.env.ORGANIZZE_USER_AGENT}`,
      Authorization: `Basic ${process.env.ORGANIZZE_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
}

export async function getCategories() {
  const response = await fetchOrganizze(CATEGORY_URL)
  return response.data
}

export async function getTransactions(startDate: string) {
  const TRANSACTIONS_URL_WITH_PARAMS = `${TRANSACTIONS_URL}?start_date=${startDate}`
  const response = await fetchOrganizze(TRANSACTIONS_URL_WITH_PARAMS)
  return response.data
}

function generateYearTransactionsFn(year: string): Function[] {
  let months = Array.from({ length: 12 }, (_, value) =>
    (value + 1).toString().padStart(2, '0')
  )
  return months.map((month) => () => getTransactions(`${year}-${month}-01`))
}

export async function getYearlyTransactions(year: string) {
  const data: { [key: string]: object[] } = {}
  const fns = generateYearTransactionsFn(year)
  const response = await Promise.all([...fns.map((fn) => fn())])
  response.forEach((value, index) => {
    const title = (index + 1).toString().padStart(2, '0')
    data[title] = value
  })
  return data
}
