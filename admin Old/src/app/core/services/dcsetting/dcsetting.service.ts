import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import {dcsetting} from '../../models/dcsetting'
@Injectable({
  providedIn: 'root'
})
export class DcsettingService {

  constructor(private http:HttpClient) { }

  
  getAll(){
    return this.http.post<dcsetting[]>(environment.url+"/dcsetting/getAll",{});
  }

  create(param:[]){
   return this.http.post<any>(environment.url+"/dcsetting/create",param);
  }

  delete(id:number){
   return this.http.post<any>(environment.url+"/dcsetting/delete",{id:id});
  }
  
  
  update(param:[]){
    return this.http.post<any>(environment.url+"/dcsetting/update",param);
  }

}
