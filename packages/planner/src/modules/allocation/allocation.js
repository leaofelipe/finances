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
// const TAGS = ['Essencial', 'Dívidas e Parcelamentos', 'Investimentos', 'Livre']
const CATEGORY_NAMES = [
  'Salário fixo',
  'Salário complementar',
  'Renda complementar',
  'Investimentos',
  'Empréstimos',
  'Outras receitas'
]
function sortByName(resource) {
  const data = []
  Object.keys(resource).forEach((key) => {
    const index = CATEGORY_NAMES.indexOf(key)
    data[index] = { name: key, total: resource[key] }
  })
  return data
}

class Allocation {
  async parseData() {
    const categories = await DataService.getCategoriesByType('income')
    const ammountByCategories = await DataService.processCategories()
    const data = Object.keys(categories).map((category) => {
      const name = categories[category].name
      const ammount = ammountByCategories[category]
      const monthlyData = MONTHS.map((_, index) => {
        const monthIndex = (index + 1).toString().padStart(2, '0')
        return formatCurrency(ammount[monthIndex]?.total || 0).format()
      })
      return { name, monthlyData }
    })

    return sortByName(
      data.reduce((acc, { name, monthlyData }) => {
        acc[name] = monthlyData
        return acc
      }, {})
    )
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

export default new Allocation()
