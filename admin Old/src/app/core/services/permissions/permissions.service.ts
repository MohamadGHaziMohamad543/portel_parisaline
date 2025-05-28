import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http:HttpClient) { 

  }
  get(userType:number,userId:number){
    return this.http.post<any>(environment.url+"/permissions/get",{userType:userType,userId:userId});
   }
  
   create(param:[]){
    return this.http.post<any>(environment.url+"/permissions/create",param);
   }
   uRead(param:any){
    return this.http.post<any>(environment.url+"/permissions/uRead",param);
   }
   uInsert(param:any){
    return this.http.post<any>(environment.url+"/permissions/uInsert",param);
   }
   uUpdate(param:any){
    return this.http.post<any>(environment.url+"/permissions/uUpdate",param);
   }
   uDelete(param:any){
    return this.http.post<any>(environment.url+"/permissions/uDelete",param);
   }
   uView(param:any){
    return this.http.post<any>(environment.url+"/permissions/uView",param);
   }
}
