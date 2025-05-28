import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod'; 

@Injectable({
  providedIn: 'root'
})
export class DentelCenterClintService {
  
  constructor(private http:HttpClient) { 

  }
   getAllDoctor(dentalCenterId:number){
    return this.http.post<any>(environment.url+"/dentelCenterClint/getAllDoctor",{dentalCenterId:dentalCenterId});
   }
   getAllDentelCenter(doctorId:number){
    return this.http.post<any>(environment.url+"/dentelCenterClint/getAllDentelCenter",{doctorId:doctorId});
   }
  
   Join(param:any){
    return this.http.post<any>(environment.url+"/dentelCenterClint/Join",param);
   }
   deactivate_or_activate(id:number,status:number){
    return this.http.post<any>(environment.url+"/dentelCenterClint/deactivate_or_activate",{id:id,status:status});
   }
   delete(param:any){
    return this.http.post<any>(environment.url+"/dentelCenterClint/delete",param);
   }

}
