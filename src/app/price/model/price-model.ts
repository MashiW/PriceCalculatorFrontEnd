export class PriceRequest {
  productId: string;
  itemCount: number;
}
export class ProductPayload {
  public content: PriceRequest[];
}
export class OrderItemTotalPricePayload {
   productId: string;
   grossTotal: number;
}
export class SummaryItem{
  summaryItem : OrderItemTotalPricePayload[];
}
