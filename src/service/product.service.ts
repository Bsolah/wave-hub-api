import ProductRepository from "../repository/product.repository";
import { BaseError } from "../utils/error";

class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data: any) {
    try {
      const product = await this.productRepository.createProduct(data);
      return product;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async getAllProducts() {
    try {
      console.log('products service ')
      const products = await this.productRepository.getAllProducts();
      return products;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await this.productRepository.getProductById(productId);
      return product;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async updateProduct(productId: string, data: any) {
    try {
      const product = await this.productRepository.updateProduct(productId, data);
      return product;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }

  async deleteProduct(productId: string) {
    try {
      const product = await this.productRepository.deleteProduct(productId);
      return product;
    } catch (error: any) {
      throw new BaseError(error, 400);
    }
  }
}

export default ProductService;
