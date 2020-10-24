import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) {
  }

  getAllProducts(offset, limit){
     return this.http.get(
            `${environment.API_BASE_URL}/api/product/all/?`+ 'offset=' + offset + '&' + 'limit=' + limit);
  }
}
