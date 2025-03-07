export default class Category {
  id: string
  name: string
  color: string
  parent_id: string | null

  constructor({ id, name, color, parent_id }: Category) {
    this.id = id.toString()
    this.name = name
    this.color = color
    this.parent_id = parent_id ? parent_id.toString() : null
  }
}
