module.exports = function (month) {
  return Number.isInteger(month) && month >= 1 && month <= 12
}
