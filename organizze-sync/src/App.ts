import DataMesh from './services/DataMesh'
import DatabaseService from './services/DatabaseService'
import { yearlyData } from './types/types'

const DEFAULT_YEAR = new Date().getFullYear().toString()
const PREVIOUS_YEAR = (new Date().getFullYear() - 1).toString()

class App {
  async execute() {
    await Promise.all([
      this.setDataObjects(DEFAULT_YEAR),
      this.setDataObjects(PREVIOUS_YEAR)
    ])
    console.log('All Files created.')
  }

  async setDataObjects(year: string) {
    const data: yearlyData = await DataMesh.getYearlyData(year)
    const response = await DatabaseService.saveToServer(
      year,
      JSON.stringify(data)
    )
    return response
  }
}

export default App
