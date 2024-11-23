import {
  Column,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  Default,
  UpdatedAt,
  CreatedAt,
  DataType,
} from "sequelize-typescript"
import { v4 as uuidv4 } from "uuid"
import User from "./user" // Assuming you have a User model
import Category from "./category" // Assuming you have a Category model

@Table({ tableName: "products" })
class Product extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  product_id!: string

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.TEXT)
  description!: string // Elaborate description of the product

  @Column(DataType.DECIMAL)
  price!: number

  @Column(DataType.INTEGER)
  stock_quantity!: number

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  seller_id!: string // Reference to the seller (User)

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  category_id!: string // Reference to the product category

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date
}

export default Product
