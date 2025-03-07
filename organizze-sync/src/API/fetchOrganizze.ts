import axios from 'axios'

export default function fetchOrganizze(url: string) {
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
