import Handlebars from 'handlebars'
import Budget from '../../models/Budget'
import './allocation.scss'

const MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez'
]
const FILE = '/modules/allocation/template.html'

Handlebars.registerHelper('eq', (a, b) => a === b)

class Allocation {
  constructor() {
    // Lê o valor de month da querystring, se existir
    const params = new URLSearchParams(window.location.search)
    this.selectedMonth = params.get('month') || '01'
    this.budgets = {}
    this.listenToQueryString()
  }

  parseMonths() {
    return MONTHS.map((month, index) => {
      return {
        name: month,
        value: (index + 1).toString().padStart(2, '0')
      }
    })
  }

  async parseData(month) {
    const budget = new Budget('2025')
    this.budgets = await budget.getBudgetByMonth(this.selectedMonth)
    return this.budgets
  }

  addListener() {
    const monthSelect = document.getElementById('month')
    if (monthSelect) {
      monthSelect.addEventListener('change', async (event) => {
        this.selectedMonth = event.target.value
        // Atualiza a querystring da URL sem recarregar a página
        const params = new URLSearchParams(window.location.search)
        params.set('month', this.selectedMonth)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState({}, '', newUrl)
        // ...você pode chamar render ou atualizar a interface aqui se necessário...
      })
    }
  }

  listenToQueryString() {
    window.addEventListener('popstate', async () => {
      const params = new URLSearchParams(window.location.search)
      const newMonth = params.get('month') || '01'
      if (newMonth !== this.selectedMonth) {
        this.selectedMonth = newMonth
        this.render()
      }
    })
  }

  async render() {
    try {
      const months = this.parseMonths()
      await this.parseData()
      const file = await fetch(FILE)
      const html = await file.text()
      // Adiciona helper eq ao Handlebars se ainda não existir

      const template = Handlebars.compile(html)
      setTimeout(() => this.addListener(), 0)
      return template({
        months,
        data: this.budgets,
        selectedMonth: this.selectedMonth
      })
    } catch (error) {
      console.error('Error loading template:', error)
      return ''
    }
  }
}

export default new Allocation()
