import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { dentalCenter } from '../../models/dentalCenters';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class DentalCenterService {

  constructor(private http:HttpClient) { 

  }
  getAll(){
    return this.http.post<dentalCenter[]>(environment.url+"/dentalCenter/getAll",{});
   }
   getById(id:number){
    return this.http.post<dentalCenter[]>(environment.url+"/dentalCenter/getById",{id:id});
   }
   getAllBylaboratorysId(laboratorysId:number){
    return this.http.post<dentalCenter[]>(environment.url+"/dentalCenter/getAllBylaboratorysId",{laboratorysId:laboratorysId});
   }
   getAllByMediatorId(mediatorId:number){
    return this.http.post<dentalCenter[]>(environment.url+"/dentalCenter/getAllByMediatorId",{mediatorId:mediatorId});
   }
   create(param:[]){
    return this.http.post<any>(environment.url+"/dentalCenter/create",param);
   }
   update(param:[]){
    return this.http.post<any>(environment.url+"/dentalCenter/update",param);
   }
   delete(param:[]){
    return this.http.post<any>(environment.url+"/dentalCenter/delete",param);
   }

   deactivate_or_activate(id:number,status:number){
    return this.http.post<any>(environment.url+"/dentalCenter/deactivate_or_activate",{id:id,status:status});
   }
}
