import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { responsible } from '../../models/responsible';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  
  constructor(private http:HttpClient) { 

  }
    getAllById(id:number,userType:string){
     return this.http.post<responsible[]>(environment.url+"/responsible/getAllById",{userId:id,userType:userType});
    }
   create(param:[]){
    return this.http.post<any>(environment.url+"/responsible/create",param);
   }
   update(param:[]){
    return this.http.post<any>(environment.url+"/responsible/update",param);
   }
   delete(param:[]){
    return this.http.post<any>(environment.url+"/responsible/delete",{id:param['id']});
   }
}
