import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { shippingAddress } from '../../models/shippingAddress';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {
  constructor(private http:HttpClient) { 

  }
   get(userType,userId){
    return this.http.post<shippingAddress>(environment.url+"/shippingAddress/get",{userType:userType,userId:userId});
   }
  
   createAndUpdate(param:[]){
    return this.http.post<any>(environment.url+"/shippingAddress/createAndUpdate",param);
   }
}
