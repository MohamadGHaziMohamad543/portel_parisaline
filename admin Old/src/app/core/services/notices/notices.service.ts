import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  constructor(private http:HttpClient) {

   }

   getAll(){
    return this.http.post<any[]>(environment.url+"/notices/getAll",{});
   }

   getAllView(){
    return this.http.post<any[]>(environment.url+"/notices/getAllView",{});
   }
   
   changeView(id:number){
    return this.http.post<any[]>(environment.url+"/notices/changeView",{id:id});
   }
}
