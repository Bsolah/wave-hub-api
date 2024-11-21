// controllers/productController.ts
import { Request, Response } from 'express';
import ProductService from '../service/product.service';

const productService = new ProductService();
export class ProductController {
  // Create a new product
  static async createProduct(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product', error });
    }
  }

  // Get all products
  static async getProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products', error });
    }
  }

  // Get a product by ID
  static async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product', error });
    }
  }

  // Update a product
  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.updateProduct(id, req.body);
      if (!product) {
         res.status(404).json({ message: 'Product not found' });
      } 
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update product', error });
    }
  }

  // Delete a product
  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.deleteProduct(id);

      if (!product) {
         res.status(404).json({ message: 'Product not found' });
      } 
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product', error });
    }
  }
}
