import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { country } from '../../models/country';
import { countryName } from '../../models/countryName';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  currency = new BehaviorSubject<country[]>(null);
  constructor(private http:HttpClient) { }

  set():Observable<country[]>{
    return this.currency.asObservable();
  }
  
  getAll(){
    return this.http.post<country[]>(environment.url+"/country/getAll",{}).subscribe(res=>{
      this.currency.next(res);
    });
  }

  create(param:[]){
   return this.http.post<any>(environment.url+"/country/create",param);
  }

  delete(id:number){
   return this.http.post<any>(environment.url+"/country/delete",{id:id});
  }
  
  deactivate_or_activate(id:number,statu:number){
   return this.http.post<any>(environment.url+"/country/deactivate_or_activate",{id:id,status:statu});
  }

  getAllName(currencyId:number){
    return this.http.post<countryName[]>(environment.url+"/country/getAllName",{countryId:currencyId});
  }

  createName(param:[]){
   return this.http.post<any>(environment.url+"/country/createName",param);
  }
  deleteName(id:number){
    return this.http.post<any>(environment.url+"/country/deleteName",{id:id});
  }
  getAllAndName(){
    return this.http.post<any>(environment.url+"/country/getAllAndName",{langId:environment.langId});
  }
  getNameById(countryId:number){
    return this.http.post<country>(environment.url+"/country/getNameById",{countryId:countryId,langId:environment.langId});
  }

}
