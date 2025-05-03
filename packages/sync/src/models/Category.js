class Category {
  constructor({ id, name, color, parent_id }) {
    this.id = id.toString()
    this.name = name
    this.color = color
    this.parent_id = parent_id ? parent_id.toString() : null
  }
}

module.exports = Category
