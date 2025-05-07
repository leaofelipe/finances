import Handlebars from 'handlebars'
import DataService from '../../services/DataService'
import formatCurrency from '../../utils/formatCurrency'

const FILE = '/modules/allocation/template.html'
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

class Allocation {
  async parseData() {
    const data = await DataService.getCategories()
    console.log('Data:', data)
    return data
  }

  async render() {
    try {
      const data = await this.parseData()
      const file = await fetch(FILE)
      const html = await file.text()
      const template = Handlebars.compile(html)
      return template({
        months: MONTHS
        // data
      })
    } catch (error) {
      console.error('Error loading template:', error)
      return ''
    }
  }
}

export default new Allocation()
