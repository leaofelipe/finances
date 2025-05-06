import Handlebars from 'handlebars'

class AccountingTable {
  render() {
    return fetch('/modules/accountingTable/accountingTable.html')
      .then((response) => response.text())
      .then((html) => {
        const template = Handlebars.compile(html)
        const data = {
          months: [
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
        }
        return template(data)
      })
      .catch((error) => {
        console.error('Error loading template:', error)
        return ''
      })
  }
}

export default new AccountingTable()
