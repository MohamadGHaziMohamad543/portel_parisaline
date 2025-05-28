import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http:HttpClient) { }
  getAllById(dentalCenterId:number){
    return this.http.post<any>(environment.url+"/balance/getAllById",{dentalCenterId:dentalCenterId});
   }
   
   getAllBy(){
    return this.http.post<any>(environment.url+"/balance/getAllNotAccepted",{});
   }
   getAllAccepted(){
    return this.http.post<any>(environment.url+"/balance/getAllAccepted",{});
   }
   accepted(id:number,userId:number,pass:string){
    return this.http.post<any>(environment.url+"/balance/accepted",{id:id,userId:userId,pass:pass});
   }
   
}
