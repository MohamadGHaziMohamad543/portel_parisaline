import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http:HttpClient) { 

  }

   getById(id:number){
    return this.http.post<any>(environment.url+"/cases/getById",{id:id});
   }
   create(param:any){
    return this.http.post<any>(environment.url+"/cases/create",param);
   }
   
   getIdPatient(patientId:number){
    return this.http.post<any>(environment.url+"/cases/getIdPatient",{patientId:patientId});
   }
   update(param:any){
    return this.http.post<any>(environment.url+"/cases/update",param);
   }
   approveCasesAdmin(id,patientId){
    return this.http.post<any>(environment.url+"/cases/approveCasesAdmin",{id:id,patientId:patientId});
   }
   checkCases()
   {
    return this.http.post<any>(environment.url+"/cases/checkCases",{});
   }
   sendDoctor(id:number,salary:string,patientId){
    return this.http.post<any>(environment.url+"/cases/sendDoctor",{id:id,salary:salary,patientId:patientId});
   }
   setSuperVisor(id:number){
    return this.http.post<any>(environment.url+"/cases/setSuperVisor",{id:id});
   }
}
