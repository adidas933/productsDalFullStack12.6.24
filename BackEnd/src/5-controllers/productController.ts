import express, { Request, Response, NextFunction } from 'express';
import { productService } from '../4-services/productsServices';
import { ProductModel } from '../3-models/productModel';
import { StatusCode } from '../3-models/enums';

const myRouters = 'products';
// product controller - listening to product requiests:
class ProductController {
  // Creating a router object:
  public readonly router = express.Router();

  public constructor() {
    this.router.get(`/api/${myRouters}`, this.getAllProducts);
    this.router.get(`/api/${myRouters}/:id`, this.getSpecificProduct);
    this.router.post(`/api/${myRouters}`, this.addProduct);
    this.router.put(`/api/${myRouters}/:id`, this.updateProduct);
    this.router.delete(`/api/${myRouters}/:id`, this.deleteProduct);
  }

  // Get all products:
  private async getAllProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const products = await productService.getAllProducts();
      response.json(products);
    } catch (error: any) {
      next(error); // Go to catchAll middleware!!!!!!!
    }
  }

  private async getSpecificProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const product = await productService.getSpecificProduct(id);
      response.json(product);
    } catch (error) {
      next(error);
    }
  }

  private async addProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const newProduct = new ProductModel(request.body);
      const product = await productService.addProduct(newProduct);
      response.status(StatusCode.Created).json(product);
    } catch (error) {
      next(error);
    }
  }

  private async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      request.body.id = id;
      const product = new ProductModel(request.body);
      const updateProduct = await productService.updateProduct(product);
      response.json(updateProduct);
    } catch (error) {
      next(error);
    }
  }

  private async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      await productService.deleteProduct(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
