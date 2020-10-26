export class Product{
  productId: string;
  productName: string;
  unitPrice: number;
  productMeta: ProductMeta = new ProductMeta;
}
export class ProductMeta{
  cartonSize: number;
  cartonPrice: number;
}

export class ProductPayload {
  public content: Product[];
}
