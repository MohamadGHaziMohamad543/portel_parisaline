import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { currency } from '../../models/currency';
import { currencyName } from '../../models/currencyName';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currency = new BehaviorSubject<currency[]>(null);
  constructor(private http:HttpClient) { }

  set():Observable<currency[]>{
    return this.currency.asObservable();
  }
  
  updateCurrency(){
    return this.http.post<any>(environment.url+"/currency/updateCurrency",{});
  }
  getAll(){
    return this.http.post<currency[]>(environment.url+"/currency/getAll",{}).subscribe(res=>{
      this.currency.next(res);
    });
  }

  create(param:[]){
   return this.http.post<any>(environment.url+"/currency/create",param);
  }

  delete(id:number){
   return this.http.post<any>(environment.url+"/currency/delete",{id:id});
  }
  
  deactivate_or_activate(id:number,statu:number){
   return this.http.post<any>(environment.url+"/currency/deactivate_or_activate",{id:id,status:statu});
  }
  
  getAllName(currencyId:number){
    return this.http.post<currencyName[]>(environment.url+"/currency/getAllName",{currencyId:currencyId});
  }

  createName(param:[]){
   return this.http.post<any>(environment.url+"/currency/createName",param);
  }
  deleteName(id:number){
    return this.http.post<any>(environment.url+"/currency/deleteName",{id:id});
  }
  getAllAndName(){
    return this.http.post<any>(environment.url+"/currency/getAllAndName",{langId:environment.langId});
  }

}
