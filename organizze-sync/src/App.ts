import { dateFilter } from './types/types'
// import generateYearTransactionsFn from '../utils/generateYearTransactionsFn'
import DataMesh from './services/DataMesh'

const DEFAULT_YEAR = '2025'

class App {
  private dataMeshService: DataMesh

  constructor() {
    this.dataMeshService = new DataMesh()
  }

  async start() {
    const date: dateFilter = { year: DEFAULT_YEAR, month: '07' }
    this.dataMeshService.getAmmountByCategory(date)
  }
}

export default App
