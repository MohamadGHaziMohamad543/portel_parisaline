import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { shippingCompany } from '../../models/shippingCompany';
import { shippingParam } from '../../models/shippingParam';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ShippingCompanyService {
  constructor(private http:HttpClient) { 

  }
   get(id:number){
    return this.http.post<shippingCompany[]>(environment.url+"/shippingCompany/getById",{id:id});
   }
  
   create(param:any){
    return this.http.post<any>(environment.url+"/shippingCompany/create",param);
   }

   update(param:[]){
    return this.http.post<any>(environment.url+"/shippingCompany/update",param);
   }

   getAll(){
     return this.http.post<shippingCompany[]>(environment.url+"/shippingCompany/getAll",{});
   }

   delete(id:number){
    return this.http.post<any>(environment.url+"/shippingCompany/delete",{id:id});
   }
   getParamById(shippingCompanyId:number){
    return this.http.post<shippingParam[]>(environment.url+"/shippingCompany/getParamById",{shippingCompanyId:shippingCompanyId});
  }

  activeAndDeActivted(id:number,status:number){
    return this.http.post<any>(environment.url+"/shippingCompany/activeAndDeActivted",{id:id,status:status});
    
  }
  createParam(param){
    return this.http.post<any[]>(environment.url+"/shippingCompany/createParam",param);
  }

  deleteParam(id:number){
    return this.http.post<any[]>(environment.url+"/shippingCompany/deleteParam",{id:id});
  }

  updateParam(param){
    return this.http.post<any[]>(environment.url+"/shippingCompany/updateParam",param);
  }
}
