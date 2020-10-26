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
    console.log("Called :"+id);
    return this.products
      .filter((p) => p.productId === id)[0];
  }

  getProductId(id: String) {
      return this.products
        .filter((p) => p.productName === id)[0];
    }

  addNewItem() {
    this.itemPriceRequests.push({
      productId: this.products[0].productId,
      itemCount: 0
    });
  }

  removeItem(i: number) {
    this.itemPriceRequests.splice(i, 1);
    this.summaryItems.splice(i,1);
  }

  calculatePrice() {
    this.priceService.sendPriceRequest(this.itemPriceRequests[this.itemPriceRequests.length-1]).subscribe(
      (response: ApiResponse<OrderItemTotalPricePayload>) =>{
        if(response.code === 'SUCCESS'){
            this.summaryItems.push(response.payload);
            console.log("W "+this.summaryItems[this.summaryItems.length-1].productId);
            this.updateTotalPrice();
        }
        else {
          alert("Error "+ response.code);
        }
      }
    );
  }
  updateTotalPrice(){
    for(let n = 0; n < this.summaryItems.length; ++n){
      this.netTotal += this.summaryItems[n].grossTotal;
    }
  }

  selectChangeHandler(e) {
    this.itemPriceRequests[0].productId = e.target.value;
    alert(this.itemPriceRequests[0].productId);
  }
}
