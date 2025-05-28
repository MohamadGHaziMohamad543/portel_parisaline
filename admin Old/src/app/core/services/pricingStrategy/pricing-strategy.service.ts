import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import {pricingStrategy} from '../../models/pricingStrategy';
@Injectable({
  providedIn: 'root'
})
export class PricingStrategyService {

  pricingStrategy:pricingStrategy;

  constructor(private http:HttpClient) { }

  getAll(userId:number,userType:number){
    return this.http.post<pricingStrategy>(environment.url+"/pricingStrategy/getAll",{userId:userId,userType:userType});
  }
  create(param:[]){
    return this.http.post<pricingStrategy>(environment.url+"/pricingStrategy/create",{});
  }
  update(param:[]){
    return this.http.post<pricingStrategy>(environment.url+"/pricingStrategy/update",{});
  }
}
