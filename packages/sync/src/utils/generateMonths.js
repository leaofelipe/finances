module.exports = function generateMonths() {
  return Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString().padStart(2, '0')
  )
}
