import Allocation from '../modules/allocation/allocation.js'

export default async function HomePage() {
  const allocationHTML = await Allocation.render()

  return `
    <div>
      <h1>Maio, 2025</h1>
      ${allocationHTML}
    </div>
  `
}
