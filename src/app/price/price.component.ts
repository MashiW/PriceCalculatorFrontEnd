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
  public priceRequest: PriceRequest;
  private selectedProduct: string;
  public summaryItems: OrderItemTotalPricePayload[];
  counter(i: number) {
    return new Array(i);
  }

  constructor(private router: Router,
              private productService: ProductService,
              private priceService: PriceService) {
    this.itemPriceRequests = [];
    this.summaryItems = [];
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
    console.log("Called :"+id);
    return this.products
      .filter((p) => p.productId === id);
  }

  getProductId(id: String) {
      return this.products
        .filter((p) => p.productName === id)[0];
    }

  addNewItem() {
    this.itemPriceRequests.push({
      productId: this.products[this.products.length-1].productId,
      itemCount: 0
    });
  }

  removeItem(i: number) {
    this.itemPriceRequests.splice(i, 1);
    this.summaryItems.splice(i,1);
  }

  calculatePrice() {
    console.log("REQ "+this.itemPriceRequests);
    this.priceService.sendPriceRequest(this.itemPriceRequests[this.itemPriceRequests.length-1]).subscribe(
      (response: ApiResponse<OrderItemTotalPricePayload>) =>{
        if(response.code === 'SUCCESS'){
            this.summaryItems.push(response.payload);
            console.log("W "+this.summaryItems[0].productId);
        }
        else {
          alert("Error "+ response.code);
        }
      }
    );
  }

  selectChangeHandler(e) {
    this.itemPriceRequests[0].productId = e.target.value;
  }
}
