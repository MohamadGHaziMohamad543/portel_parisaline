import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { laboratorys } from '../../models/laboratorys';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LaboratorysService {

  constructor(private http:HttpClient) { 

  }
  getAll(){
    return this.http.post<any[]>(environment.url+"/laboratorys/getAll",{});
   }
  
   getById(id:number){
    return this.http.post<any>(environment.url+"/laboratorys/getById",{id:id});
   }
   create(param:[]){
    return this.http.post<any>(environment.url+"/laboratorys/create",param);
   }
   update(param:[]){
    return this.http.post<any>(environment.url+"/laboratorys/update",param);
   }
   delete(param:[]){
    return this.http.post<any>(environment.url+"/laboratorys/delete",param);
   }
   deactivate_or_activate(id:number,status:number){
    return this.http.post<any>(environment.url+"/laboratorys/deactivate_or_activate",{id:id,status:status});
   }
   getAllOnline(){
    return this.http.post<any[]>(environment.url+"/laboratorys/getAllOnline",{});
   }
   chpass(pass:string,id:number)
   {
    return this.http.post<any>(environment.url+"/laboratorys/chpass",{pass:pass,id:id});
   }


}
