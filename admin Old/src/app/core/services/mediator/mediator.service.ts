import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { mediator } from '../../models/mediator';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MediatorService {
  constructor(private http:HttpClient) { 

  }
  getAll(){
    return this.http.post<any[]>(environment.url+"/mediator/getAll",{});
   }
   getById(id:number){
    return this.http.post<any>(environment.url+"/mediator/getById",{id:id});
   }
   create(param:[]){
    return this.http.post<any>(environment.url+"/mediator/create",param);
   }
   update(param:[]){
    return this.http.post<any>(environment.url+"/mediator/update",param);
   }
   delete(param:[]){
    return this.http.post<any>(environment.url+"/mediator/delete",param);
   }
   deactivate_or_activate(id:number,status:number){
    return this.http.post<any>(environment.url+"/mediator/deactivate_or_activate",{id:id,status:status});
   }
   getAllOnline(){
    return this.http.post<any[]>(environment.url+"/mediator/getAllOnline",{});
   }
   chpass(pass:string,id:number)
   {
    return this.http.post<any>(environment.url+"/mediator/chpass",{pass:pass,id:id});
   }
}
