import AccountingTable from '../modules/accountingTable/accountingTable.js'

export default async function ProjectionsPage() {
  const accountingTableHTML = await AccountingTable.render()

  return `
    <div>
      <h1>Projeções</h1>
      ${accountingTableHTML}
    </div>
  `
}
