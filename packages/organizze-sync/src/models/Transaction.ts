export default class Transaction {
  id: string
  description: string
  date: string
  amount_cents: number
  category_id: number
  tags: [{ name: string }]

  constructor({
    id,
    description,
    date,
    amount_cents,
    category_id,
    tags
  }: Transaction) {
    this.id = id.toString()
    this.description = description
    this.date = date
    this.amount_cents = amount_cents
    this.category_id = category_id
    this.tags = tags
  }
}
