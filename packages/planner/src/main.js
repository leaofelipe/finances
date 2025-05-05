import SyncService from './services/SyncService'
console.log('Loading Planner')

SyncService.getAmmount({ year: 2025 })
  .then((ammount) => {
    console.log('Ammount', ammount)
  })
  .catch((error) => {
    console.error('Error fetching ammount', error)
  })
