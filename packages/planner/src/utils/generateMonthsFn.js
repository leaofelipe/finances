import generateMonths from './generateMonths'

export default function generateMonthsFn(year, fn) {
  return generateMonths().map((month) => () => fn({ year, month }))
}
