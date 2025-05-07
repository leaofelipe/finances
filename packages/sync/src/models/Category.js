const INCOME_CATEGORY_IDS = process.env.INCOME_CATEGORY_IDS.split(',')

class Category {
  constructor({ id, name, color, parent_id }) {
    this.id = id.toString()
    this.name = name
    this.color = color
    this.parent_id = parent_id ? parent_id.toString() : null
    this.type = INCOME_CATEGORY_IDS.includes(this.id) ? 'income' : 'expense'
  }
}

module.exports = Category
