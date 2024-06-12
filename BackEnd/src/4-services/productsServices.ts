import { OkPacketParams } from 'mysql2';
import { dal } from '../2-utils/dal';
import { ProductModel } from '../3-models/productModel';

// product service - any logic regarding products:
class ProductService {
  // Get all products:
  public async getAllProducts() {
    // Create sql:
    const sql = 'SELECT id, name, price FROM products';
    // Execute:
    const products = await dal.execute(sql);
    // Return:
    return products;
  }

  public async getSpecificProduct(id: number) {
    const sql =
      'SELECT id, name, price FROM products WHERE id = ?';
    const products = await dal.execute(sql, [id]);
    const product = products[0];
    return product;
  }

  public async addProduct(product: ProductModel) {
    // Create sql:
    const sql =
      'INSERT INTO products (name, price) VALUES (?, ?)';
    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [
      product.name,
      product.price,
    ]);
    // Return:
    product.id = info.insertId;
    return product;
  }

  public async updateProduct(product: ProductModel) {
    const sql =
      'UPDATE products SET name = ?, price = ? WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [
      product.name,
      product.price,
      product.id,
    ]);
    return product;
  }

  public async deleteProduct(id: number) {
    const sql = 'DELETE from products WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [id]);
  }
}

export const productService = new ProductService();
