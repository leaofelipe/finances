module.exports = function (month) {
  const monthNumber = parseInt(month, 10)
  return monthNumber >= 1 && monthNumber <= 12
}
