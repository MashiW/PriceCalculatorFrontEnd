import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {ProductService} from './service/ProductService';
import {Product, ProductPayload} from './model/product-model';
import {ApiResponse} from './model/api-response';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public page = 1;
  public itemsPerPage = 5;
  public totalRecords: number;
  public products: Product[];

  constructor(private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts(this.page -1, this.itemsPerPage)
    .subscribe((response: ApiResponse<ProductPayload>)=>{
      this.products = response.payload.content;
      this.totalRecords = response.payload.rowCount;
    });

  }

  getCurrentPage(event) {
      this.page = event;
      this.getAllProducts();
  }

}
