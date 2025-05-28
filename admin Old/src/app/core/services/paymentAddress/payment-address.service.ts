import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { paymentAddress } from '../../models/paymentAddress';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class PaymentAddressService {

  constructor(private http:HttpClient) { 

  }
  get(userType:number,userId:number){
    return this.http.post<paymentAddress>(environment.url+"/paymentAddress/get",{userType:userType,userId:userId});
   }
  
   createAndUpdate(param:[]){
    return this.http.post<any>(environment.url+"/paymentAddress/createAndUpdate",param);
   }
}
