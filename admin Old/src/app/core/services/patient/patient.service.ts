import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http:HttpClient) {   }
  getAll(caseStatus:number){
    return this.http.post<any>(environment.url+"/patient/getAll",{caseStatus:caseStatus});
   }
 
   getCount(){
    return this.http.post<any>(environment.url+"/patient/getCount",{});
   }
   create(param:any){
     return this.http.post<any>(environment.url+"/patient/create",param);
   }
 
   update(param:any){
     return this.http.post<any>(environment.url+"/patient/update",param);
   }
   getById(id){
     return this.http.post<any>(environment.url+"/patient/getById",{id:id});
   }
   getAllByDoctorId(id){
    return this.http.post<any>(environment.url+"/patient/getAllByDoctorId",{id:id});
   }
   getAllByDentelCenterId(id){
    return this.http.post<any>(environment.url+"/patient/getAllByDentelCenterId",{dentalCenterId:id});
   }
  
}
