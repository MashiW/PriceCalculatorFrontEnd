import { Component, OnInit } from '@angular/core';
import {ApiResponse} from "../product/model/api-response";
import {Product, ProductPayload} from "../product/model/product-model";
import {ProductService} from "../product/service/ProductService";
import {Router} from "@angular/router";
import {PriceService} from "./service/PriceService";
import {OrderItemTotalPricePayload, PriceRequest} from "./model/price-model";

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  public page = 1;
  public totalRecords: number;
  public products: Product[];
  public itemPriceRequests: PriceRequest[];
  public summaryItems: OrderItemTotalPricePayload[];
  public netTotal: number;

  constructor(private router: Router,
              private productService: ProductService,
              private priceService: PriceService) {
    this.itemPriceRequests = [];
    this.summaryItems = [];
    this.netTotal =0;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts(this.page -1, 10)
      .subscribe((response: ApiResponse<ProductPayload>)=>{
        this.products = response.payload.content;
        this.totalRecords = response.payload.content.length;
      });
  }

  getProductName(id: String) {
    return this.products
      .filter((p) => p.productId === id)[0];
  }

  getProductId(id: String) {
      return this.products
        .filter((p) => p.productName === id)[0];
    }

  addNewItem() {
    let usedProducts = this.summaryItems
      .map((i) => i.productId);

    let nextPick = this.products
      .filter((i) => !usedProducts.includes(i.productId))[0];

    this.itemPriceRequests.push({
      productId: nextPick.productId,
      itemCount: 0
    });
  }

  removeItem(i: number) {
    this.itemPriceRequests.splice(i, 1);
    this.summaryItems.splice(i,1);
  }

  calculatePrice(i: number) {
    let itemPriceRequest = this.itemPriceRequests[i];

    this.priceService.sendPriceRequest(itemPriceRequest).subscribe(
      (response: ApiResponse<OrderItemTotalPricePayload>) =>{
        if(response.code === 'SUCCESS'){
            let itemIndex = this.summaryItems
              .findIndex((i) => i.productId === response.payload.productId);

            if(itemIndex >= 0) {
              this.summaryItems[itemIndex] = response.payload;
            }
            else {
              this.summaryItems.push(response.payload);
            }

            this.updateTotalPrice();
        }
        else {
          alert("Error "+ response.code);
        }
      }
    );
  }

  updateTotalPrice(){
    this.netTotal = 0;

    for(let n = 0; n < this.summaryItems.length; ++n){
      this.netTotal += this.summaryItems[n].grossTotal;
    }
  }

  isProductDisabled(id: string) {
    let usedProducts = this.summaryItems
      .map((i) => i.productId);
    return usedProducts.includes(id);
  }

  handleSelectedProductChange(e, i: number) {
    this.itemPriceRequests[i].productId = e.target.value;
  }

  formatMoneyAmount(amount: number) {
    return (amount / 100).toFixed(2);
  }
}
