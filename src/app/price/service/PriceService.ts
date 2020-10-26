import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {PriceRequest} from "../model/price-model";
@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) {
  }

  sendPriceRequest(priceRequest: PriceRequest){
    return this.http.post(`${environment.API_BASE_URL}/api/price/cal`, priceRequest);
  }
}
