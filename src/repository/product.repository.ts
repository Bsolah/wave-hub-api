import Product from "../models/product"
import { IProduct } from "../types"

class ProductRepository {
  async createProduct(data: IProduct) {
    // Hash the password
    const product = await Product.create({ ...data })
    return product
  }

  async getAllProducts() {
    const products = await Product.findAll()
    return products
  }

  async getProductById(productId: string) {
    const product = await Product.findByPk(productId) // Uses the primary key
    return product
  }

  async updateProduct(productId: string, data: IProduct) {
    const [updated] = await Product.update(data, {
      where: { product_id: productId },
    })
    if (updated) {
      const updatedProduct = await Product.findByPk(productId)
      return updatedProduct
    }
  }

  async deleteProduct(productId: string) {
    const category = await Product.findOne({ where: { product_id: productId } })
    if (category) {
      await category.destroy()
      return { message: `Product Id ${productId} deleted` }
    }
  }
}

export default ProductRepository
