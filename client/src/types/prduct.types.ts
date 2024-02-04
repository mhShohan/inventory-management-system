export type IProduct = {
  _id: string
  name: string
  description?: string
  category: ICategory
  brand?: IBrand
  price: number
  size?: string
  stock: number
  variant?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ICategory {
  _id: string
  name: string
}

export interface IBrand {
  _id: string
  name: string
}