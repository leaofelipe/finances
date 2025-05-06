import AccountingTable from '../modules/accountingTable/accountingTable.js'

export default async function ProjectionsPage() {
  const accountingTableHTML = await AccountingTable.render()

  return `
    <div>
      <h1>Projections</h1>
      <p>Projeções</p>
      ${accountingTableHTML}
    </div>
  `
}
