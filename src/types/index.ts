export interface IUser {
  id?: number
  user_id: string
  first_name: string
  last_name: string
  email: string
  password_hash: string
  phone_number: string
  address: string
  created_at: Date
  updated_at: Date
  status: string
}

export interface ICategory {
  name: string
  category_id?: string
}

export interface IProduct {
  name: string
  description: string
  price: number
  stock_quantity: number
  seller_id: string
  category_id: string
}
