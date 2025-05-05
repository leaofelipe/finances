const generateMonths = require('./generateMonths')

module.exports = function generateMonthsFn(year, fn) {
  return generateMonths().map((month) => () => fn({ year, month }))
}
