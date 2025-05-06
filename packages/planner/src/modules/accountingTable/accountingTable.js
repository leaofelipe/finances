import Handlebars from 'handlebars'
import DataService from '../../services/DataService'

const FILE = '/modules/accountingTable/accountingTable.html'
const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]
const TAGS = ['Dívidas e Parcelamentos', 'Essencial', 'Investimentos', 'Livre']

Handlebars.registerHelper('formatCurrency', function (value) {
  const valueString = value.toString()
  const integerPart = valueString.slice(0, -2) || '0'
  const centsPart = valueString.slice(-2)
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(`${integerPart}.${centsPart}`)
})

class AccountingTable {
  async fetchData() {
    const budget = await DataService.getBudget()
    console.log('=>', budget)
    return await DataService.processTags()
  }

  async parseData() {
    const data = {}
    const budget = await DataService.getBudget()
    const tags = await DataService.processTags()
    TAGS.forEach((tag) => {
      Object.keys(budget[tag]).forEach((month) => {
        console.log('month', month)
        // console.log('bd', budget[tag])
        // console.log('tg', tags[tag])
      })
    })
  }

  async render() {
    try {
      const test = await this.parseData()
      const tags = await this.fetchData()
      // console.log(tags)
      const response = await fetch(FILE)
      const html = await response.text()
      const template = Handlebars.compile(html)
      const data = {
        months: MONTHS,
        tags
      }
      return template(data)
    } catch (error) {
      console.error('Error loading template:', error)
      return ''
    }
  }
}

export default new AccountingTable()
