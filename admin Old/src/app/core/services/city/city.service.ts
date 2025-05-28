import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { city } from '../../models/city';
import { cityName } from '../../models/cityName';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  currency = new BehaviorSubject<city[]>(null);
  constructor(private http:HttpClient) { }

  set():Observable<city[]>{
    return this.currency.asObservable();
  }
  
  getAll(){
    return this.http.post<city[]>(environment.url+"/city/getAll",{}).subscribe(res=>{
      this.currency.next(res);
    });
  }

  create(param:[]){
   return this.http.post<any>(environment.url+"/city/create",param);
  }

  delete(id:number){
   return this.http.post<any>(environment.url+"/city/delete",{id:id});
  }
  
  deactivate_or_activate(id:number,statu:number){
   return this.http.post<any>(environment.url+"/city/deactivate_or_activate",{id:id,status:statu});
  }

  getAllName(cityId:number){
    return this.http.post<cityName[]>(environment.url+"/city/getAllName",{cityId:cityId});
  }

  createName(param:[]){
   return this.http.post<any>(environment.url+"/city/createName",param);
  }
  deleteName(id:number){
    return this.http.post<any>(environment.url+"/city/deleteName",{id:id});
  }
  getAllAndName(){
    return this.http.post<any>(environment.url+"/city/getAllAndName",{langId:environment.langId});
  }
  getAllAndNameById(countryId:number){
    return this.http.post<any>(environment.url+"/city/getAllAndNameById",{langId:environment.langId,countryId:countryId});
  }
  getNameById(cityId:number)
  {
    return this.http.post<any>(environment.url+"/city/getNameById",{langId:environment.langId,cityId:cityId});
  }
}
