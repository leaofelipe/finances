import axios from 'axios'

const CATEGORY_URL:string = `${process.env.ORGANIZZE_API_URL}/categories`
const TRANSACTIONS_URL:string = `${process.env.ORGANIZZE_API_URL}/transactions`

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
  console.log(response.data)
}
