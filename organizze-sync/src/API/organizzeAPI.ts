import fetchOrganizze from './fetchOrganizze'

const CATEGORY_URL: string = `${process.env.ORGANIZZE_API_URL}/categories`
const TRANSACTIONS_URL: string = `${process.env.ORGANIZZE_API_URL}/transactions`

export async function getCategories(): Promise<[]> {
  const response = await fetchOrganizze(CATEGORY_URL)
  return response.data
}

export async function getTransactions(startDate: string): Promise<[]> {
  const TRANSACTIONS_URL_WITH_PARAMS = `${TRANSACTIONS_URL}?start_date=${startDate}`
  const response = await fetchOrganizze(TRANSACTIONS_URL_WITH_PARAMS)
  return response.data
}
