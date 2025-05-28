import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { doctor } from '../../models/doctor';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctor = new BehaviorSubject<doctor[]>(null);
  constructor(private http:HttpClient) { 

  }
   set():Observable<doctor[]>{
    return this.doctor.asObservable();
  }
   getAll(){
    return this.http.post<doctor[]>(environment.url+"/doctor/getAll",{}).subscribe(res=>{
      this.doctor.next(res);
    })
   }
   
   getById(id:number){
    return this.http.post<any>(environment.url+"/doctor/getById",{id:id});
   }
   create(param:[]){
    return this.http.post<any>(environment.url+"/doctor/create",param);
   }

   update(param:[]){
    return this.http.post<any>(environment.url+"/doctor/update",param);
   }

   delete(param:[]){
    return this.http.post<any>(environment.url+"/doctor/update",{id:param['id']});
   }
   
   deactivate_or_activate(id:number,statu:number){
    return this.http.post<any>(environment.url+"/doctor/deactivate_or_activate",{id:id,status:statu});
   }
 
   chpass(pass:string,id:number)
   {
    return this.http.post<any>(environment.url+"/doctor/chpass",{pass:pass,id:id});
   }

}
