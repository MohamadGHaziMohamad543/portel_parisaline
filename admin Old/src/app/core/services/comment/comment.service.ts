import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }
  getId(id:number,patientId:number,commentType:string){
    return this.http.post<any>(environment.url+"/comment/getId",{id:id,patientId:patientId,commentType:commentType});
  }

  create(param:any){
   return this.http.post<any>(environment.url+"/comment/create",param);
  }

}
