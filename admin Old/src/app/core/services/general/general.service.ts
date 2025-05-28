import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { general } from '../../models/general';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http:HttpClient) { 

  }
  getGeneral(){
    return this.http.post<any>(environment.url+"/general/get",{});
  }
  
  update(param:any){
    return this.http.post<any>(environment.url+"/general/update",param);
  }
  getCount(){
    return this.http.post<any>(environment.url+"/general/getCount",{});
   }
}
