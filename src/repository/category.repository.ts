import Category from "../models/category"
import { ICategory } from "../types"

class CategoryRepository {
  async createCategory(data: ICategory) {
    const category = await Category.create({ ...data })
    return category
  }

  async getAllCategories() {
    const categories = await Category.findAll()
    return categories
  }

  async getCategoryById(category_id: string) {
    const user = await Category.findByPk(category_id) // Uses the primary key
    return user
  }

  async updateCategory(category_id: string, data: ICategory) {
    const [updated] = await Category.update(data, {
      where: { category_id: category_id },
    })
    if (updated) {
      const updatedCategory = await Category.findByPk(category_id)
      return updatedCategory
    }
  }

  async deleteCategory(category_id: string) {
    const category = await Category.findOne({
      where: { category_id: category_id },
    })
    if (category) {
      await category.destroy()
      return { message: `Category Id ${category_id} deleted` }
    }
  }
}

export default CategoryRepository
