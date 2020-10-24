export class Product{
  productId: string;
  productName: string;
  unitPrice: number;
  meta: Meta = new Meta;
}
export class Meta{
  cartonSize: number;
  cartonPrice: number;
}

export class ProductPayload {
  public rowCount: number;
  public content: Product[];
}
