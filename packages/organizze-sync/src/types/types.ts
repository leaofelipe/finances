import Category from '../models/Category'

export type dateFilter = {
  year: string
  month: string
}

export type ammountByType = {
  [prop: string]: {
    total: number
  }
}

export type yearlyData = {
  [key: string]: {
    categories: { [key: string]: ammountByType }
    tags: { [key: string]: ammountByType }
  }
}

export type categoriesData = {
  [key: string]: Category
}
