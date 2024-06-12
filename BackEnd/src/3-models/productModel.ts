export class ProductModel {
  public id: number;
  public name: string;
  public price: number;

  public constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
  }
}
