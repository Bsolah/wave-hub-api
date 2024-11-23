// controllers/categoryController.ts
import { Request, Response } from "express"
import CategoryService from "../service/category.service"

const categoryService = new CategoryService()
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body)
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error })
  }
}

// Get all categories (including parent-child structure)
export const getCategories = async (req: Request, res: Response) => {
  try {
    console.log("categories controller ")
    const categories = await categoryService.getAllCategories()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error })
  }
}

// Get a category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = await categoryService.getCategoryById(id)
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: "Category not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category", error })
  }
}

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedCategory = await categoryService.updateCategory(id, req.body)

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" })
    } else {
      res.status(200).json(updatedCategory)
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error })
  }
}

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const category = await categoryService.deleteCategory(id)

    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: "Category not found" })
    }
  } catch (error) {
    const err = error as Error
    res.status(500).json({ error: err.message })
  }
}
