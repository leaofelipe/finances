import Handlebars from 'handlebars'
import DataService from '../../services/DataService'
import formatCurrency from '../../utils/formatCurrency'

const FILE = '/modules/accountingTable/template.html'
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
const TAGS = ['Essencial', 'Dívidas e Parcelamentos', 'Investimentos', 'Livre']

class AccountingTable {
  async parseData() {
    const data = {}
    const budget = await DataService.getBudget()
    const tags = await DataService.processTags()
    TAGS.forEach((tag) => {
      if (!data[tag]) data[tag] = []
      Object.keys(budget[tag] || {}).forEach((month) => {
        const index = parseInt(month, 10) - 1
        const budgetTotal = formatCurrency(budget[tag][month]?.total)
        const tagsTotal = formatCurrency(tags[tag]?.[month]?.total, false)
        data[tag][index] = {
          budget: budgetTotal.format(),
          spent: tagsTotal.format(),
          variance: budgetTotal.add(tagsTotal).format()
        }
      })
    })
    return data
  }

  async render() {
    try {
      const data = await this.parseData()
      const file = await fetch(FILE)
      const html = await file.text()
      const template = Handlebars.compile(html)
      return template({
        months: MONTHS,
        data
      })
    } catch (error) {
      console.error('Error loading template:', error)
      return ''
    }
  }
}

export default new AccountingTable()
