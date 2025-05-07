import currency from 'currency.js'

export default function formatCurrency(value = 0, hasNegativePattern = true) {
  return currency(value, {
    symbol: 'R$ ',
    precision: 2,
    separator: '.',
    decimal: ',',
    fromCents: true,
    negativePattern: hasNegativePattern ? '(!#)' : '!#'
  })
}
