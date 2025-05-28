import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { sms_model,content_sms_model } from '../../models/sms_model';
@Injectable({
  providedIn: 'root'
})
export class SmsModelService {
  email_model = new BehaviorSubject<sms_model[]>(null);
  constructor(private http:HttpClient) { }

  getll_email_model():Observable<sms_model[]>{
    return this.email_model.asObservable();
  }
  getllContentById(id:number){
    return this.http.post<content_sms_model[]>(environment.url+"/sms_model/getAllContent",{sms_model_id:id});
  }

  getAll(){
    return this.http.post<sms_model[]>(environment.url+"/sms_model/getall",{}).subscribe(res=>{
      this.email_model.next(res);
    });
  }
  
  create(param:[]){
   return this.http.post<any>(environment.url+"/sms_model/create",param);
  }
  delete(param:[]){
    return this.http.post<any>(environment.url+"/sms_model/delete",param);
   }
   deactivate_or_activate(id:number,statu:number){
    return this.http.post<any>(environment.url+"/sms_model/deactivate_or_activate",{id:id,status:statu});
   }
   createContent(param:[]){
    return this.http.post<any>(environment.url+"/sms_model/createContent",param);
  }
  deleteConent(param:[]){
    return this.http.post<any>(environment.url+"/sms_model/deleteContent",{id:param['id']});
  }
  updateContent(param:[]){
    return this.http.post<any>(environment.url+"/sms_model/updateContent",param);
  }
}
