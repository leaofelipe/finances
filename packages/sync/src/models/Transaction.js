class Transaction {
  constructor({ id, description, date, amount_cents, category_id, tags }) {
    this.id = id.toString()
    this.description = description
    this.date = date
    this.amount_cents = amount_cents
    this.category_id = category_id
    this.tags = tags
  }
}

module.exports = Transaction
