import { ammountByType } from '../types/types'

export function generateMonths() {
  return Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString().padStart(2, '0')
  )
}

export function generateMonthsFn(year: string, fn: Function): Function[] {
  return generateMonths().map((month) => () => fn({ year, month }))
}

export function addAmmountToData(
  key: string,
  value: number,
  dataSet: ammountByType = {}
) {
  if (!dataSet[key]) dataSet[key] = { total: 0 }
  dataSet[key].total += value
  return dataSet
}
