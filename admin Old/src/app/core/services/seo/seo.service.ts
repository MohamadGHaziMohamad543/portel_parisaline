import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { seo } from '../../models/seo';
import { environment } from 'src/environments/environment.prod';
import { env } from 'process';
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  seo = new BehaviorSubject<seo[]>(null);
  constructor(private http:HttpClient) { 

  }
   setSeo():Observable<seo[]>{
    return this.seo.asObservable();
   }
   getAll(){
    this.http.post<seo[]>(environment.url+"/seo/getAll",{}).subscribe(res=>{
      this.seo.next(res);
    })
  }
  
  create(param:[]){
    return this.http.post<any>(environment.url+"/seo/create",param);
  }
  update(param:[]){
    return this.http.post<any>(environment.url+"/seo/update",param);
  }

  delete(id:number){
    return this.http.post<any>(environment.url+"/seo/delete",{id:id});
  }
}
