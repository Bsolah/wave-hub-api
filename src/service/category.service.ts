import CategoryRepository from "../repository/category.repository"
import { ICategory } from "../types"
import { BaseError } from "../utils/error"

class CategoryService {
  private categoryRepository: CategoryRepository
  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  async createCategory(data: ICategory) {
    try {
      const category = await this.categoryRepository.createCategory(data)
      return category
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async getAllCategories() {
    try {
      console.log("categories service ")
      const categories = await this.categoryRepository.getAllCategories()
      return categories
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async getCategoryById(categoryId: string) {
    try {
      const category = await this.categoryRepository.getCategoryById(categoryId)
      return category
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async updateCategory(categoryId: string, data: ICategory) {
    try {
      const category = await this.categoryRepository.updateCategory(
        categoryId,
        data,
      )
      return category
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }

  async deleteCategory(categoryId: string) {
    try {
      const category = await this.categoryRepository.deleteCategory(categoryId)
      return category
    } catch (error) {
      const err = error as string
      throw new BaseError(err, 400)
    }
  }
}

export default CategoryService
