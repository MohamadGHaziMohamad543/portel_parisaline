import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { requests } from '../../models/requests';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http:HttpClient) { 

  }
  getAll(doctorId:number){
    return this.http.post<any[]>(environment.url+"/requests/getAll",{doctorId:doctorId});
   }
  
   getAllByRequestId(id:number){
    return this.http.post<any>(environment.url+"/requests/getAllByRequestId",{id:id});
   }
   create(param:[]){
    return this.http.post<any>(environment.url+"/requests/create",param);
   }
   update(param:[]){
    return this.http.post<any>(environment.url+"/requests/update",param);
   }
   delete(param:[]){
    return this.http.post<any>(environment.url+"/requests/delete",param);
   }
   getAlLFilePlan(id,typePlan){
     return this.http.post<any>(environment.url+"/requests/GetAllFile",{id:id,typePlan:typePlan},);
   }
   uploadFile(file,params:{}){
     let formdata=new FormData();
     formdata.append('aa',file);
     return this.http.post<any>(environment.url+"/requests/uploadFile",formdata,{params:params});
   }
   deleteFile(directionName:string){
    return this.http.post<any>(environment.url+"/requests/deletefie",{directionName:directionName});
   }

   updateMethode(id:number,methodPlan:number){
    return this.http.post<any>(environment.url+"/requests/updateMethode",{id:id,methodPlan:methodPlan});
   }

}
