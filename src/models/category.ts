import {
  Column,
  Model,
  PrimaryKey,
  Table,
  Default,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript"
import { v4 as uuidv4 } from "uuid"

@Table({ tableName: "categories" })
class Category extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  category_id!: string

  @Column(DataType.STRING)
  name!: string // Category name

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  parent_category_id?: string // Reference to the parent category

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date
}

export default Category
