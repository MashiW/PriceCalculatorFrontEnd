import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {ProductService} from './service/ProductService';
import {Product, ProductPayload} from './model/product-model';
import {ApiResponse} from './model/api-response';
import '../app.component.css';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public page = 1;
  public totalRecords: number;
  public products: Product[];

  public pageSize = 3;
  public pageSizes = [3, 6, 9];

  constructor(private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts(this.page -1, this.pageSize)
    .subscribe((response: ApiResponse<ProductPayload>)=>{
      this.products = response.payload.content;
      this.totalRecords = response.payload.content.length;
      console.log(response);
    });
  }

  getCurrentPage(event) {
      this.page = event;
      this.getAllProducts();
  }

  handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.getAllProducts();
    }
}
